import { App } from "./app/app";
import { StartButton } from "./entities/start_button";

let app = new App()

let startButton = new StartButton(app)
startButton.addToEngine()