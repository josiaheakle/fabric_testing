class App {
	constructor(id) {
		try {
			this.$root = document.getElementById(id);
		} catch {
			throw `Cannot find root with id of "${id}".`;
		}
		this.views = {};
		this.comps = {};
	}

	/**
	 * Adds a comp (class instance) to this.comps
	 * @param {string} id identification string
	 * @param {Comp} comp
	 */
	addComp(id, comp) {
		this.comps[id] = comp;
	}

	/**
	 * Adds a "view" or action for when the app changes views
	 * ---
	 * @param {string} id ID for view
	 * @param {function} action action for when view is called
	 * @param {funciton} deactivate action for when any other view is called
	 */
	addView(id, activate, deactivate) {
		this.views[id] = {
			activate,
			deactivate,
			_isActive: false,
		};
		this.views[id].deactivate();
	}

	/**
	 * Changes view to specified ID, calling deactivate on all active before activation.
	 * ---
	 * @param {string} id id for the view being activated
	 */
	changeView(viewId) {
		console.log(this.views);
		// Check if subview
		if (viewId.includes("/")) {
			var [viewComp, viewName] = viewId.split("/");
		} else {
			var viewComp = undefined;
			var viewName = viewId;
		}
		let activateFunc;
		for (const [id, view] of Object.entries(this.views)) {
			console.log({ viewComp, viewName, id, view });
			if (viewComp && !id.includes(viewComp)) break;
			if (id === viewId) {
				activateFunc = view.activate;
				view._isActive = true;
			} else if (view._isActive) {
				view.deactivate();
			}
		}
		activateFunc();
	}
}

class Comp {
	constructor(id, app) {
		this.id = id;
		this.app = app;
		try {
			this.$elem = document.getElementById(id);
		} catch {
			throw `No element with an ID of "${id}"`;
		}
	}

	/**
	 * Applies event listeners to elements. Will be removed on deactivate.
	 *
	 * @param {Array<{
	 * 	id: string,
	 * 	type: string,
	 *  action: function
	 * }>} listeners
	 */
	initEventListeners(listeners) {
		this.listeners = listeners;
		for (const lsnr of listeners) {
			const { id, type, action } = lsnr;
			try {
				this.$elem.querySelector(`#${id}`).addEventListener(type, action);
			} catch (err) {
				console.warn(err);
				throw `No element with ID "${lsnr.id}" within ${this.id}. Cannot apply event listeners. Listener type ${lsnr.type}.`;
			}
		}
	}

	/**
	 * Initiates all component views, adding as thisID/id to app
	 * ---
	 * @param {Array<{
	 * 	id: string,
	 * 	activate: Function,
	 * 	deactivate: Function
	 * }>} views
	 */
	initViews(views) {
		for (const view of views) {
			this.app.addView(`${this.id}/${view.id}`, view.activate, view.deactivate);
		}
		console.log(this.app.views);
	}

	/**
	 * Adds class hidden to main elem.
	 * If you hope for different logic, overload in child
	 */
	deactivate() {
		this.$elem.classList.add("hidden");
	}

	/**
	 * Removes class hidden to main elem.
	 * If you hope for differnet logic, overload in child
	 */
	activate() {
		this.$elem.classList.remove("hidden");
	}

	/**
	 * Removes all event listeners applied by initEventListeners
	 */
	_removeEventListeners() {
		for (const lsnr of this.listeners) {
			const { id, type, action } = lsnr;
			this.$elem.getElementById(id).removeEventListener(type, action);
		}
	}
}

export { App, Comp };
