const config = {
	app: {
		port: 3000
	},
	IMG_SERVING_CROP_SIZES: process.env.IMG_SERVING_CROP_SIZES || [32, 48, 64, 72, 80, 104, 136, 144, 150, 160, 200, 256],
	IMG_SERVING_SIZES: process.env.IMG_SERVING_SIZES || [32, 48, 64, 72, 80, 90, 94, 104, 110, 120, 128, 144, 150, 160, 200, 220, 256, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600]
};

export default config;