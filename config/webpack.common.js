const variables = require("./var"),
	tools = require("./tools");

module.exports = tools.extendConfig({
	entry: variables.get("entryPoints"),
	output: {
		path: tools.getPath("/dist")
	},

	resolve: {
		extensions: [".ts", ".js", ".json"]
	},

	module: {
		loaders: [
			{ test: /\.json$/, loader: "json" },
			{ test: /\.ts$/, loader: "ts" }
		]
	}
});