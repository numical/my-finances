var app = (function () {
  'use strict';
  function t() {}
  function n(t) {
    return t();
  }
  function e() {
    return Object.create(null);
  }
  function r(t) {
    t.forEach(n);
  }
  function o(t) {
    return 'function' == typeof t;
  }
  function i(t, n) {
    return t != t
      ? n == n
      : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function s(n, ...e) {
    if (null == n) return t;
    const r = n.subscribe(...e);
    return r.unsubscribe ? () => r.unsubscribe() : r;
  }
  function c(t) {
    let n;
    return s(t, (t) => (n = t))(), n;
  }
  function a(t, n) {
    t.appendChild(n);
  }
  function u(t, n, e) {
    t.insertBefore(n, e || null);
  }
  function l(t) {
    t.parentNode.removeChild(t);
  }
  function f(t) {
    return document.createElement(t);
  }
  function d(t) {
    return document.createTextNode(t);
  }
  function p() {
    return d(' ');
  }
  function $(t, n, e, r) {
    return t.addEventListener(n, e, r), () => t.removeEventListener(n, e, r);
  }
  function m(t, n, e) {
    null == e
      ? t.removeAttribute(n)
      : t.getAttribute(n) !== e && t.setAttribute(n, e);
  }
  function h(t, n) {
    (n = '' + n), t.wholeText !== n && (t.data = n);
  }
  function g(t, n) {
    t.value = null == n ? '' : n;
  }
  let y;
  function b(t) {
    y = t;
  }
  const w = [],
    x = [],
    v = [],
    _ = [],
    C = Promise.resolve();
  let k = !1;
  function E(t) {
    v.push(t);
  }
  let S = !1;
  const T = new Set();
  function O() {
    if (!S) {
      S = !0;
      do {
        for (let t = 0; t < w.length; t += 1) {
          const n = w[t];
          b(n), A(n.$$);
        }
        for (b(null), w.length = 0; x.length; ) x.pop()();
        for (let t = 0; t < v.length; t += 1) {
          const n = v[t];
          T.has(n) || (T.add(n), n());
        }
        v.length = 0;
      } while (w.length);
      for (; _.length; ) _.pop()();
      (k = !1), (S = !1), T.clear();
    }
  }
  function A(t) {
    if (null !== t.fragment) {
      t.update(), r(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(E);
    }
  }
  const j = new Set();
  function P(t, n) {
    t && t.i && (j.delete(t), t.i(n));
  }
  function N(t, n, e, r) {
    if (t && t.o) {
      if (j.has(t)) return;
      j.add(t),
        undefined.c.push(() => {
          j.delete(t), r && (e && t.d(1), r());
        }),
        t.o(n);
    }
  }
  function F(t) {
    t && t.c();
  }
  function H(t, e, i) {
    const { fragment: s, on_mount: c, on_destroy: a, after_update: u } = t.$$;
    s && s.m(e, i),
      E(() => {
        const e = c.map(n).filter(o);
        a ? a.push(...e) : r(e), (t.$$.on_mount = []);
      }),
      u.forEach(E);
  }
  function G(t, n) {
    const e = t.$$;
    null !== e.fragment &&
      (r(e.on_destroy),
      e.fragment && e.fragment.d(n),
      (e.on_destroy = e.fragment = null),
      (e.ctx = []));
  }
  function U(t, n) {
    -1 === t.$$.dirty[0] &&
      (w.push(t), k || ((k = !0), C.then(O)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function J(n, o, i, s, c, a, u = [-1]) {
    const f = y;
    b(n);
    const d = (n.$$ = {
      fragment: null,
      ctx: null,
      props: a,
      update: t,
      not_equal: c,
      bound: e(),
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(f ? f.$$.context : []),
      callbacks: e(),
      dirty: u,
      skip_bound: !1,
    });
    let p = !1;
    if (
      ((d.ctx = i
        ? i(n, o.props || {}, (t, e, ...r) => {
            const o = r.length ? r[0] : e;
            return (
              d.ctx &&
                c(d.ctx[t], (d.ctx[t] = o)) &&
                (!d.skip_bound && d.bound[t] && d.bound[t](o), p && U(n, t)),
              e
            );
          })
        : []),
      d.update(),
      (p = !0),
      r(d.before_update),
      (d.fragment = !!s && s(d.ctx)),
      o.target)
    ) {
      if (o.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(o.target);
        d.fragment && d.fragment.l(t), t.forEach(l);
      } else d.fragment && d.fragment.c();
      o.intro && P(n.$$.fragment), H(n, o.target, o.anchor), O();
    }
    b(f);
  }
  class L {
    $destroy() {
      G(this, 1), (this.$destroy = t);
    }
    $on(t, n) {
      const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        e.push(n),
        () => {
          const t = e.indexOf(n);
          -1 !== t && e.splice(t, 1);
        }
      );
    }
    $set(t) {
      var n;
      this.$$set &&
        ((n = t), 0 !== Object.keys(n).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  function M(n) {
    let e, r, o, i, s, c, g, y, b, w, x, v, _, C;
    return {
      c() {
        (e = f('main')),
          (r = f('h2')),
          (o = d(n[0])),
          (i = p()),
          (s = f('p')),
          (c = d(n[1])),
          (g = p()),
          (y = f('button')),
          (y.textContent = 'Fire'),
          (b = p()),
          (w = f('div')),
          (x = d(n[2])),
          m(w, 'style', (v = `color: ${n[3]}`));
      },
      m(t, l) {
        u(t, e, l),
          a(e, r),
          a(r, o),
          a(e, i),
          a(e, s),
          a(s, c),
          a(e, g),
          a(e, y),
          a(e, b),
          a(e, w),
          a(w, x),
          _ || ((C = $(y, 'click', n[4])), (_ = !0));
      },
      p(t, [n]) {
        1 & n && h(o, t[0]),
          2 & n && h(c, t[1]),
          4 & n && h(x, t[2]),
          8 & n && v !== (v = `color: ${t[3]}`) && m(w, 'style', v);
      },
      i: t,
      o: t,
      d(t) {
        t && l(e), (_ = !1), C();
      },
    };
  }
  function q(t, n, e) {
    let r,
      o,
      { name: i } = n,
      { description: s } = n,
      { fn: c } = n;
    return (
      (t.$$set = (t) => {
        'name' in t && e(0, (i = t.name)),
          'description' in t && e(1, (s = t.description)),
          'fn' in t && e(5, (c = t.fn));
      }),
      e(2, (r = 'not yet clicked')),
      e(3, (o = 'black')),
      [
        i,
        s,
        r,
        o,
        async () => {
          try {
            e(2, (r = JSON.stringify(await c()))), e(3, (o = 'black'));
          } catch (t) {
            e(2, (r = t.message)), e(3, (o = 'red'));
          }
        },
        c,
      ]
    );
  }
  class B extends L {
    constructor(t) {
      super(), J(this, t, q, M, i, { name: 0, description: 1, fn: 5 });
    }
  }
  const z = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
  var D = async (t, n = {}) => {
      const e = { ...z, ...n },
        r = await fetch(t, e);
      if (r.ok) return r.json();
      throw new Error(`Fetch error: ${r.status}: ${r.statusText}`);
    },
    I = () => D('/session', { method: 'POST' });
  const K = [];
  const Q = ((n) => {
      const e = (function (n, e = t) {
        let r;
        const o = [];
        function s(t) {
          if (i(n, t) && ((n = t), r)) {
            const t = !K.length;
            for (let t = 0; t < o.length; t += 1) {
              const e = o[t];
              e[1](), K.push(e, n);
            }
            if (t) {
              for (let t = 0; t < K.length; t += 2) K[t][0](K[t + 1]);
              K.length = 0;
            }
          }
        }
        return {
          set: s,
          update: function (t) {
            s(t(n));
          },
          subscribe: function (i, c = t) {
            const a = [i, c];
            return (
              o.push(a),
              1 === o.length && (r = e(s) || t),
              i(n),
              () => {
                const t = o.indexOf(a);
                -1 !== t && o.splice(t, 1), 0 === o.length && (r(), (r = null));
              }
            );
          },
        };
      })({ ...n });
      return (e.set = (t, n) => e.update((e) => ({ ...e, [t]: n }))), e;
    })({ email: '', id: '', pwd: '', pwdHash: '', state: 'not logged in' }),
    R = new TextEncoder();
  var V = async (...t) => {
    const n = t.join(':'),
      e = R.encode(n),
      r = await crypto.subtle.digest('SHA-512', e);
    return Array.from(new Uint8Array(r))
      .map((t) => t.toString(16).padStart(2, '0'))
      .join('');
  };
  const W = async () => {
    const { email: t, pwd: n } = c(Q),
      [e, r] = await Promise.all([V(t), V(t, n)]),
      o = { id: e, email: t, pwd: r },
      i = await D('/users', { method: 'POST', body: JSON.stringify(o) });
    return Q.set('id', i.id), Q.set('pwdHash', i.pwd), i;
  };
  var X = () => D('/financial-model'),
    Y = async () => {
      const { id: t } = c(Q);
      return D(`/user/${t}`);
    };
  function Z(n) {
    let e, o, i, s, c, d, h, y, b, w, x, v, _, C, k;
    return {
      c() {
        (e = f('main')),
          (o = f('h2')),
          (o.textContent = 'User challenge'),
          (i = p()),
          (s = f('label')),
          (s.textContent = 'Email:'),
          (c = p()),
          (d = f('input')),
          (h = p()),
          (y = f('label')),
          (y.textContent = 'Password:'),
          (b = p()),
          (w = f('input')),
          (x = p()),
          (v = f('div')),
          (_ = f('button')),
          (_.textContent = 'Submit'),
          m(s, 'for', 'email'),
          m(d, 'id', 'email'),
          m(y, 'for', 'pwd'),
          m(w, 'id', 'pwd');
      },
      m(t, r) {
        u(t, e, r),
          a(e, o),
          a(e, i),
          a(e, s),
          a(e, c),
          a(e, d),
          g(d, n[0]),
          a(e, h),
          a(e, y),
          a(e, b),
          a(e, w),
          g(w, n[1]),
          a(e, x),
          a(e, v),
          a(v, _),
          C ||
            ((k = [
              $(d, 'input', n[3]),
              $(w, 'input', n[4]),
              $(_, 'click', n[2]),
            ]),
            (C = !0));
      },
      p(t, [n]) {
        1 & n && d.value !== t[0] && g(d, t[0]),
          2 & n && w.value !== t[1] && g(w, t[1]);
      },
      i: t,
      o: t,
      d(t) {
        t && l(e), (C = !1), r(k);
      },
    };
  }
  function tt(t, n, e) {
    let r = '',
      o = '';
    return [
      r,
      o,
      () => {
        Q.set('email', r), Q.set('pwd', o);
      },
      function () {
        (r = this.value), e(0, r);
      },
      function () {
        (o = this.value), e(1, o);
      },
    ];
  }
  class nt extends L {
    constructor(t) {
      super(), J(this, t, tt, Z, i, {});
    }
  }
  function et(n) {
    let e,
      r,
      o,
      i,
      s,
      c,
      $,
      m,
      g,
      y,
      b,
      w,
      x,
      v,
      _,
      C,
      k,
      E,
      S,
      T,
      O,
      A,
      j,
      P,
      N,
      F,
      H,
      G,
      U,
      J,
      L,
      M,
      q;
    return {
      c() {
        (e = f('main')),
          (r = f('h2')),
          (r.textContent = 'User state'),
          (o = p()),
          (i = f('table')),
          (s = f('tr')),
          (c = f('tc')),
          (c.textContent = 'email:'),
          ($ = p()),
          (m = f('tc')),
          (g = d(n[0])),
          (y = p()),
          (b = f('tr')),
          (w = f('tc')),
          (w.textContent = 'id:'),
          (x = p()),
          (v = f('tc')),
          (_ = d(n[1])),
          (C = p()),
          (k = f('tr')),
          (E = f('tc')),
          (E.textContent = 'password:'),
          (S = p()),
          (T = f('tc')),
          (O = d(n[2])),
          (A = p()),
          (j = f('tr')),
          (P = f('tc')),
          (P.textContent = 'password hash:'),
          (N = p()),
          (F = f('tc')),
          (H = d(n[3])),
          (G = p()),
          (U = f('tr')),
          (J = f('tc')),
          (J.textContent = 'state:'),
          (L = p()),
          (M = f('tc')),
          (q = d(n[4]));
      },
      m(t, n) {
        u(t, e, n),
          a(e, r),
          a(e, o),
          a(e, i),
          a(i, s),
          a(s, c),
          a(s, $),
          a(s, m),
          a(m, g),
          a(i, y),
          a(i, b),
          a(b, w),
          a(b, x),
          a(b, v),
          a(v, _),
          a(i, C),
          a(i, k),
          a(k, E),
          a(k, S),
          a(k, T),
          a(T, O),
          a(i, A),
          a(i, j),
          a(j, P),
          a(j, N),
          a(j, F),
          a(F, H),
          a(j, G),
          a(i, U),
          a(U, J),
          a(U, L),
          a(U, M),
          a(M, q);
      },
      p(t, [n]) {
        1 & n && h(g, t[0]),
          2 & n && h(_, t[1]),
          4 & n && h(O, t[2]),
          8 & n && h(H, t[3]),
          16 & n && h(q, t[4]);
      },
      i: t,
      o: t,
      d(t) {
        t && l(e);
      },
    };
  }
  function rt(t, n, e) {
    let r, o, i, c, a, u;
    var l, f;
    return (
      (l = Q),
      (f = (t) => e(5, (u = t))),
      t.$$.on_destroy.push(s(l, f)),
      (t.$$.update = () => {
        32 & t.$$.dirty && e(0, (r = u.email)),
          32 & t.$$.dirty && e(1, (o = u.id)),
          32 & t.$$.dirty && e(2, (i = u.pwd)),
          32 & t.$$.dirty && e(3, (c = u.pwdHash)),
          32 & t.$$.dirty && e(4, (a = u.state));
      }),
      [r, o, i, c, a, u]
    );
  }
  class ot extends L {
    constructor(t) {
      super(), J(this, t, rt, et, i, {});
    }
  }
  function it(n) {
    let e, r, o, i, s, c, d, $, m, h, g, y, b, w, x;
    return (
      (i = new ot({})),
      (c = new nt({})),
      ($ = new B({
        props: {
          name: 'Create userInitial',
          description: 'POST /users',
          fn: W,
        },
      })),
      (h = new B({
        props: { name: 'Create session', description: 'POST /sessions', fn: I },
      })),
      (y = new B({
        props: {
          name: 'Fetch userInitial',
          description: 'GET /userInitial',
          fn: Y,
        },
      })),
      (w = new B({
        props: {
          name: 'Fetch model',
          description: 'GET /financial-model',
          fn: X,
        },
      })),
      {
        c() {
          (e = f('main')),
            (r = f('h1')),
            (r.textContent = 'Auth Model Spike'),
            (o = p()),
            F(i.$$.fragment),
            (s = p()),
            F(c.$$.fragment),
            (d = p()),
            F($.$$.fragment),
            (m = p()),
            F(h.$$.fragment),
            (g = p()),
            F(y.$$.fragment),
            (b = p()),
            F(w.$$.fragment);
        },
        m(t, n) {
          u(t, e, n),
            a(e, r),
            a(e, o),
            H(i, e, null),
            a(e, s),
            H(c, e, null),
            a(e, d),
            H($, e, null),
            a(e, m),
            H(h, e, null),
            a(e, g),
            H(y, e, null),
            a(e, b),
            H(w, e, null),
            (x = !0);
        },
        p: t,
        i(t) {
          x ||
            (P(i.$$.fragment, t),
            P(c.$$.fragment, t),
            P($.$$.fragment, t),
            P(h.$$.fragment, t),
            P(y.$$.fragment, t),
            P(w.$$.fragment, t),
            (x = !0));
        },
        o(t) {
          N(i.$$.fragment, t),
            N(c.$$.fragment, t),
            N($.$$.fragment, t),
            N(h.$$.fragment, t),
            N(y.$$.fragment, t),
            N(w.$$.fragment, t),
            (x = !1);
        },
        d(t) {
          t && l(e), G(i), G(c), G($), G(h), G(y), G(w);
        },
      }
    );
  }
  return new (class extends L {
    constructor(t) {
      super(), J(this, t, null, it, i, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
