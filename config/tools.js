const extend = require("extend"),
	path = require("path"),
	variables = require("./var");

module.exports = {
	extendConfig: (extendObj) =>
		(baseConf) =>
			extend(true, baseConf || {}, extendObj),


	getPath(...chunks) {
		return path.join(variables.get("baseDir"), ...chunks);
	}
};