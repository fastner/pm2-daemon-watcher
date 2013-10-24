var ipm2 = require('pm2-interface')();

ipm2.on('ready', function() {
	console.log('Connected to pm2. Waiting for abortion of connection...');

	ipm2.on("close", function() {
		console.log("Connection closed");
		process.exit(1);
	});

	var counter = 0;
	ipm2.on("reconnect attempt", function() {
		console.log("No connection anymore, so try reconnection");
		counter++;

		if (counter > 3) {
			console.log("Connection finally lost");
			process.exit(2);
		}
	});
});