process.env.NODE_ENV = "production";
const config = require("./webpack.config.js"),
	compiler = require("webpack")(config);

compiler.run((err) => {
	if(err) {
		console.error(err.stack || err);
		if(err.details) console.error(err.details);
		if(!options.watch) {
			process.on("exit", function() {
				process.exit(1);
			});
		}
	}
});