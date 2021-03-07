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
    C = [],
    E = Promise.resolve();
  let T = !1;
  function v(t) {
    x.push(t);
  }
  let _ = !1;
  const A = new Set();
  function H() {
    if (!_) {
      _ = !0;
      do {
        for (let t = 0; t < b.length; t += 1) {
          const e = b[t];
          y(e), I(e.$$);
        }
        for (y(null), b.length = 0; w.length; ) w.pop()();
        for (let t = 0; t < x.length; t += 1) {
          const e = x[t];
          A.has(e) || (A.add(e), e());
        }
        x.length = 0;
      } while (b.length);
      for (; C.length; ) C.pop()();
      (T = !1), (_ = !1), A.clear();
    }
  }
  function I(t) {
    if (null !== t.fragment) {
      t.update(), s(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(v);
    }
  }
  const k = new Set();
  function N(t, e) {
    t && t.i && (k.delete(t), t.i(e));
  }
  function S(t, e, n, s) {
    if (t && t.o) {
      if (k.has(t)) return;
      k.add(t),
        undefined.c.push(() => {
          k.delete(t), s && (n && t.d(1), s());
        }),
        t.o(e);
    }
  }
  function O(t) {
    t && t.c();
  }
  function j(t, n, o, i) {
    const { fragment: a, on_mount: c, on_destroy: u, after_update: l } = t.$$;
    a && a.m(n, o),
      i ||
        v(() => {
          const n = c.map(e).filter(r);
          u ? u.push(...n) : s(n), (t.$$.on_mount = []);
        }),
      l.forEach(v);
  }
  function G(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (s(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function L(t, e) {
    -1 === t.$$.dirty[0] &&
      (b.push(t), T || ((T = !0), E.then(H)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function P(e, r, o, i, a, c, l = [-1]) {
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
      context: new Map(d ? d.$$.context : []),
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
                (!f.skip_bound && f.bound[t] && f.bound[t](r), p && L(e, t)),
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
      r.intro && N(e.$$.fragment),
        j(e, r.target, r.anchor, r.customElement),
        H();
    }
    y(d);
  }
  class U {
    $destroy() {
      G(this, 1), (this.$destroy = t);
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
    let n, s, r, o, i, h, g, y, b, w, x, C, E, T;
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
          $(w, 'style', (C = `color: ${e[3]}`));
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
          E || ((T = p(y, 'click', e[4])), (E = !0));
      },
      p(t, [e]) {
        1 & e && m(r, t[0]),
          2 & e && m(h, t[1]),
          4 & e && m(x, t[2]),
          8 & e && C !== (C = `color: ${t[3]}`) && $(w, 'style', C);
      },
      i: t,
      o: t,
      d(t) {
        t && u(n), (E = !1), T();
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
  class J extends U {
    constructor(t) {
      super(), P(this, t, F, V, o, { name: 0, description: 1, fn: 5 });
    }
  }
  const D = {
    CHALLENGE: 'challenge',
    AUTHENTICATING: 'authenticating',
    AUTHENTICATED: 'authenticated',
  };
  D.initial = {
    email: '',
    userId: '',
    pwd: '',
    pwdHash: '',
    sessionId: '',
    state: D.CHALLENGE,
    timeout: 0,
  };
  const M = [];
  var q = (e = {}) => {
    const n = (function (e, n = t) {
      let s;
      const r = [];
      function i(t) {
        if (o(e, t) && ((e = t), s)) {
          const t = !M.length;
          for (let t = 0; t < r.length; t += 1) {
            const n = r[t];
            n[1](), M.push(n, e);
          }
          if (t) {
            for (let t = 0; t < M.length; t += 2) M[t][0](M[t + 1]);
            M.length = 0;
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
  const z = q(D.initial);
  q(), q();
  var B = 'X-Csrf-Token';
  const X = Object.freeze({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  let K;
  z.subscribe((t) => {
    K = t.sessionId;
  });
  var Q = async (t, e = {}) => {
    const n = { ...X, ...e };
    K && (n.headers[B] = K);
    const s = await fetch(t, n);
    if (s.ok) return s.json();
    {
      const t = new Error(`Fetch error: ${s.status}: ${s.statusText}`);
      throw ((t.status = s.status), t);
    }
  };
  let R, W;
  z.subscribe((t) => {
    (R = t.userId), (W = t.pwdHash);
  });
  var Y = async () => {
    try {
      z.setValue('state', D.AUTHENTICATING);
      const t = { userId: R, pwd: W },
        { sessionId: e, timeout: n } = await Q('/sessions', {
          method: 'POST',
          body: JSON.stringify(t),
        });
      return (
        z.setValues({ state: D.AUTHENTICATED, sessionId: e, timeout: n }),
        { sessionId: e, timeout: n }
      );
    } catch (t) {
      throw (z.setValue('state', D.CHALLENGE), t);
    }
  };
  let Z, tt, et;
  z.subscribe((t) => {
    (Z = t.email), (tt = t.emailHash), (et = t.pwdHash);
  });
  const nt = async () => {
    const t = { userId: tt, email: Z, pwd: et },
      e = await Q('/users', { method: 'POST', body: JSON.stringify(t) });
    return z.setValues({ emailHash: e.userId, pwdHash: e.pwd }), e;
  };
  var st = () => Q('/financial-model'),
    rt = async () => {
      const { emailHash: t } = (function (t) {
        let e;
        return i(t, (t) => (e = t))(), e;
      })(z);
      return Q(`/user/${t}`);
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
    let n, r, o, i, d, m, g, y, b, w, x, C, E, T, v;
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
          (C = l('div')),
          (E = l('button')),
          (E.textContent = 'Submit'),
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
          a(n, C),
          a(C, E),
          T ||
            ((v = [
              p(m, 'input', e[3]),
              p(w, 'input', e[4]),
              p(E, 'click', e[2]),
            ]),
            (T = !0));
      },
      p(t, [e]) {
        1 & e && m.value !== t[0] && h(m, t[0]),
          2 & e && w.value !== t[1] && h(w, t[1]);
      },
      i: t,
      o: t,
      d(t) {
        t && u(n), (T = !1), s(v);
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
        z.setValues({ email: s, emailHash: t, pwd: r, pwdHash: e });
      },
      function () {
        (s = this.value), n(0, s);
      },
      function () {
        (r = this.value), n(1, r);
      },
    ];
  }
  class ut extends U {
    constructor(t) {
      super(), P(this, t, ct, at, o, {});
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
      C,
      E,
      T,
      v,
      _,
      A,
      H,
      I,
      k,
      N,
      S,
      O,
      j,
      G,
      L,
      P,
      U,
      V,
      F,
      J,
      D,
      M,
      q,
      z,
      B,
      X;
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
          (C = l('tc')),
          (E = d(e[1])),
          (T = f()),
          (v = l('tr')),
          (_ = l('tc')),
          (_.textContent = 'password:'),
          (A = f()),
          (H = l('tc')),
          (I = d(e[2])),
          (k = f()),
          (N = l('tr')),
          (S = l('tc')),
          (S.textContent = 'password hash:'),
          (O = f()),
          (j = l('tc')),
          (G = d(e[3])),
          (L = f()),
          (P = l('tr')),
          (U = l('tc')),
          (U.textContent = 'session:'),
          (V = f()),
          (F = l('tc')),
          (J = d(e[4])),
          (D = f()),
          (M = l('tr')),
          (q = l('tc')),
          (q.textContent = 'state:'),
          (z = f()),
          (B = l('tc')),
          (X = d(e[5]));
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
          a(b, C),
          a(C, E),
          a(o, T),
          a(o, v),
          a(v, _),
          a(v, A),
          a(v, H),
          a(H, I),
          a(o, k),
          a(o, N),
          a(N, S),
          a(N, O),
          a(N, j),
          a(j, G),
          a(o, L),
          a(o, P),
          a(P, U),
          a(P, V),
          a(P, F),
          a(F, J),
          a(o, D),
          a(o, M),
          a(M, q),
          a(M, z),
          a(M, B),
          a(B, X);
      },
      p(t, [e]) {
        1 & e && m(g, t[0]),
          2 & e && m(E, t[1]),
          4 & e && m(I, t[2]),
          8 & e && m(G, t[3]),
          16 & e && m(J, t[4]),
          32 & e && m(X, t[5]);
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
      (d = z),
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
  class ft extends U {
    constructor(t) {
      super(), P(this, t, dt, lt, o, {});
    }
  }
  function pt(e) {
    let n, s, r, o, i, d, p, $, m, h, g, y, b, w, x;
    return (
      (o = new ft({})),
      (d = new ut({})),
      ($ = new J({
        props: { name: 'Create user', description: 'POST /users', fn: nt },
      })),
      (h = new J({
        props: { name: 'Create session', description: 'POST /sessions', fn: Y },
      })),
      (y = new J({
        props: { name: 'Fetch user', description: 'GET /user', fn: rt },
      })),
      (w = new J({
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
            O(o.$$.fragment),
            (i = f()),
            O(d.$$.fragment),
            (p = f()),
            O($.$$.fragment),
            (m = f()),
            O(h.$$.fragment),
            (g = f()),
            O(y.$$.fragment),
            (b = f()),
            O(w.$$.fragment);
        },
        m(t, e) {
          c(t, n, e),
            a(n, s),
            a(n, r),
            j(o, n, null),
            a(n, i),
            j(d, n, null),
            a(n, p),
            j($, n, null),
            a(n, m),
            j(h, n, null),
            a(n, g),
            j(y, n, null),
            a(n, b),
            j(w, n, null),
            (x = !0);
        },
        p: t,
        i(t) {
          x ||
            (N(o.$$.fragment, t),
            N(d.$$.fragment, t),
            N($.$$.fragment, t),
            N(h.$$.fragment, t),
            N(y.$$.fragment, t),
            N(w.$$.fragment, t),
            (x = !0));
        },
        o(t) {
          S(o.$$.fragment, t),
            S(d.$$.fragment, t),
            S($.$$.fragment, t),
            S(h.$$.fragment, t),
            S(y.$$.fragment, t),
            S(w.$$.fragment, t),
            (x = !1);
        },
        d(t) {
          t && u(n), G(o), G(d), G($), G(h), G(y), G(w);
        },
      }
    );
  }
  return new (class extends U {
    constructor(t) {
      super(), P(this, t, null, pt, o, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
