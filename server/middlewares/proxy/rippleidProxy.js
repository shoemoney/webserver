var request = require('request');
var Remote = require('ripple-lib').Remote;

function RippleidProxy(params) {
	this.app = params.app;
	this.rippleidProxyHost = params.rippleidProxyHost;
	this.remoteServer = params.rippleidRemoteServer;
};

RippleidProxy.prototype.init = function(callback) {
	var self = this;
	this.app.all('/ripple/id/*', function(req, res) {
		// console.log('api proxy : ' + self.apiProxyHost + req.url);
		
		var options = {
			method: req.method,
			url: self.rippleidProxyHost + req.query.id,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},

		};
		var callback = function(error, response, body) {
			var body = JSON.parse(body);
			var resolution;
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} else if(body.exists) {

				// resolution = {
				// 	name: body.username,
				// 	address: body.address
				// };
			}
		
			res.send(response.statusCode, body);
		};
		request(options, callback);
	});
	this.app.all('/ripple/account_info/*', function(req, res) {

		var remote = new Remote({
			servers: [ self.remoteServer ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
		});
		var parameters = { account: req.query.id };
		remote.request("account_info",parameters, function(err, acc) {
			// console.log("acc",acc);
			// var acc = JSON.parse(acc, null, 3);
			res.send(acc);
		});

	
	});
	this.app.all('/ripple/account_lines/*', function(req, res) {

		var remote = new Remote({
			servers: [ self.remoteServer ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
		});
		var parameters = { account: req.query.id };
		remote.request("account_lines",parameters, function(err, acc) {
			// console.log("acc",acc);
			// var acc = JSON.parse(acc, null, 3);
			res.send(acc);
		});

	
	});

	if (callback) {
		callback();
	}

};

module.exports = RippleidProxy;