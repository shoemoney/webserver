var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _MarketTraderStore = {};

function registerMarketTraders(result){
	var params = result.params
	var id = result.app ? 'app' : params.platform + params.item + params.currency;
	if(result.msg == "unavailable") {
		_MarketTraderStore['msg'] = result.msg;
	} else {
		_MarketTraderStore[id] = result.toJSON().results;
		_MarketTraderStore[id]['params'] = result.params;
		_MarketTraderStore[id]['total'] = prctVolume(_MarketTraderStore[id]);
		_MarketTraderStore[id]['buysellratio'] = buysellratio(_MarketTraderStore[id]);
		prctVolumeAccount(_MarketTraderStore[id]);
		sortList(_MarketTraderStore[id]);
	}
	console.log("_MarketTraderStore",_MarketTraderStore, result);
};

function sortList(list) {
	list.sort(function(a, b) {
		return b.baseVolume - a.baseVolume;
	});
}

function prctVolume(data) {
	var total = {
		currencyVolume : 0,
		itemVolume : 0,
		trades: 0
	};
	_.each(data, function(account) {
		total.currencyVolume += account.counterVolume;
		total.itemVolume += account.baseVolume;
		total.trades += account.count;
	});

	return total;
};

function prctVolumeAccount(data) {
	var total = {
		currencyVolume : 0,
		itemVolume : 0,
		trades: 0
	};
	_.each(data, function(account) {
		account['total'] = {};
		account.total['currencyVolume'] = (account.counterVolume/data.total.currencyVolume)*100;
		account.total['itemVolume'] = (account.baseVolume/data.total.itemVolume)*100;
		account.total['trades'] = (account.count/data.total.trades)*100;
	});
}

function buysellratio(data) {
	_.each(data, function(account) {
		var total = account.buy.baseVolume + account.sell.baseVolume;
		account['buysellratio'] = account.buy.baseVolume/(total);
	})
}

var MarketTraderStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _MarketTraderStore;
	},

	getSpecific:function(key) {
		return _MarketTraderStore[key];
	},

	emitChange: function(event) {
		this.emit(event)
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(candle,callback) {
		this.on(candle, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

MarketTraderStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  	     case Constants.ActionTypes.ASK_MARKETTRADERS:	
  	   	    registerMarketTraders(action.result); 	
  	   	    if(action.result.app) {
		 		MarketTraderStore.emitChange('app');
		 	} else {
		 		MarketTraderStore.emitChange(action.result.params.platform + action.result.params.item + action.result.params.currency);
		 	}
		 	break;
  		 case Constants.ActionTypes.ISLOADING:
  			MarketTraderStore.emitLoading('isloading');
			break;
  	}
  	return true;
});

module.exports = MarketTraderStore;