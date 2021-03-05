
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/APICaller.svelte generated by Svelte v3.35.0 */

    const { console: console_1 } = globals;
    const file$3 = "src/components/APICaller.svelte";

    function create_fragment$3(ctx) {
    	let main;
    	let h2;
    	let t0;
    	let t1;
    	let p;
    	let t2;
    	let t3;
    	let button;
    	let t5;
    	let div;
    	let t6;
    	let div_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			p = element("p");
    			t2 = text(/*description*/ ctx[1]);
    			t3 = space();
    			button = element("button");
    			button.textContent = "Fire";
    			t5 = space();
    			div = element("div");
    			t6 = text(/*result*/ ctx[2]);
    			add_location(h2, file$3, 21, 2, 363);
    			add_location(p, file$3, 22, 2, 381);
    			add_location(button, file$3, 23, 2, 404);
    			attr_dev(div, "style", div_style_value = `color: ${/*colour*/ ctx[3]}`);
    			add_location(div, file$3, 24, 2, 449);
    			add_location(main, file$3, 20, 0, 354);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(h2, t0);
    			append_dev(main, t1);
    			append_dev(main, p);
    			append_dev(p, t2);
    			append_dev(main, t3);
    			append_dev(main, button);
    			append_dev(main, t5);
    			append_dev(main, div);
    			append_dev(div, t6);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*onClick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
    			if (dirty & /*description*/ 2) set_data_dev(t2, /*description*/ ctx[1]);
    			if (dirty & /*result*/ 4) set_data_dev(t6, /*result*/ ctx[2]);

    			if (dirty & /*colour*/ 8 && div_style_value !== (div_style_value = `color: ${/*colour*/ ctx[3]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let result;
    	let colour;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("APICaller", slots, []);
    	let { name } = $$props;
    	let { description } = $$props;
    	let { fn } = $$props;

    	const onClick = async () => {
    		try {
    			$$invalidate(2, result = JSON.stringify(await fn()));
    			$$invalidate(3, colour = "black");
    		} catch(err) {
    			console.log(err);
    			$$invalidate(2, result = err.message);
    			$$invalidate(3, colour = "red");
    		}
    	};

    	const writable_props = ["name", "description", "fn"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<APICaller> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("fn" in $$props) $$invalidate(5, fn = $$props.fn);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		description,
    		fn,
    		onClick,
    		result,
    		colour
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("fn" in $$props) $$invalidate(5, fn = $$props.fn);
    		if ("result" in $$props) $$invalidate(2, result = $$props.result);
    		if ("colour" in $$props) $$invalidate(3, colour = $$props.colour);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(2, result = "not yet clicked");
    	$$invalidate(3, colour = "black");
    	return [name, description, result, colour, onClick, fn];
    }

    class APICaller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { name: 0, description: 1, fn: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "APICaller",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console_1.warn("<APICaller> was created without expected prop 'name'");
    		}

    		if (/*description*/ ctx[1] === undefined && !("description" in props)) {
    			console_1.warn("<APICaller> was created without expected prop 'description'");
    		}

    		if (/*fn*/ ctx[5] === undefined && !("fn" in props)) {
    			console_1.warn("<APICaller> was created without expected prop 'fn'");
    		}
    	}

    	get name() {
    		throw new Error("<APICaller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<APICaller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<APICaller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<APICaller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fn() {
    		throw new Error("<APICaller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fn(value) {
    		throw new Error("<APICaller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const Auth = {
      CHALLENGE: 'challenge',
      AUTHENTICATING: 'authenticating',
      AUTHENTICATED: 'authenticated',
    };

    Auth.initial = {
      email: '',
      userId: '',
      pwd: '',
      pwdHash: '',
      sessionId: '',
      state: Auth.CHALLENGE,
      timeout: 0,
    };

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var genericStore = (initialState = {}) => {
      const store = writable({
        ...initialState,
      });

      // do not override default Svelte 'set' method
      store.setValue = (key, value) =>
        store.update((state) => ({
          ...state,
          [key]: value,
        }));

      store.setValues = (values) =>
        store.update((state) => ({
          ...state,
          ...values,
        }));

      return store;
    };

    const authStore = genericStore(Auth.initial);

    genericStore();

    genericStore();

    var src = {
      SESSION_TOKEN: 'X-Csrf-Token',
    };

    const DEFAULT_OPTIONS = Object.freeze({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let sessionId;
    authStore.subscribe((auth) => {
      sessionId = auth.sessionId;
    });

    var wrapFetch = async (path, options = {}) => {
      const allOptions = { ...DEFAULT_OPTIONS, ...options };
      if (sessionId) {
        allOptions.headers[src.SESSION_TOKEN] = sessionId;
      }
      const response = await fetch(path, allOptions);
      if (response.ok) {
        return response.json();
      } else {
        const err = new Error(
          `Fetch error: ${response.status}: ${response.statusText}`
        );
        err.status = response.status;
        throw err;
      }
    };

    let userId, pwd$1;
    authStore.subscribe((auth) => {
      userId = auth.userId;
      pwd$1 = auth.pwdHash;
    });

    var createSession = async () => {
      try {
        authStore.setValue('state', Auth.AUTHENTICATING);

        const body = {
          userId,
          pwd: pwd$1,
        };

        const { sessionId, timeout } = await wrapFetch('/sessions', {
          method: 'POST',
          body: JSON.stringify(body),
        });

        authStore.setValues({
          state: Auth.AUTHENTICATED,
          sessionId,
          timeout,
        });

        return { sessionId, timeout };
      } catch (err) {
        authStore.setValue('state', Auth.CHALLENGE);
        throw err;
      }
    };

    // thanks https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string

    const enc = new TextEncoder();

    var hash = async (...s) => {
      const toEncode = s.join(':');
      const msgUint8 = enc.encode(toEncode);
      const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    };

    let email, pwd;
    authStore.subscribe((auth) => {
      email = auth.email;
      auth.pwd;
    });

    const createUser = async () => {
      const [emailHash, pwdHash] = await Promise.all([
        hash(email),
        hash(email, pwd),
      ]);

      const body = {
        userId: emailHash,
        email,
        pwd: pwdHash,
      };

      const user = await wrapFetch('/users', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      authStore.setValues({
        userId: user.userId,
        pwdHash: user.pwd,
      });

      return user;
    };

    var getFinancialModel = () => wrapFetch('/financial-model');

    var getUser = async () => {
      const { userId } = get_store_value(authStore);
      const path = `/user/${userId}`;
      return wrapFetch(path);
    };

    /* src/components/UserChallenge.svelte generated by Svelte v3.35.0 */
    const file$2 = "src/components/UserChallenge.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let label1;
    	let t6;
    	let input1;
    	let t7;
    	let div;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "User challenge";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Email:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Password:";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			div = element("div");
    			button = element("button");
    			button.textContent = "Submit";
    			add_location(h2, file$2, 13, 2, 213);
    			attr_dev(label0, "for", "email");
    			attr_dev(label0, "placeholder", "test@test.com");
    			add_location(label0, file$2, 14, 2, 239);
    			attr_dev(input0, "id", "email");
    			add_location(input0, file$2, 15, 2, 303);
    			attr_dev(label1, "for", "pwd");
    			add_location(label1, file$2, 16, 2, 347);
    			attr_dev(input1, "id", "pwd");
    			add_location(input1, file$2, 17, 2, 384);
    			add_location(button, file$2, 19, 4, 434);
    			add_location(div, file$2, 18, 2, 424);
    			add_location(main, file$2, 12, 0, 204);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, label0);
    			append_dev(main, t3);
    			append_dev(main, input0);
    			set_input_value(input0, /*email*/ ctx[0]);
    			append_dev(main, t4);
    			append_dev(main, label1);
    			append_dev(main, t6);
    			append_dev(main, input1);
    			set_input_value(input1, /*pwd*/ ctx[1]);
    			append_dev(main, t7);
    			append_dev(main, div);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*onClick*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
    				set_input_value(input0, /*email*/ ctx[0]);
    			}

    			if (dirty & /*pwd*/ 2 && input1.value !== /*pwd*/ ctx[1]) {
    				set_input_value(input1, /*pwd*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("UserChallenge", slots, []);
    	let email = "";
    	let pwd = "";

    	const onClick = () => {
    		authStore.setValue("email", email);
    		authStore.setValue("pwd", pwd);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserChallenge> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		email = this.value;
    		$$invalidate(0, email);
    	}

    	function input1_input_handler() {
    		pwd = this.value;
    		$$invalidate(1, pwd);
    	}

    	$$self.$capture_state = () => ({ authStore, email, pwd, onClick });

    	$$self.$inject_state = $$props => {
    		if ("email" in $$props) $$invalidate(0, email = $$props.email);
    		if ("pwd" in $$props) $$invalidate(1, pwd = $$props.pwd);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [email, pwd, onClick, input0_input_handler, input1_input_handler];
    }

    class UserChallenge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserChallenge",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/UserState.svelte generated by Svelte v3.35.0 */
    const file$1 = "src/components/UserState.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let table;
    	let tr0;
    	let tc0;
    	let t3;
    	let tc1;
    	let t4;
    	let t5;
    	let tr1;
    	let tc2;
    	let t7;
    	let tc3;
    	let t8;
    	let t9;
    	let tr2;
    	let tc4;
    	let t11;
    	let tc5;
    	let t12;
    	let t13;
    	let tr3;
    	let tc6;
    	let t15;
    	let tc7;
    	let t16;
    	let t17;
    	let tr4;
    	let tc8;
    	let t19;
    	let tc9;
    	let t20;
    	let t21;
    	let tr5;
    	let tc10;
    	let t23;
    	let tc11;
    	let t24;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "User state";
    			t1 = space();
    			table = element("table");
    			tr0 = element("tr");
    			tc0 = element("tc");
    			tc0.textContent = "email:";
    			t3 = space();
    			tc1 = element("tc");
    			t4 = text(/*email*/ ctx[0]);
    			t5 = space();
    			tr1 = element("tr");
    			tc2 = element("tc");
    			tc2.textContent = "id:";
    			t7 = space();
    			tc3 = element("tc");
    			t8 = text(/*userId*/ ctx[1]);
    			t9 = space();
    			tr2 = element("tr");
    			tc4 = element("tc");
    			tc4.textContent = "password:";
    			t11 = space();
    			tc5 = element("tc");
    			t12 = text(/*pwd*/ ctx[2]);
    			t13 = space();
    			tr3 = element("tr");
    			tc6 = element("tc");
    			tc6.textContent = "password hash:";
    			t15 = space();
    			tc7 = element("tc");
    			t16 = text(/*pwdHash*/ ctx[3]);
    			t17 = space();
    			tr4 = element("tr");
    			tc8 = element("tc");
    			tc8.textContent = "session:";
    			t19 = space();
    			tc9 = element("tc");
    			t20 = text(/*sessionId*/ ctx[4]);
    			t21 = space();
    			tr5 = element("tr");
    			tc10 = element("tc");
    			tc10.textContent = "state:";
    			t23 = space();
    			tc11 = element("tc");
    			t24 = text(/*state*/ ctx[5]);
    			add_location(h2, file$1, 12, 2, 267);
    			add_location(tc0, file$1, 15, 6, 312);
    			add_location(tc1, file$1, 16, 6, 334);
    			add_location(tr0, file$1, 14, 4, 301);
    			add_location(tc2, file$1, 19, 6, 376);
    			add_location(tc3, file$1, 20, 6, 395);
    			add_location(tr1, file$1, 18, 4, 365);
    			add_location(tc4, file$1, 23, 6, 438);
    			add_location(tc5, file$1, 24, 6, 463);
    			add_location(tr2, file$1, 22, 4, 427);
    			add_location(tc6, file$1, 27, 6, 503);
    			add_location(tc7, file$1, 28, 6, 533);
    			add_location(tr3, file$1, 26, 4, 492);
    			add_location(tc8, file$1, 31, 6, 577);
    			add_location(tc9, file$1, 32, 6, 601);
    			add_location(tr4, file$1, 30, 4, 566);
    			add_location(tc10, file$1, 35, 6, 647);
    			add_location(tc11, file$1, 36, 6, 669);
    			add_location(tr5, file$1, 34, 4, 636);
    			add_location(table, file$1, 13, 2, 289);
    			add_location(main, file$1, 11, 0, 258);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, table);
    			append_dev(table, tr0);
    			append_dev(tr0, tc0);
    			append_dev(tr0, t3);
    			append_dev(tr0, tc1);
    			append_dev(tc1, t4);
    			append_dev(table, t5);
    			append_dev(table, tr1);
    			append_dev(tr1, tc2);
    			append_dev(tr1, t7);
    			append_dev(tr1, tc3);
    			append_dev(tc3, t8);
    			append_dev(table, t9);
    			append_dev(table, tr2);
    			append_dev(tr2, tc4);
    			append_dev(tr2, t11);
    			append_dev(tr2, tc5);
    			append_dev(tc5, t12);
    			append_dev(table, t13);
    			append_dev(table, tr3);
    			append_dev(tr3, tc6);
    			append_dev(tr3, t15);
    			append_dev(tr3, tc7);
    			append_dev(tc7, t16);
    			append_dev(table, t17);
    			append_dev(table, tr4);
    			append_dev(tr4, tc8);
    			append_dev(tr4, t19);
    			append_dev(tr4, tc9);
    			append_dev(tc9, t20);
    			append_dev(table, t21);
    			append_dev(table, tr5);
    			append_dev(tr5, tc10);
    			append_dev(tr5, t23);
    			append_dev(tr5, tc11);
    			append_dev(tc11, t24);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1) set_data_dev(t4, /*email*/ ctx[0]);
    			if (dirty & /*userId*/ 2) set_data_dev(t8, /*userId*/ ctx[1]);
    			if (dirty & /*pwd*/ 4) set_data_dev(t12, /*pwd*/ ctx[2]);
    			if (dirty & /*pwdHash*/ 8) set_data_dev(t16, /*pwdHash*/ ctx[3]);
    			if (dirty & /*sessionId*/ 16) set_data_dev(t20, /*sessionId*/ ctx[4]);
    			if (dirty & /*state*/ 32) set_data_dev(t24, /*state*/ ctx[5]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let email;
    	let userId;
    	let pwd;
    	let pwdHash;
    	let sessionId;
    	let state;
    	let $authStore;
    	validate_store(authStore, "authStore");
    	component_subscribe($$self, authStore, $$value => $$invalidate(6, $authStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("UserState", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserState> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		authStore,
    		email,
    		$authStore,
    		userId,
    		pwd,
    		pwdHash,
    		sessionId,
    		state
    	});

    	$$self.$inject_state = $$props => {
    		if ("email" in $$props) $$invalidate(0, email = $$props.email);
    		if ("userId" in $$props) $$invalidate(1, userId = $$props.userId);
    		if ("pwd" in $$props) $$invalidate(2, pwd = $$props.pwd);
    		if ("pwdHash" in $$props) $$invalidate(3, pwdHash = $$props.pwdHash);
    		if ("sessionId" in $$props) $$invalidate(4, sessionId = $$props.sessionId);
    		if ("state" in $$props) $$invalidate(5, state = $$props.state);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(0, email = $authStore.email);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(1, userId = $authStore.userId);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(2, pwd = $authStore.pwd);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(3, pwdHash = $authStore.pwdHash);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(4, sessionId = $authStore.sessionId);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 64) {
    			$$invalidate(5, state = $authStore.state);
    		}
    	};

    	return [email, userId, pwd, pwdHash, sessionId, state, $authStore];
    }

    class UserState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserState",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/components/App.svelte generated by Svelte v3.35.0 */
    const file = "src/components/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let userstate;
    	let t2;
    	let userchallenge;
    	let t3;
    	let apicaller0;
    	let t4;
    	let apicaller1;
    	let t5;
    	let apicaller2;
    	let t6;
    	let apicaller3;
    	let current;
    	userstate = new UserState({ $$inline: true });
    	userchallenge = new UserChallenge({ $$inline: true });

    	apicaller0 = new APICaller({
    			props: {
    				name: "Create user",
    				description: "POST /users",
    				fn: createUser
    			},
    			$$inline: true
    		});

    	apicaller1 = new APICaller({
    			props: {
    				name: "Create session",
    				description: "POST /sessions",
    				fn: createSession
    			},
    			$$inline: true
    		});

    	apicaller2 = new APICaller({
    			props: {
    				name: "Fetch user",
    				description: "GET /user",
    				fn: getUser
    			},
    			$$inline: true
    		});

    	apicaller3 = new APICaller({
    			props: {
    				name: "Fetch model",
    				description: "GET /financial-model",
    				fn: getFinancialModel
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Auth Model Spike";
    			t1 = space();
    			create_component(userstate.$$.fragment);
    			t2 = space();
    			create_component(userchallenge.$$.fragment);
    			t3 = space();
    			create_component(apicaller0.$$.fragment);
    			t4 = space();
    			create_component(apicaller1.$$.fragment);
    			t5 = space();
    			create_component(apicaller2.$$.fragment);
    			t6 = space();
    			create_component(apicaller3.$$.fragment);
    			add_location(h1, file, 13, 2, 278);
    			add_location(main, file, 12, 0, 269);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(userstate, main, null);
    			append_dev(main, t2);
    			mount_component(userchallenge, main, null);
    			append_dev(main, t3);
    			mount_component(apicaller0, main, null);
    			append_dev(main, t4);
    			mount_component(apicaller1, main, null);
    			append_dev(main, t5);
    			mount_component(apicaller2, main, null);
    			append_dev(main, t6);
    			mount_component(apicaller3, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(userstate.$$.fragment, local);
    			transition_in(userchallenge.$$.fragment, local);
    			transition_in(apicaller0.$$.fragment, local);
    			transition_in(apicaller1.$$.fragment, local);
    			transition_in(apicaller2.$$.fragment, local);
    			transition_in(apicaller3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(userstate.$$.fragment, local);
    			transition_out(userchallenge.$$.fragment, local);
    			transition_out(apicaller0.$$.fragment, local);
    			transition_out(apicaller1.$$.fragment, local);
    			transition_out(apicaller2.$$.fragment, local);
    			transition_out(apicaller3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(userstate);
    			destroy_component(userchallenge);
    			destroy_component(apicaller0);
    			destroy_component(apicaller1);
    			destroy_component(apicaller2);
    			destroy_component(apicaller3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		APICaller,
    		createSession,
    		createUser,
    		getFinancialModel,
    		getUser,
    		UserChallenge,
    		UserState
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
