import { Comp } from "../classes/App";

export class SideMenu extends Comp {
	constructor(app) {
		super("side-menu", app);
		this.init();
	}

	/**
	 * Initiates event listeners, child elements, and views
	 */
	init() {
		this.initEventListeners([
			{
				id: "new-square-btn",
				type: "click",
				action: this.handleBtnClick,
			},
			{
				id: "new-circle-btn",
				type: "click",
				action: this.handleBtnClick,
			},
			{
				id: "new-triangle-btn",
				type: "click",
				action: this.handleBtnClick,
			},
			{
				id: "new-text-input",
				type: "change",
				action: this.handleInputChange,
			},
			{
				id: "new-text-submit",
				type: "click",
				action: this.handleBtnClick,
			},
			{
				id: "new-img-input",
				type: "change",
				action: this.handleImgChange,
			},
			{
				id: "new-img-submit",
				type: "click",
				action: this.handleBtnClick,
			},
		]);

		this.$menus = {
			shape: document.getElementById("new-shape-opts"),
			text: document.getElementById("new-text-opts"),
			objInspect: document.getElementById("obj-inspect"),
		};

		this.inputValues = {
			"new-text-input": undefined,
			"new-img-input": undefined,
		};

		this.initViews([
			{
				id: "new-shape",
				activate: () => {
					this.$menus.shape.classList.remove("hidden");
				},
				deactivate: () => {
					this.$menus.shape.classList.add("hidden");
				},
			},
			{
				id: "new-text",
				activate: () => {
					this.$menus.text.classList.remove("hidden");
				},
				deactivate: () => {
					this.$menus.text.classList.add("hidden");
				},
			},
			{
				id: "object-inspector",
				activate: () => {
					this.$menus.objInspect.classList.remove("hidden");
				},
				deactivate: () => {
					this.$menus.objInspect.classList.add("hidden");
				},
			},
		]);
	}

	/**
	 * Handles when fabric object gets clicked within canvas
	 * ---
	 * @param {FabricObj} data
	 */
	onElemClick(data) {
		this.$menus.objInspect.querySelector("pre").textContent = JSON.stringify(data)
			.split(",")
			.join(",\n");
	}

	/**
	 * Handles button click for any element
	 * @param {Event} e
	 */
	handleBtnClick = (e) => {
		return {
			"new-square-btn": () => {
				this.app.comps["canvas"].addElem("square");
			},
			"new-circle-btn": () => {
				this.app.comps["canvas"].addElem("circle");
			},
			"new-triangle-btn": () => {
				this.app.comps["canvas"].addElem("triangle");
			},
			"new-text-submit": () => {
				this.app.comps["canvas"].addElem("text", {
					text: this.inputValues["new-text-input"],
				});
			},
			"new-img-submit": () => {
				this.app.comps["canvas"].addElem("img", {
					src: this.inputValues["new-img-input"],
				});
			},
		}[e.target.id]();
	};

	/**
	 * Handles input change for any element
	 * @param {Event} e
	 */
	handleInputChange = (e) => {
		this.inputValues[e.target.id] = e.target.value;
	};

	/**
	 * Handle img input change for any element
	 */
	handleImgChange = (e) => {
		const curFiles = e.target.files;
		this.inputValues[e.target.id] = URL.createObjectURL(curFiles[0]);
	};
}
