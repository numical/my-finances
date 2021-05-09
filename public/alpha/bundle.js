var app = (function () {
  'use strict';
  function t() {}
  function e(t) {
    return t();
  }
  function n() {
    return Object.create(null);
  }
  function s(t) {
    t.forEach(e);
  }
  function r(t) {
    return 'function' == typeof t;
  }
  function o(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function i(e, ...n) {
    if (null == e) return t;
    const s = e.subscribe(...n);
    return s.unsubscribe ? () => s.unsubscribe() : s;
  }
  function a(t, e) {
    t.appendChild(e);
  }
  function c(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function u(t) {
    t.parentNode.removeChild(t);
  }
  function l(t) {
    return document.createElement(t);
  }
  function d(t) {
    return document.createTextNode(t);
  }
  function f() {
    return d(' ');
  }
  function p(t, e, n, s) {
    return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
  }
  function $(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function m(t, e) {
    (e = '' + e), t.wholeText !== e && (t.data = e);
  }
  function h(t, e) {
    t.value = null == e ? '' : e;
  }
  let g;
  function y(t) {
    g = t;
  }
  const b = [],
    w = [],
    x = [],
    E = [],
    T = Promise.resolve();
  let C = !1;
  function _(t) {
    x.push(t);
  }
  let A = !1;
  const S = new Set();
  function v() {
    if (!A) {
      A = !0;
      do {
        for (let t = 0; t < b.length; t += 1) {
          const e = b[t];
          y(e), N(e.$$);
        }
        for (y(null), b.length = 0; w.length; ) w.pop()();
        for (let t = 0; t < x.length; t += 1) {
          const e = x[t];
          S.has(e) || (S.add(e), e());
        }
        x.length = 0;
      } while (b.length);
      for (; E.length; ) E.pop()();
      (C = !1), (A = !1), S.clear();
    }
  }
  function N(t) {
    if (null !== t.fragment) {
      t.update(), s(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(_);
    }
  }
  const H = new Set();
  function I(t, e) {
    t && t.i && (H.delete(t), t.i(e));
  }
  function O(t, e, n, s) {
    if (t && t.o) {
      if (H.has(t)) return;
      H.add(t),
        undefined.c.push(() => {
          H.delete(t), s && (n && t.d(1), s());
        }),
        t.o(e);
    }
  }
  function k(t) {
    t && t.c();
  }
  function L(t, n, o, i) {
    const { fragment: a, on_mount: c, on_destroy: u, after_update: l } = t.$$;
    a && a.m(n, o),
      i ||
        _(() => {
          const n = c.map(e).filter(r);
          u ? u.push(...n) : s(n), (t.$$.on_mount = []);
        }),
      l.forEach(_);
  }
  function U(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (s(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function j(t, e) {
    -1 === t.$$.dirty[0] &&
      (b.push(t), C || ((C = !0), T.then(v)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function G(e, r, o, i, a, c, l = [-1]) {
    const d = g;
    y(e);
    const f = (e.$$ = {
      fragment: null,
      ctx: null,
      props: c,
      update: t,
      not_equal: a,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(d ? d.$$.context : r.context || []),
      callbacks: n(),
      dirty: l,
      skip_bound: !1,
    });
    let p = !1;
    if (
      ((f.ctx = o
        ? o(e, r.props || {}, (t, n, ...s) => {
            const r = s.length ? s[0] : n;
            return (
              f.ctx &&
                a(f.ctx[t], (f.ctx[t] = r)) &&
                (!f.skip_bound && f.bound[t] && f.bound[t](r), p && j(e, t)),
              n
            );
          })
        : []),
      f.update(),
      (p = !0),
      s(f.before_update),
      (f.fragment = !!i && i(f.ctx)),
      r.target)
    ) {
      if (r.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(r.target);
        f.fragment && f.fragment.l(t), t.forEach(u);
      } else f.fragment && f.fragment.c();
      r.intro && I(e.$$.fragment),
        L(e, r.target, r.anchor, r.customElement),
        v();
    }
    y(d);
  }
  class P {
    $destroy() {
      U(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  function V(e) {
    let n, s, r, o, i, h, g, y, b, w, x, E, T, C;
    return {
      c() {
        (n = l('main')),
          (s = l('h2')),
          (r = d(e[0])),
          (o = f()),
          (i = l('p')),
          (h = d(e[1])),
          (g = f()),
          (y = l('button')),
          (y.textContent = 'Fire'),
          (b = f()),
          (w = l('div')),
          (x = d(e[2])),
          $(w, 'style', (E = `color: ${e[3]}`));
      },
      m(t, u) {
        c(t, n, u),
          a(n, s),
          a(s, r),
          a(n, o),
          a(n, i),
          a(i, h),
          a(n, g),
          a(n, y),
          a(n, b),
          a(n, w),
          a(w, x),
          T || ((C = p(y, 'click', e[4])), (T = !0));
      },
      p(t, [e]) {
        1 & e && m(r, t[0]),
          2 & e && m(h, t[1]),
          4 & e && m(x, t[2]),
          8 & e && E !== (E = `color: ${t[3]}`) && $(w, 'style', E);
      },
      i: t,
      o: t,
      d(t) {
        t && u(n), (T = !1), C();
      },
    };
  }
  function F(t, e, n) {
    let s,
      r,
      { name: o } = e,
      { description: i } = e,
      { fn: a } = e;
    return (
      (t.$$set = (t) => {
        'name' in t && n(0, (o = t.name)),
          'description' in t && n(1, (i = t.description)),
          'fn' in t && n(5, (a = t.fn));
      }),
      n(2, (s = 'not yet clicked')),
      n(3, (r = 'black')),
      [
        o,
        i,
        s,
        r,
        async () => {
          try {
            n(2, (s = JSON.stringify(await a()))), n(3, (r = 'black'));
          } catch (t) {
            console.log(t), n(2, (s = t.message)), n(3, (r = 'red'));
          }
        },
        a,
      ]
    );
  }
  class D extends P {
    constructor(t) {
      super(), G(this, t, F, V, o, { name: 0, description: 1, fn: 5 });
    }
  }
  const J = {
    CHALLENGE: 'challenge',
    AUTHENTICATING: 'authenticating',
    AUTHENTICATED: 'authenticated',
  };
  J.initial = {
    email: '',
    userId: '',
    pwd: '',
    pwdHash: '',
    sessionId: '',
    state: J.CHALLENGE,
    timeout: 0,
  };
  const K = [];
  var M = (e = {}) => {
    const n = (function (e, n = t) {
      let s;
      const r = [];
      function i(t) {
        if (o(e, t) && ((e = t), s)) {
          const t = !K.length;
          for (let t = 0; t < r.length; t += 1) {
            const n = r[t];
            n[1](), K.push(n, e);
          }
          if (t) {
            for (let t = 0; t < K.length; t += 2) K[t][0](K[t + 1]);
            K.length = 0;
          }
        }
      }
      return {
        set: i,
        update: function (t) {
          i(t(e));
        },
        subscribe: function (o, a = t) {
          const c = [o, a];
          return (
            r.push(c),
            1 === r.length && (s = n(i) || t),
            o(e),
            () => {
              const t = r.indexOf(c);
              -1 !== t && r.splice(t, 1), 0 === r.length && (s(), (s = null));
            }
          );
        },
      };
    })({ ...e });
    return (
      (n.setValue = (t, e) => n.update((n) => ({ ...n, [t]: e }))),
      (n.setValues = (t) => n.update((e) => ({ ...e, ...t }))),
      n
    );
  };
  const q = M(J.initial);
  M(), M();
  const { SESSION_TOKEN: z } = {
      PERSONAL_ACCOUNTS: 'personal',
      SESSION_TOKEN: 'X-Csrf-Token',
      DEFAULT: 'default',
    },
    B = Object.freeze({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  let R;
  q.subscribe((t) => {
    R = t.sessionId;
  });
  var X = async (t, e = {}) => {
    const n = { ...B, ...e };
    R && (n.headers[z] = R);
    const s = await fetch(t, n);
    if (s.ok) return s.json();
    {
      const t = new Error(`Fetch error: ${s.status}: ${s.statusText}`);
      throw ((t.status = s.status), t);
    }
  };
  let Q, W;
  q.subscribe((t) => {
    (Q = t.userId), (W = t.pwdHash);
  });
  var Y = async () => {
    try {
      q.setValue('state', J.AUTHENTICATING);
      const t = { authId: Q, pwd: W },
        { sessionId: e, timeout: n } = await X('/sessions', {
          method: 'POST',
          body: JSON.stringify(t),
        });
      return (
        q.setValues({ state: J.AUTHENTICATED, sessionId: e, timeout: n }),
        { sessionId: e, timeout: n }
      );
    } catch (t) {
      throw (q.setValue('state', J.CHALLENGE), t);
    }
  };
  let Z, tt, et;
  q.subscribe((t) => {
    (Z = t.email), (tt = t.emailHash), (et = t.pwdHash);
  });
  const nt = async () => {
    const t = { authId: tt, email: Z, pwd: et },
      e = await X('/users', { method: 'POST', body: JSON.stringify(t) });
    return q.setValues({ emailHash: e.authId, pwdHash: e.pwd }), e;
  };
  var st = () => X('/financial-model'),
    rt = async () => {
      const { emailHash: t } = (function (t) {
        let e;
        return i(t, (t) => (e = t))(), e;
      })(q);
      return X(`/user/${t}`);
    };
  const ot = new TextEncoder();
  var it = async (...t) => {
    const e = t.join(':'),
      n = ot.encode(e),
      s = await crypto.subtle.digest('SHA-256', n),
      r = Array.from(new Uint8Array(s))
        .map((t) => t.toString(16).padStart(2, '0'))
        .join('');
    return console.log(`hash length = ${r.length}`), r;
  };
  function at(e) {
    let n, r, o, i, d, m, g, y, b, w, x, E, T, C, _;
    return {
      c() {
        (n = l('main')),
          (r = l('h2')),
          (r.textContent = 'User challenge'),
          (o = f()),
          (i = l('label')),
          (i.textContent = 'Email:'),
          (d = f()),
          (m = l('input')),
          (g = f()),
          (y = l('label')),
          (y.textContent = 'Password:'),
          (b = f()),
          (w = l('input')),
          (x = f()),
          (E = l('div')),
          (T = l('button')),
          (T.textContent = 'Submit'),
          $(i, 'for', 'email'),
          $(i, 'placeholder', 'test@test.com'),
          $(m, 'id', 'email'),
          $(y, 'for', 'pwd'),
          $(w, 'id', 'pwd');
      },
      m(t, s) {
        c(t, n, s),
          a(n, r),
          a(n, o),
          a(n, i),
          a(n, d),
          a(n, m),
          h(m, e[0]),
          a(n, g),
          a(n, y),
          a(n, b),
          a(n, w),
          h(w, e[1]),
          a(n, x),
          a(n, E),
          a(E, T),
          C ||
            ((_ = [
              p(m, 'input', e[3]),
              p(w, 'input', e[4]),
              p(T, 'click', e[2]),
            ]),
            (C = !0));
      },
      p(t, [e]) {
        1 & e && m.value !== t[0] && h(m, t[0]),
          2 & e && w.value !== t[1] && h(w, t[1]);
      },
      i: t,
      o: t,
      d(t) {
        t && u(n), (C = !1), s(_);
      },
    };
  }
  function ct(t, e, n) {
    let s = '',
      r = '';
    return [
      s,
      r,
      async () => {
        const [t, e] = await Promise.all([it(s), it(s, r)]);
        q.setValues({ email: s, emailHash: t, pwd: r, pwdHash: e });
      },
      function () {
        (s = this.value), n(0, s);
      },
      function () {
        (r = this.value), n(1, r);
      },
    ];
  }
  class ut extends P {
    constructor(t) {
      super(), G(this, t, ct, at, o, {});
    }
  }
  function lt(e) {
    let n,
      s,
      r,
      o,
      i,
      p,
      $,
      h,
      g,
      y,
      b,
      w,
      x,
      E,
      T,
      C,
      _,
      A,
      S,
      v,
      N,
      H,
      I,
      O,
      k,
      L,
      U,
      j,
      G,
      P,
      V,
      F,
      D,
      J,
      K,
      M,
      q,
      z,
      B;
    return {
      c() {
        (n = l('main')),
          (s = l('h2')),
          (s.textContent = 'User state'),
          (r = f()),
          (o = l('table')),
          (i = l('tr')),
          (p = l('tc')),
          (p.textContent = 'email:'),
          ($ = f()),
          (h = l('tc')),
          (g = d(e[0])),
          (y = f()),
          (b = l('tr')),
          (w = l('tc')),
          (w.textContent = 'id:'),
          (x = f()),
          (E = l('tc')),
          (T = d(e[1])),
          (C = f()),
          (_ = l('tr')),
          (A = l('tc')),
          (A.textContent = 'password:'),
          (S = f()),
          (v = l('tc')),
          (N = d(e[2])),
          (H = f()),
          (I = l('tr')),
          (O = l('tc')),
          (O.textContent = 'password hash:'),
          (k = f()),
          (L = l('tc')),
          (U = d(e[3])),
          (j = f()),
          (G = l('tr')),
          (P = l('tc')),
          (P.textContent = 'session:'),
          (V = f()),
          (F = l('tc')),
          (D = d(e[4])),
          (J = f()),
          (K = l('tr')),
          (M = l('tc')),
          (M.textContent = 'state:'),
          (q = f()),
          (z = l('tc')),
          (B = d(e[5]));
      },
      m(t, e) {
        c(t, n, e),
          a(n, s),
          a(n, r),
          a(n, o),
          a(o, i),
          a(i, p),
          a(i, $),
          a(i, h),
          a(h, g),
          a(o, y),
          a(o, b),
          a(b, w),
          a(b, x),
          a(b, E),
          a(E, T),
          a(o, C),
          a(o, _),
          a(_, A),
          a(_, S),
          a(_, v),
          a(v, N),
          a(o, H),
          a(o, I),
          a(I, O),
          a(I, k),
          a(I, L),
          a(L, U),
          a(o, j),
          a(o, G),
          a(G, P),
          a(G, V),
          a(G, F),
          a(F, D),
          a(o, J),
          a(o, K),
          a(K, M),
          a(K, q),
          a(K, z),
          a(z, B);
      },
      p(t, [e]) {
        1 & e && m(g, t[0]),
          2 & e && m(T, t[1]),
          4 & e && m(N, t[2]),
          8 & e && m(U, t[3]),
          16 & e && m(D, t[4]),
          32 & e && m(B, t[5]);
      },
      i: t,
      o: t,
      d(t) {
        t && u(n);
      },
    };
  }
  function dt(t, e, n) {
    let s, r, o, a, c, u, l;
    var d, f;
    return (
      (d = q),
      (f = (t) => n(6, (l = t))),
      t.$$.on_destroy.push(i(d, f)),
      (t.$$.update = () => {
        64 & t.$$.dirty && n(0, (s = l.email)),
          64 & t.$$.dirty && n(1, (r = l.emailHash)),
          64 & t.$$.dirty && n(2, (o = l.pwd)),
          64 & t.$$.dirty && n(3, (a = l.pwdHash)),
          64 & t.$$.dirty && n(4, (c = l.sessionId)),
          64 & t.$$.dirty && n(5, (u = l.state));
      }),
      [s, r, o, a, c, u, l]
    );
  }
  class ft extends P {
    constructor(t) {
      super(), G(this, t, dt, lt, o, {});
    }
  }
  function pt(e) {
    let n, s, r, o, i, d, p, $, m, h, g, y, b, w, x;
    return (
      (o = new ft({})),
      (d = new ut({})),
      ($ = new D({
        props: { name: 'Create user', description: 'POST /users', fn: nt },
      })),
      (h = new D({
        props: { name: 'Create session', description: 'POST /sessions', fn: Y },
      })),
      (y = new D({
        props: { name: 'Fetch user', description: 'GET /user', fn: rt },
      })),
      (w = new D({
        props: {
          name: 'Fetch model',
          description: 'GET /financial-model',
          fn: st,
        },
      })),
      {
        c() {
          (n = l('main')),
            (s = l('h1')),
            (s.textContent = 'Auth Model Spike'),
            (r = f()),
            k(o.$$.fragment),
            (i = f()),
            k(d.$$.fragment),
            (p = f()),
            k($.$$.fragment),
            (m = f()),
            k(h.$$.fragment),
            (g = f()),
            k(y.$$.fragment),
            (b = f()),
            k(w.$$.fragment);
        },
        m(t, e) {
          c(t, n, e),
            a(n, s),
            a(n, r),
            L(o, n, null),
            a(n, i),
            L(d, n, null),
            a(n, p),
            L($, n, null),
            a(n, m),
            L(h, n, null),
            a(n, g),
            L(y, n, null),
            a(n, b),
            L(w, n, null),
            (x = !0);
        },
        p: t,
        i(t) {
          x ||
            (I(o.$$.fragment, t),
            I(d.$$.fragment, t),
            I($.$$.fragment, t),
            I(h.$$.fragment, t),
            I(y.$$.fragment, t),
            I(w.$$.fragment, t),
            (x = !0));
        },
        o(t) {
          O(o.$$.fragment, t),
            O(d.$$.fragment, t),
            O($.$$.fragment, t),
            O(h.$$.fragment, t),
            O(y.$$.fragment, t),
            O(w.$$.fragment, t),
            (x = !1);
        },
        d(t) {
          t && u(n), U(o), U(d), U($), U(h), U(y), U(w);
        },
      }
    );
  }
  return new (class extends P {
    constructor(t) {
      super(), G(this, t, null, pt, o, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
