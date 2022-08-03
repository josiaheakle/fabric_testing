import { fabric } from "fabric";
import { Comp } from "../classes/App";
import {
	createCircle,
	createImg,
	createSquare,
	createText,
	createTriangle,
} from "../modules/fabric-util/create-shape";

export class Canvas extends Comp {
	constructor(app) {
		super("canvas", app);
		this.initFabric();
	}

	/**
	 * Initiates fabric and sets dimensions
	 */
	initFabric() {
		this.canvas = new fabric.Canvas("canvas");
		this.canvas.setHeight(400);
		this.canvas.setWidth(600);
		this.canvas.renderAll();
		this.canvas.on("mouse:down", this.onElemClick);
	}

	/**
	 * Handles click event for fabric objects
	 * @param {Event} e Fabric event
	 */
	onElemClick = (e) => {
		if (e.target) {
			e.target.moveTo(10);
			this.app.changeView("side-menu/object-inspector");
			this.app.comps["side-menu"].onElemClick(e.target);
		}
	};

	/**
	 * Adds element to canvas
	 * @param {string} elemType
	 */
	addElem(elemType, data) {
		return {
			square: () => {
				const square = createSquare();
				this.canvas.add(square);
			},
			circle: () => {
				const circle = createCircle();
				this.canvas.add(circle);
			},
			triangle: () => {
				const triangle = createTriangle();
				this.canvas.add(triangle);
			},
			text: () => {
				const text = createText(data);
				this.canvas.add(text);
			},
			img: () => {
				const img = createImg(data);
				this.canvas.add(img);
			},
		}[elemType]();
	}
}
