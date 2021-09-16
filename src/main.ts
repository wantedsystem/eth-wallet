import Aurelia, { RouterConfiguration } from "aurelia";
import "bootstrap/dist/css/bootstrap.css";

import { App } from "./app";

Aurelia.register(RouterConfiguration).app(App).start();
