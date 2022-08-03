import { App } from "./classes/App";
import { Canvas } from "./editor/canvas";
import { Header } from "./editor/header";
import { SideMenu } from "./editor/side-menu";

const app = new App("app");
app.addComp("header", new Header(app));
app.addComp("side-menu", new SideMenu(app));
app.addComp("canvas", new Canvas(app));
