define('maingraphes', ['config', 'maingraphe', 'moment'], function(config, Maingraphe) {

	var Maingraphes = Backbone.Collection.extend({

		model: Maingraphe,

		url: config.maingraph.urlCollection,

		maxNbPoints: 150,

		fetch: function(params, callback) {
			var self = this;
			var meta = {
				"platform": params.platform || this.metadata.platform,
				"item": params.item || this.metadata.item,
				"currency": params.currency || this.metadata.currency,
				"typeDuration": params.typeDuration,
				"duration": params.duration
			};

			this.metadata = meta;

			$.ajax({
				data: meta,
				crossDomain: true,
				type: 'POST',
				url: this.url,
				success: function(response) {
					var oResponse = {};
					try {
						oResponse = JSON.parse(response);
					} catch (e) {
						console.log('error fetch trades :', e);
					}

					var nbPoints = oResponse.candles.length;
					if (nbPoints > self.maxNbPoints) {
						self.candles = _.filter(oResponse.candles, function(candle, index) {
							return index % Math.round(nbPoints / self.maxNbPoints) == 0;
						});
						self.volumes = _.filter(oResponse.volumes, function(volume, index) {
							return index % Math.round(nbPoints / self.maxNbPoints) == 0;
						});
					} else {
						self.candles = oResponse.candles;
						self.volumes = oResponse.volumes;
					}

					_.each(self.candles, function(candle) {
						candle.middleDate = new Date((candle.startDate + (candle.endDate - candle.startDate) / 2) * 1000);
						candle.startDate = new Date(candle.startDate * 1000);
						candle.endDate = new Date(candle.endDate * 1000);
					});

					_.each(self.volumes, function(volume) {
						volume.startDate = new Date(volume.startDate * 1000);
						volume.endDate = new Date(volume.endDate * 1000);
					});

					callback(self);
				},
				error: function(error) {
					console.log(error);
				}
			});
		}

	});

	return Maingraphes;

});