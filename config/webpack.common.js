const variables = require("./var"),
	tools = require("./tools");

module.exports = tools.extendConfig({
	entry:  `./src/${ variables.get("entryPoint") }`,
	output: {
		path: tools.getPath("/dist")
	},

	resolve: {
		extensions: [".ts", ".js"]
	},

	module: {
		loaders: [
			{ test: /\.ts$/, loader: "ts" }
		]
	}
});