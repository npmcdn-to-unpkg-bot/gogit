#! /usr/bin/env node
const lessc = "node_modules/less/bin/lessc";

var shell = require("shelljs"),
	fs = require("fs"),
	path = require("path"),
	process = require("process"),
	colors = require('colors/safe');
var utils = require('./utils');

var config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

utils.run_commands(
	config.files, config.root_dir, config.out_dir,
	function(name) {
		return path.basename(name, '.less') + '.css'
	},
	function(name, in_path, out_path) {
		console.log(colors.white("LESS") + " " +
					colors.green("Compile") + " " +name);
		shell.exec(lessc + " " + in_path + " " + out_path);
	},
	function(name) {
		console.log(colors.white("LESS") + " " +
					colors.yellow("Skip") + " " + name);
	}
);
