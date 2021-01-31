var app = (function () {
  'use strict';
  function t() {}
  function n(t) {
    return t();
  }
  function e() {
    return Object.create(null);
  }
  function o(t) {
    t.forEach(n);
  }
  function r(t) {
    return 'function' == typeof t;
  }
  function c(t, n) {
    return t != t
      ? n == n
      : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function s(t, n) {
    t.appendChild(n);
  }
  function i(t, n, e) {
    t.insertBefore(n, e || null);
  }
  function a(t) {
    t.parentNode.removeChild(t);
  }
  function u(t) {
    return document.createElement(t);
  }
  function f(t) {
    return document.createTextNode(t);
  }
  function l() {
    return f(' ');
  }
  function d(t, n) {
    (n = '' + n), t.wholeText !== n && (t.data = n);
  }
  let $;
  function p(t) {
    $ = t;
  }
  const m = [],
    h = [],
    g = [],
    y = [],
    b = Promise.resolve();
  let x = !1;
  function _(t) {
    g.push(t);
  }
  let k = !1;
  const v = new Set();
  function w() {
    if (!k) {
      k = !0;
      do {
        for (let t = 0; t < m.length; t += 1) {
          const n = m[t];
          p(n), E(n.$$);
        }
        for (p(null), m.length = 0; h.length; ) h.pop()();
        for (let t = 0; t < g.length; t += 1) {
          const n = g[t];
          v.has(n) || (v.add(n), n());
        }
        g.length = 0;
      } while (m.length);
      for (; y.length; ) y.pop()();
      (x = !1), (k = !1), v.clear();
    }
  }
  function E(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(_);
    }
  }
  const T = new Set();
  function C(t, n) {
    t && t.i && (T.delete(t), t.i(n));
  }
  function O(t, n, e, o) {
    if (t && t.o) {
      if (T.has(t)) return;
      T.add(t),
        undefined.c.push(() => {
          T.delete(t), o && (e && t.d(1), o());
        }),
        t.o(n);
    }
  }
  function S(t) {
    t && t.c();
  }
  function j(t, e, c) {
    const { fragment: s, on_mount: i, on_destroy: a, after_update: u } = t.$$;
    s && s.m(e, c),
      _(() => {
        const e = i.map(n).filter(r);
        a ? a.push(...e) : o(e), (t.$$.on_mount = []);
      }),
      u.forEach(_);
  }
  function A(t, n) {
    const e = t.$$;
    null !== e.fragment &&
      (o(e.on_destroy),
      e.fragment && e.fragment.d(n),
      (e.on_destroy = e.fragment = null),
      (e.ctx = []));
  }
  function N(t, n) {
    -1 === t.$$.dirty[0] &&
      (m.push(t), x || ((x = !0), b.then(w)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function F(n, r, c, s, i, u, f = [-1]) {
    const l = $;
    p(n);
    const d = (n.$$ = {
      fragment: null,
      ctx: null,
      props: u,
      update: t,
      not_equal: i,
      bound: e(),
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(l ? l.$$.context : []),
      callbacks: e(),
      dirty: f,
      skip_bound: !1,
    });
    let m = !1;
    if (
      ((d.ctx = c
        ? c(n, r.props || {}, (t, e, ...o) => {
            const r = o.length ? o[0] : e;
            return (
              d.ctx &&
                i(d.ctx[t], (d.ctx[t] = r)) &&
                (!d.skip_bound && d.bound[t] && d.bound[t](r), m && N(n, t)),
              e
            );
          })
        : []),
      d.update(),
      (m = !0),
      o(d.before_update),
      (d.fragment = !!s && s(d.ctx)),
      r.target)
    ) {
      if (r.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(r.target);
        d.fragment && d.fragment.l(t), t.forEach(a);
      } else d.fragment && d.fragment.c();
      r.intro && C(n.$$.fragment), j(n, r.target, r.anchor), w();
    }
    p(l);
  }
  class G {
    $destroy() {
      A(this, 1), (this.$destroy = t);
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
  function P(n) {
    let e, o, r, c, $, p, m, h, g, y, b, x, _;
    return {
      c() {
        var t, s, i;
        (e = u('main')),
          (o = u('h2')),
          (r = f(n[0])),
          (c = l()),
          ($ = u('p')),
          (p = f(n[1])),
          (m = l()),
          (h = u('button')),
          (h.textContent = 'Fire'),
          (g = l()),
          (y = u('div')),
          (b = f(n[2])),
          (t = e),
          (s = 'class'),
          null == (i = 'svelte-uuk00s')
            ? t.removeAttribute(s)
            : t.getAttribute(s) !== i && t.setAttribute(s, i);
      },
      m(t, a) {
        var u, f, l, d;
        i(t, e, a),
          s(e, o),
          s(o, r),
          s(e, c),
          s(e, $),
          s($, p),
          s(e, m),
          s(e, h),
          s(e, g),
          s(e, y),
          s(y, b),
          x ||
            ((u = h),
            (f = 'click'),
            (l = n[3]),
            u.addEventListener(f, l, d),
            (_ = () => u.removeEventListener(f, l, d)),
            (x = !0));
      },
      p(t, [n]) {
        1 & n && d(r, t[0]), 2 & n && d(p, t[1]), 4 & n && d(b, t[2]);
      },
      i: t,
      o: t,
      d(t) {
        t && a(e), (x = !1), _();
      },
    };
  }
  function L(t, n, e) {
    let o,
      { name: r } = n,
      { description: c } = n,
      { fn: s } = n;
    return (
      (t.$$set = (t) => {
        'name' in t && e(0, (r = t.name)),
          'description' in t && e(1, (c = t.description)),
          'fn' in t && e(4, (s = t.fn));
      }),
      e(2, (o = 'not yet clicked')),
      [
        r,
        c,
        o,
        async () => {
          e(2, (o = await s()));
        },
        s,
      ]
    );
  }
  class M extends G {
    constructor(t) {
      super(), F(this, t, L, P, c, { name: 0, description: 1, fn: 4 });
    }
  }
  const q = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
  var B = (t, n = {}) => async () => {
      try {
        const e = { ...q, ...n },
          o = await fetch(t, e);
        if (o.ok) {
          const t = await o.json();
          return `200: ${JSON.stringify(t)}`;
        }
        return `${o.status}: ${o.statusText}`;
      } catch (t) {
        return `500: ${t.name}: ${t.message}`;
      }
    },
    J = B('/user'),
    z = B('/financial-model'),
    D = B('/session', { method: 'POST' });
  function H(t) {
    let n, e, o, r, c, f, d, $, p;
    return (
      (r = new M({
        props: { name: 'Create session', description: 'POST /session', fn: D },
      })),
      (f = new M({
        props: { name: 'Fetch user', description: 'GET /user', fn: J },
      })),
      ($ = new M({
        props: {
          name: 'Fetch model',
          description: 'GET /financial-model',
          fn: z,
        },
      })),
      {
        c() {
          (n = u('main')),
            (e = u('h1')),
            (e.textContent = 'Auth Model Spike'),
            (o = l()),
            S(r.$$.fragment),
            (c = l()),
            S(f.$$.fragment),
            (d = l()),
            S($.$$.fragment);
        },
        m(t, a) {
          i(t, n, a),
            s(n, e),
            s(n, o),
            j(r, n, null),
            s(n, c),
            j(f, n, null),
            s(n, d),
            j($, n, null),
            (p = !0);
        },
        p(t, [n]) {
          const e = {};
          1 & n && (e.$$scope = { dirty: n, ctx: t }), r.$set(e);
          const o = {};
          1 & n && (o.$$scope = { dirty: n, ctx: t }), f.$set(o);
          const c = {};
          1 & n && (c.$$scope = { dirty: n, ctx: t }), $.$set(c);
        },
        i(t) {
          p ||
            (C(r.$$.fragment, t),
            C(f.$$.fragment, t),
            C($.$$.fragment, t),
            (p = !0));
        },
        o(t) {
          O(r.$$.fragment, t),
            O(f.$$.fragment, t),
            O($.$$.fragment, t),
            (p = !1);
        },
        d(t) {
          t && a(n), A(r), A(f), A($);
        },
      }
    );
  }
  return new (class extends G {
    constructor(t) {
      super(), F(this, t, null, H, c, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
