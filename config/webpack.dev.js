const variables = require("./var");

module.exports = require("./tools").extendConfig({
	output: {
		filename: `${ variables.get("outputFileName") }.js`
	},

	devtool: "source-map",
	watch: true
});