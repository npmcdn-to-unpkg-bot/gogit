#! /usr/bin/env node
const protoc = "protoc";
const proto2js = "node_modules/protobufjs/bin/pbjs";
const proto2ts = "node_modules/proto2typescript/bin/proto2typescript-bin.js";

var temp = require('temp'),
	shell = require("shelljs"),
	fs = require("fs"),
	path = require("path"),
	process = require("process"),
	colors = require('colors/safe');
var utils = require('./utils');

var config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

utils.run_commands(
	config.files, config.root_dir, config.go_out_dir,
	function(name) {
		return path.basename(name, '.proto') + '.pb.go'
	},
	function(name, in_path, out_path) {
		console.log(colors.white("PROTC") + " " +
					colors.green("Compile") + " " +name);
		shell.exec(protoc +
				   " -I=" + config.root_dir +
				   " --go_out=" + config.go_out_dir +
				   " " + in_path);
	},
	function(name) {
		console.log(colors.white("PROTOC") + " " +
					colors.yellow("Skip") + " " + name);
	}
);

temp.track();

temp.mkdir('pb2ts', function(err, temp_dir) {
	utils.run_commands(
		config.files, config.root_dir, config.ts_out_dir,
		function(name) {
			return path.basename(name, '.proto') + '.d.ts'
		},
		function(name, in_path, out_path) {
			console.log(colors.white("PB2TS") + " " +
						colors.green("Compile") + " " + name);
			const temp_path = path.join(temp_dir, name + ".json");
			shell.exec(proto2js + " " + in_path + " > " + temp_path,
					   {silent: true});
			shell.exec(proto2ts + " -f " + temp_path + " > " + out_path,
					   {silent: true});
		},
		function(name) {
			console.log(colors.white("PB2TS") + " " +
						colors.yellow("Skip") + " " + name);
		}
	);
});
