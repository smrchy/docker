// Config
import config from "./config";

// Request
import * as request from "request";

// Sharp
import * as sharp from "sharp";

export default class Mw {

	constructor () {}

	public checkData (req, res, next) {
		// Make sure there is a command separated by `=` is supplied
		// e.g. /image/https%3A%2F%2Fwww.webmart.de%2Fweb%2Fimg%2Fsuche_ss2.png=s320
		let parts: Array<string> = req.params[0].split("=");
		// Just a simple URL without a resize operation.
		if (parts.length === 1) {
			res.locals.image_url = parts[0];
			next();
			return;
		}
		else if (parts.length !== 2) {
			next({message: "Invalid URL format. Please supply exactly one resize command.", status: 403});
			return;
		}

		let command: string = parts[1];
		res.locals.image_url = parts[0];

		// Check if command is way too long. Must be 3-7 chars (e.g. s10 - s9999-c)
		if (command.length < 3 || command.length > 7) {
			next({message: "Invalid resize command. Invalid length.", status: 403});
			return;
		}

		// Check command - must start with an `s`
		if (command.slice(0, 1) !== "s") {
			next({message: "Invalid resize command", status: 403});
			return;
		}

		// Check if it is a crop operation
		if (command.slice(-2) === "-c") {
			res.locals.image_size = parseInt(command.slice(1, -2), 10);
			res.locals.image_iscrop = true;
			// Make sure image size is a positive integer that is in the allowed crop sizes array.
			if (!config.IMG_SERVING_CROP_SIZES.includes(res.locals.image_size)) {
				next({message: "Invalid crop size.", status: 403});
				return;
			}

		}
		// Normal resize operation
		else {
			res.locals.image_size = parseInt(command.slice(1), 10);
			if (!config.IMG_SERVING_SIZES.includes(res.locals.image_size)) {
				next({message: "Invalid crop size.", status: 403});
				return;
			}
		}

		next();
	}

	public loadImage (req, res, next) {
		let image = decodeURIComponent(res.locals.image_url);

		if (image.slice(0, 4) !== "http") {
			image = "http://" + image;
		}
		console.log("image", image);
		request({
			url: image,
			method: "GET",
			followRedirect: true,
			encoding: null
		}, (err, resp, body) => {
			if (err) {
				next(err);
				return;
			}
			if (resp.statusCode !== 200) {
				next({message: "Request failed.", status: resp.statusCode});
			}
			res.locals.image_headers = resp.headers;
			res.locals.image_body = body;
			next();
		});
	}

	public processImage (req, res, next) {
		const _finish = (data) => {
			res.set({"Content-Type": res.locals.image_headers["content-type"]})
			.send(data);
			next();
		};
		if (!res.locals.image_size) {
			_finish(res.locals.image_body);
		}
		else if (res.locals.image_iscrop) {
			sharp(res.locals.image_body)
			.resize(res.locals.image_size, res.locals.image_size)
			.toBuffer()
			.then(_finish)
			.catch(next);
		}
		else {
			sharp(res.locals.image_body)
			.resize(res.locals.image_size)
			.toBuffer()
			.then(_finish)
			.catch(next);
		}
	}
}
