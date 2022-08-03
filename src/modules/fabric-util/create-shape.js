import { fabric } from "fabric";

const createSquare = () => {
	return new fabric.Rect({
		left: 0,
		top: 0,
		fill: "red",
		borderColor: "black",
		width: 100,
		height: 100,
	});
};

const createCircle = () => {
	return new fabric.Circle({
		left: 0,
		top: 0,
		fill: "red",
		radius: 50,
	});
};

const createTriangle = () => {
	return new fabric.Triangle({
		left: 0,
		top: 0,
		fill: "red",
	});
};

const createText = (data) => {
	return new fabric.Text(data.text, {
		left: 0,
		top: 0,
		fill: "black",
	});
};

const createImg = (data) => {
	const imgElem = document.createElement("img");
	imgElem.src = data.src;
	return new fabric.Image(imgElem, {
		left: 0,
		top: 0,
	});
};

export { createSquare, createCircle, createTriangle, createText, createImg };
