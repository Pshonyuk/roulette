const variables = require("./config/var");
variables.set("baseDir", __dirname);
variables.set("isProd", process.env.NODE_ENV === "production");
variables.set("entryPoint", "Game");
variables.set("outputFileName", "WheelFortune");

const webpack = require("webpack"),
	additionConfig = require(`./config/webpack.${variables.get("isProd") ? "prod" : "dev"}`),
	config = additionConfig(require("./config/webpack.common")());

module.exports = config;