import { Comp } from "../classes/App";

export class Header extends Comp {
	constructor(app) {
		super("header", app);
		this.initEventListeners([
			{
				id: "new-shape-btn",
				type: "click",
				action: this.handleBtnClick,
			},
			{
				id: "new-text-btn",
				type: "click",
				action: this.handleBtnClick,
			},
		]);
	}

	/**
	 * Handle button click for all internal elements,
	 * parse ID and run action for specified id
	 * @param {Event} e
	 */
	handleBtnClick = (e) => {
		const opts = {
			"new-shape-btn": () => {
				console.log("new shape");
				this.app.changeView("side-menu/new-shape");
			},
			"new-text-btn": () => {
				console.log("new text");
				this.app.changeView("side-menu/new-text");
			},
		};
		opts[e.target.id]();
	};
}
