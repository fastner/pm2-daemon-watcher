"use strict";

/* globals process, module */

var Watcher = module.exports = {};

Watcher.supervise = function(timeout, reconnectionAttemps) {
	reconnectionAttemps = reconnectionAttemps || 3;
	timeout = timeout || 5;

	var ipm2 = require('pm2-interface')();

	console.log("Starting up pm2 daemon watcher");

	var timeoutId = setTimeout(function() {
		console.log("Could not connect to pm2");
		process.exit(3);
	}, timeout * 1000);

	ipm2.on('ready', function() {
		console.log('Connected to pm2. Pause process until abortion of connection...');
		clearTimeout(timeoutId);

		ipm2.on("close", function() {
			console.log("Connection closed");
			process.exit(1);
		});

		var counter = 0;
		ipm2.on("reconnect attempt", function() {
			console.log("No connection anymore, so try reconnection");
			counter++;

			if (counter >= reconnectionAttemps) {
				console.log("Connection finally lost");
				process.exit(2);
			}
		});
	});
};