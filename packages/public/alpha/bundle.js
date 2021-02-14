var app = (function () {
  'use strict';
  function t() {}
  function e(t) {
    return t();
  }
  function n() {
    return Object.create(null);
  }
  function r(t) {
    t.forEach(e);
  }
  function s(t) {
    return 'function' == typeof t;
  }
  function o(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function i(e, ...n) {
    if (null == e) return t;
    const r = e.subscribe(...n);
    return r.unsubscribe ? () => r.unsubscribe() : r;
  }
  function a(t, e) {
    t.appendChild(e);
  }
  function u(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function c(t) {
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
  function p(t, e, n, r) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
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
  function b(t) {
    g = t;
  }
  const y = [],
    w = [],
    x = [],
    C = [],
    E = Promise.resolve();
  let T = !1;
  function v(t) {
    x.push(t);
  }
  let I = !1;
  const A = new Set();
  function _() {
    if (!I) {
      I = !0;
      do {
        for (let t = 0; t < y.length; t += 1) {
          const e = y[t];
          b(e), k(e.$$);
        }
        for (b(null), y.length = 0; w.length; ) w.pop()();
        for (let t = 0; t < x.length; t += 1) {
          const e = x[t];
          A.has(e) || (A.add(e), e());
        }
        x.length = 0;
      } while (y.length);
      for (; C.length; ) C.pop()();
      (T = !1), (I = !1), A.clear();
    }
  }
  function k(t) {
    if (null !== t.fragment) {
      t.update(), r(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(v);
    }
  }
  const N = new Set();
  function S(t, e) {
    t && t.i && (N.delete(t), t.i(e));
  }
  function H(t, e, n, r) {
    if (t && t.o) {
      if (N.has(t)) return;
      N.add(t),
        undefined.c.push(() => {
          N.delete(t), r && (n && t.d(1), r());
        }),
        t.o(e);
    }
  }
  function O(t) {
    t && t.c();
  }
  function j(t, n, o) {
    const { fragment: i, on_mount: a, on_destroy: u, after_update: c } = t.$$;
    i && i.m(n, o),
      v(() => {
        const n = a.map(e).filter(s);
        u ? u.push(...n) : r(n), (t.$$.on_mount = []);
      }),
      c.forEach(v);
  }
  function G(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (r(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function L(t, e) {
    -1 === t.$$.dirty[0] &&
      (y.push(t), T || ((T = !0), E.then(_)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function V(e, s, o, i, a, u, l = [-1]) {
    const d = g;
    b(e);
    const f = (e.$$ = {
      fragment: null,
      ctx: null,
      props: u,
      update: t,
      not_equal: a,
      bound: n(),
      on_mount: [],
      on_destroy: [],
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
        ? o(e, s.props || {}, (t, n, ...r) => {
            const s = r.length ? r[0] : n;
            return (
              f.ctx &&
                a(f.ctx[t], (f.ctx[t] = s)) &&
                (!f.skip_bound && f.bound[t] && f.bound[t](s), p && L(e, t)),
              n
            );
          })
        : []),
      f.update(),
      (p = !0),
      r(f.before_update),
      (f.fragment = !!i && i(f.ctx)),
      s.target)
    ) {
      if (s.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(s.target);
        f.fragment && f.fragment.l(t), t.forEach(c);
      } else f.fragment && f.fragment.c();
      s.intro && S(e.$$.fragment), j(e, s.target, s.anchor), _();
    }
    b(d);
  }
  class P {
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
  function U(e) {
    let n, r, s, o, i, h, g, b, y, w, x, C, E, T;
    return {
      c() {
        (n = l('main')),
          (r = l('h2')),
          (s = d(e[0])),
          (o = f()),
          (i = l('p')),
          (h = d(e[1])),
          (g = f()),
          (b = l('button')),
          (b.textContent = 'Fire'),
          (y = f()),
          (w = l('div')),
          (x = d(e[2])),
          $(w, 'style', (C = `color: ${e[3]}`));
      },
      m(t, c) {
        u(t, n, c),
          a(n, r),
          a(r, s),
          a(n, o),
          a(n, i),
          a(i, h),
          a(n, g),
          a(n, b),
          a(n, y),
          a(n, w),
          a(w, x),
          E || ((T = p(b, 'click', e[4])), (E = !0));
      },
      p(t, [e]) {
        1 & e && m(s, t[0]),
          2 & e && m(h, t[1]),
          4 & e && m(x, t[2]),
          8 & e && C !== (C = `color: ${t[3]}`) && $(w, 'style', C);
      },
      i: t,
      o: t,
      d(t) {
        t && c(n), (E = !1), T();
      },
    };
  }
  function F(t, e, n) {
    let r,
      s,
      { name: o } = e,
      { description: i } = e,
      { fn: a } = e;
    return (
      (t.$$set = (t) => {
        'name' in t && n(0, (o = t.name)),
          'description' in t && n(1, (i = t.description)),
          'fn' in t && n(5, (a = t.fn));
      }),
      n(2, (r = 'not yet clicked')),
      n(3, (s = 'black')),
      [
        o,
        i,
        r,
        s,
        async () => {
          try {
            n(2, (r = JSON.stringify(await a()))), n(3, (s = 'black'));
          } catch (t) {
            n(2, (r = t.message)), n(3, (s = 'red'));
          }
        },
        a,
      ]
    );
  }
  class J extends P {
    constructor(t) {
      super(), V(this, t, F, U, o, { name: 0, description: 1, fn: 5 });
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
      let r;
      const s = [];
      function i(t) {
        if (o(e, t) && ((e = t), r)) {
          const t = !M.length;
          for (let t = 0; t < s.length; t += 1) {
            const n = s[t];
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
          const u = [o, a];
          return (
            s.push(u),
            1 === s.length && (r = n(i) || t),
            o(e),
            () => {
              const t = s.indexOf(u);
              -1 !== t && s.splice(t, 1), 0 === s.length && (r(), (r = null));
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
    const r = await fetch(t, n);
    if (r.ok) return r.json();
    {
      const t = new Error(`Fetch error: ${r.status}: ${r.statusText}`);
      throw ((t.status = r.status), t);
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
  const Z = new TextEncoder();
  var tt = async (...t) => {
    const e = t.join(':'),
      n = Z.encode(e),
      r = await crypto.subtle.digest('SHA-512', n);
    return Array.from(new Uint8Array(r))
      .map((t) => t.toString(16).padStart(2, '0'))
      .join('');
  };
  let et;
  z.subscribe((t) => {
    (et = t.email), t.pwd;
  });
  const nt = async () => {
    const [t, e] = await Promise.all([tt(et), tt(et, undefined)]),
      n = { userId: t, email: et, pwd: e },
      r = await Q('/users', { method: 'POST', body: JSON.stringify(n) });
    return z.setValues({ userId: r.userId, pwdHash: r.pwd }), r;
  };
  var rt = () => Q('/financial-model'),
    st = async () => {
      const { userId: t } = (function (t) {
        let e;
        return i(t, (t) => (e = t))(), e;
      })(z);
      return Q(`/user/${t}`);
    };
  function ot(e) {
    let n, s, o, i, d, m, g, b, y, w, x, C, E, T, v;
    return {
      c() {
        (n = l('main')),
          (s = l('h2')),
          (s.textContent = 'User challenge'),
          (o = f()),
          (i = l('label')),
          (i.textContent = 'Email:'),
          (d = f()),
          (m = l('input')),
          (g = f()),
          (b = l('label')),
          (b.textContent = 'Password:'),
          (y = f()),
          (w = l('input')),
          (x = f()),
          (C = l('div')),
          (E = l('button')),
          (E.textContent = 'Submit'),
          $(i, 'for', 'email'),
          $(m, 'id', 'email'),
          $(b, 'for', 'pwd'),
          $(w, 'id', 'pwd');
      },
      m(t, r) {
        u(t, n, r),
          a(n, s),
          a(n, o),
          a(n, i),
          a(n, d),
          a(n, m),
          h(m, e[0]),
          a(n, g),
          a(n, b),
          a(n, y),
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
        t && c(n), (T = !1), r(v);
      },
    };
  }
  function it(t, e, n) {
    let r = '',
      s = '';
    return [
      r,
      s,
      () => {
        z.setValue('email', r), z.setValue('pwd', s);
      },
      function () {
        (r = this.value), n(0, r);
      },
      function () {
        (s = this.value), n(1, s);
      },
    ];
  }
  class at extends P {
    constructor(t) {
      super(), V(this, t, it, ot, o, {});
    }
  }
  function ut(e) {
    let n,
      r,
      s,
      o,
      i,
      p,
      $,
      h,
      g,
      b,
      y,
      w,
      x,
      C,
      E,
      T,
      v,
      I,
      A,
      _,
      k,
      N,
      S,
      H,
      O,
      j,
      G,
      L,
      V,
      P,
      U,
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
          (r = l('h2')),
          (r.textContent = 'User state'),
          (s = f()),
          (o = l('table')),
          (i = l('tr')),
          (p = l('tc')),
          (p.textContent = 'email:'),
          ($ = f()),
          (h = l('tc')),
          (g = d(e[0])),
          (b = f()),
          (y = l('tr')),
          (w = l('tc')),
          (w.textContent = 'id:'),
          (x = f()),
          (C = l('tc')),
          (E = d(e[1])),
          (T = f()),
          (v = l('tr')),
          (I = l('tc')),
          (I.textContent = 'password:'),
          (A = f()),
          (_ = l('tc')),
          (k = d(e[2])),
          (N = f()),
          (S = l('tr')),
          (H = l('tc')),
          (H.textContent = 'password hash:'),
          (O = f()),
          (j = l('tc')),
          (G = d(e[3])),
          (L = f()),
          (V = l('tr')),
          (P = l('tc')),
          (P.textContent = 'session:'),
          (U = f()),
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
        u(t, n, e),
          a(n, r),
          a(n, s),
          a(n, o),
          a(o, i),
          a(i, p),
          a(i, $),
          a(i, h),
          a(h, g),
          a(o, b),
          a(o, y),
          a(y, w),
          a(y, x),
          a(y, C),
          a(C, E),
          a(o, T),
          a(o, v),
          a(v, I),
          a(v, A),
          a(v, _),
          a(_, k),
          a(o, N),
          a(o, S),
          a(S, H),
          a(S, O),
          a(S, j),
          a(j, G),
          a(o, L),
          a(o, V),
          a(V, P),
          a(V, U),
          a(V, F),
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
          4 & e && m(k, t[2]),
          8 & e && m(G, t[3]),
          16 & e && m(J, t[4]),
          32 & e && m(X, t[5]);
      },
      i: t,
      o: t,
      d(t) {
        t && c(n);
      },
    };
  }
  function ct(t, e, n) {
    let r, s, o, a, u, c, l;
    var d, f;
    return (
      (d = z),
      (f = (t) => n(6, (l = t))),
      t.$$.on_destroy.push(i(d, f)),
      (t.$$.update = () => {
        64 & t.$$.dirty && n(0, (r = l.email)),
          64 & t.$$.dirty && n(1, (s = l.userId)),
          64 & t.$$.dirty && n(2, (o = l.pwd)),
          64 & t.$$.dirty && n(3, (a = l.pwdHash)),
          64 & t.$$.dirty && n(4, (u = l.sessionId)),
          64 & t.$$.dirty && n(5, (c = l.state));
      }),
      [r, s, o, a, u, c, l]
    );
  }
  class lt extends P {
    constructor(t) {
      super(), V(this, t, ct, ut, o, {});
    }
  }
  function dt(e) {
    let n, r, s, o, i, d, p, $, m, h, g, b, y, w, x;
    return (
      (o = new lt({})),
      (d = new at({})),
      ($ = new J({
        props: { name: 'Create user', description: 'POST /users', fn: nt },
      })),
      (h = new J({
        props: { name: 'Create session', description: 'POST /sessions', fn: Y },
      })),
      (b = new J({
        props: { name: 'Fetch user', description: 'GET /user', fn: st },
      })),
      (w = new J({
        props: {
          name: 'Fetch model',
          description: 'GET /financial-model',
          fn: rt,
        },
      })),
      {
        c() {
          (n = l('main')),
            (r = l('h1')),
            (r.textContent = 'Auth Model Spike'),
            (s = f()),
            O(o.$$.fragment),
            (i = f()),
            O(d.$$.fragment),
            (p = f()),
            O($.$$.fragment),
            (m = f()),
            O(h.$$.fragment),
            (g = f()),
            O(b.$$.fragment),
            (y = f()),
            O(w.$$.fragment);
        },
        m(t, e) {
          u(t, n, e),
            a(n, r),
            a(n, s),
            j(o, n, null),
            a(n, i),
            j(d, n, null),
            a(n, p),
            j($, n, null),
            a(n, m),
            j(h, n, null),
            a(n, g),
            j(b, n, null),
            a(n, y),
            j(w, n, null),
            (x = !0);
        },
        p: t,
        i(t) {
          x ||
            (S(o.$$.fragment, t),
            S(d.$$.fragment, t),
            S($.$$.fragment, t),
            S(h.$$.fragment, t),
            S(b.$$.fragment, t),
            S(w.$$.fragment, t),
            (x = !0));
        },
        o(t) {
          H(o.$$.fragment, t),
            H(d.$$.fragment, t),
            H($.$$.fragment, t),
            H(h.$$.fragment, t),
            H(b.$$.fragment, t),
            H(w.$$.fragment, t),
            (x = !1);
        },
        d(t) {
          t && c(n), G(o), G(d), G($), G(h), G(b), G(w);
        },
      }
    );
  }
  return new (class extends P {
    constructor(t) {
      super(), V(this, t, null, dt, o, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
