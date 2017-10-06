// Config
import config from "./config";

// Express stuff
import * as morgan from "morgan";
import * as express from "express";

// Initialize Express
const app = express();
app.use(morgan("dev"));
app.enable("trust proxy");
app.disable("x-powered-by");
app.listen(config.app.port);
app.use("/apidoc", express.static("apidoc"));

// Middleware
import Mw from "./mw";
const mw = new Mw();

app.get("/image/*", mw.checkData, mw.loadImage, mw.processImage, (req, res, next) => {
	next();
});

app.use( (req, res, next) => {
	next();
	return;
});

// Generic error handle
app.use( (err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		message: err.message
	});
});
