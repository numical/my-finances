
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
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
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
            mount_component(component, options.target, options.anchor);
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.1' }, detail)));
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

    /* src/components/APICaller.svelte generated by Svelte v3.32.1 */

    const file = "src/components/APICaller.svelte";

    function create_fragment(ctx) {
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
    			add_location(h2, file, 13, 2, 188);
    			add_location(p, file, 14, 2, 206);
    			add_location(button, file, 15, 2, 229);
    			add_location(div, file, 16, 2, 274);
    			add_location(main, file, 12, 0, 179);
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
    				dispose = listen_dev(button, "click", /*onClick*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
    			if (dirty & /*description*/ 2) set_data_dev(t2, /*description*/ ctx[1]);
    			if (dirty & /*result*/ 4) set_data_dev(t6, /*result*/ ctx[2]);
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
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let result;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("APICaller", slots, []);
    	let { name } = $$props;
    	let { description } = $$props;
    	let { fn } = $$props;

    	const onClick = async () => {
    		$$invalidate(2, result = await fn());
    	};

    	const writable_props = ["name", "description", "fn"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<APICaller> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("fn" in $$props) $$invalidate(4, fn = $$props.fn);
    	};

    	$$self.$capture_state = () => ({ name, description, fn, onClick, result });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("fn" in $$props) $$invalidate(4, fn = $$props.fn);
    		if ("result" in $$props) $$invalidate(2, result = $$props.result);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	 $$invalidate(2, result = "not yet clicked");
    	return [name, description, result, onClick, fn];
    }

    class APICaller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0, description: 1, fn: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "APICaller",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<APICaller> was created without expected prop 'name'");
    		}

    		if (/*description*/ ctx[1] === undefined && !("description" in props)) {
    			console.warn("<APICaller> was created without expected prop 'description'");
    		}

    		if (/*fn*/ ctx[4] === undefined && !("fn" in props)) {
    			console.warn("<APICaller> was created without expected prop 'fn'");
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

    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var wrapFetch = (path, options = {}) => async () => {
      try {
        const allOptions = { ...defaultOptions, ...options };
        const response = await fetch(path, allOptions);
        if (response.ok) {
          const json = await response.json();
          return `200: ${JSON.stringify(json)}`;
        } else {
          return `${response.status}: ${response.statusText}`;
        }
      } catch (err) {
        return `500: ${err.name}: ${err.message}`;
      }
    };

    var getUser = wrapFetch('/user');

    var getFinancialModel = wrapFetch('/financial-model');

    var createSesson = wrapFetch('/session', {
      method: 'POST',
    });

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

    const initial = {
      userName: "",
      currentPassword: {
        value: "",
        hash: ""
      },
      state: {
        description: 'not logged in'
      }
    };

    const authStore = writable(initial);

    /* src/components/UserChallenge.svelte generated by Svelte v3.32.1 */
    const file$1 = "src/components/UserChallenge.svelte";

    function create_fragment$1(ctx) {
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
    			label0.textContent = "Name:";
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
    			add_location(h2, file$1, 7, 2, 120);
    			attr_dev(label0, "for", "user-name");
    			add_location(label0, file$1, 8, 2, 146);
    			attr_dev(input0, "id", "user-name");
    			add_location(input0, file$1, 9, 2, 185);
    			attr_dev(label1, "for", "user-pwd");
    			add_location(label1, file$1, 10, 2, 210);
    			attr_dev(input1, "id", "user-pwd");
    			add_location(input1, file$1, 11, 2, 252);
    			add_location(button, file$1, 13, 2, 284);
    			add_location(div, file$1, 12, 2, 276);
    			add_location(main, file$1, 6, 0, 111);
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
    			append_dev(main, t4);
    			append_dev(main, label1);
    			append_dev(main, t6);
    			append_dev(main, input1);
    			append_dev(main, t7);
    			append_dev(main, div);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*onClick*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("UserChallenge", slots, []);
    	const onClick = () => alert("Submitted");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserChallenge> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ authStore, onClick });
    	return [onClick];
    }

    class UserChallenge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserChallenge",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/components/UserState.svelte generated by Svelte v3.32.1 */
    const file$2 = "src/components/UserState.svelte";

    function create_fragment$2(ctx) {
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

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "User state";
    			t1 = space();
    			table = element("table");
    			tr0 = element("tr");
    			tc0 = element("tc");
    			tc0.textContent = "name:";
    			t3 = space();
    			tc1 = element("tc");
    			t4 = text(/*userName*/ ctx[0]);
    			t5 = space();
    			tr1 = element("tr");
    			tc2 = element("tc");
    			tc2.textContent = "password:";
    			t7 = space();
    			tc3 = element("tc");
    			t8 = text(/*password*/ ctx[1]);
    			t9 = space();
    			tr2 = element("tr");
    			tc4 = element("tc");
    			tc4.textContent = "password hash:";
    			t11 = space();
    			tc5 = element("tc");
    			t12 = text(/*passwordHash*/ ctx[2]);
    			t13 = space();
    			tr3 = element("tr");
    			tc6 = element("tc");
    			tc6.textContent = "status:";
    			t15 = space();
    			tc7 = element("tc");
    			t16 = text(/*status*/ ctx[3]);
    			add_location(h2, file$2, 11, 2, 261);
    			add_location(tc0, file$2, 16, 6, 314);
    			add_location(tc1, file$2, 17, 6, 335);
    			add_location(tr0, file$2, 15, 4, 303);
    			add_location(tc2, file$2, 20, 6, 380);
    			add_location(tc3, file$2, 21, 6, 405);
    			add_location(tr1, file$2, 19, 4, 369);
    			add_location(tc4, file$2, 24, 6, 450);
    			add_location(tc5, file$2, 25, 6, 480);
    			add_location(tr2, file$2, 23, 4, 439);
    			add_location(tc6, file$2, 27, 6, 519);
    			add_location(tc7, file$2, 28, 6, 542);
    			add_location(tr3, file$2, 26, 4, 508);
    			add_location(table, file$2, 14, 2, 291);
    			add_location(main, file$2, 10, 0, 252);
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
    			append_dev(tr2, t13);
    			append_dev(table, tr3);
    			append_dev(tr3, tc6);
    			append_dev(tr3, t15);
    			append_dev(tr3, tc7);
    			append_dev(tc7, t16);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*userName*/ 1) set_data_dev(t4, /*userName*/ ctx[0]);
    			if (dirty & /*password*/ 2) set_data_dev(t8, /*password*/ ctx[1]);
    			if (dirty & /*passwordHash*/ 4) set_data_dev(t12, /*passwordHash*/ ctx[2]);
    			if (dirty & /*status*/ 8) set_data_dev(t16, /*status*/ ctx[3]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
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
    	let userName;
    	let password;
    	let passwordHash;
    	let status;
    	let $authStore;
    	validate_store(authStore, "authStore");
    	component_subscribe($$self, authStore, $$value => $$invalidate(4, $authStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("UserState", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserState> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		authStore,
    		userName,
    		$authStore,
    		password,
    		passwordHash,
    		status
    	});

    	$$self.$inject_state = $$props => {
    		if ("userName" in $$props) $$invalidate(0, userName = $$props.userName);
    		if ("password" in $$props) $$invalidate(1, password = $$props.password);
    		if ("passwordHash" in $$props) $$invalidate(2, passwordHash = $$props.passwordHash);
    		if ("status" in $$props) $$invalidate(3, status = $$props.status);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$authStore*/ 16) {
    			 $$invalidate(0, userName = $authStore.userName);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 16) {
    			 $$invalidate(1, password = $authStore.currentPassword.value);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 16) {
    			 $$invalidate(2, passwordHash = $authStore.currentPassword.hash);
    		}

    		if ($$self.$$.dirty & /*$authStore*/ 16) {
    			 $$invalidate(3, status = $authStore.state.description);
    		}
    	};

    	return [userName, password, passwordHash, status, $authStore];
    }

    class UserState extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserState",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/App.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/components/App.svelte";

    function create_fragment$3(ctx) {
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
    	let current;
    	userstate = new UserState({ $$inline: true });
    	userchallenge = new UserChallenge({ $$inline: true });

    	apicaller0 = new APICaller({
    			props: {
    				name: "Create session",
    				description: "POST /session",
    				fn: createSesson
    			},
    			$$inline: true
    		});

    	apicaller1 = new APICaller({
    			props: {
    				name: "Fetch user",
    				description: "GET /user",
    				fn: getUser
    			},
    			$$inline: true
    		});

    	apicaller2 = new APICaller({
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
    			add_location(h1, file$3, 10, 2, 331);
    			add_location(main, file$3, 9, 0, 322);
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
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(userstate.$$.fragment, local);
    			transition_out(userchallenge.$$.fragment, local);
    			transition_out(apicaller0.$$.fragment, local);
    			transition_out(apicaller1.$$.fragment, local);
    			transition_out(apicaller2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(userstate);
    			destroy_component(userchallenge);
    			destroy_component(apicaller0);
    			destroy_component(apicaller1);
    			destroy_component(apicaller2);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		APICaller,
    		getUser,
    		getFinancialModel,
    		createSesson,
    		UserChallenge,
    		UserState
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
