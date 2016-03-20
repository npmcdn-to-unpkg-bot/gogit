var fs = require("fs"),
	path = require("path"),
	_ = require("underscore");

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

var run_commands =
	function(files, in_dir, out_dir, out_name, process, skip) {
		_.each(files, function(element, index, list) {
			const rel_path = path.dirname(element);
			const input_path = path.join(in_dir, element);

			const res_dir = path.join(out_dir, rel_path);
			const out_path = path.join(res_dir, out_name(element));
			fs.stat(input_path, function(err, input_stat) {
				fs.stat(out_path, function(err, output_stat) {
					if (err != null || input_stat.mtime > output_stat.mtime) {
						if (rel_path) {
							mkdirSync(res_dir);
						}
						process(element, input_path, out_path);
					}
					else {
						skip(element);
					}
				});
			});
		});
	};

module.exports.run_commands = run_commands;
