define('controllerView', ['text!controllerView.html', 'text!./application/views/controller/searchView.html', 'ParametersManager', 'config', 'items', 'itemsView', 'platforms', 'platformsView', 'currencies', 'currenciesView', 'FormatUtils'], function(ControllerViewTemplate, SearchViewTemplate, ParametersManager, config, Items, ItemsView, Platforms, PlatformsView, Currencies, CurrenciesView, FormatUtils) {

    return Backbone.View.extend({

        el: '#js-controller',

        events: {
            'click #js-showItemsView': 'showItemsView',
            'click #js-showPairsView': 'showPairsView',
            'click #js-showPlatformsView': 'showPlatformsView',

            'click .js-item': 'changeGlobalItem',
            'click .js-pair': 'changeGlobalPair',
            'click .js-platform': 'changeGlobalPlatform',

            'keyup #js-searchbar': 'search'
        },

        template: _.template(ControllerViewTemplate),
        templateSearch: _.template(SearchViewTemplate),

        initialize: function() {
            _.bindAll(
                this,
                'render',
                'update'
            );

            this.itemsView = new ItemsView();
            this.currenciesView = new CurrenciesView();
            this.platformsView = new PlatformsView();
        },

        render: function(params) {
            var currentParams = ParametersManager.getCurrentParams();
            var tplVars = {
                selectedPlatform: currentParams.platform,
                selectedItem: currentParams.item,
                selectedPair: currentParams.pair
            };
            this.$el.html(this.template(tplVars));

            this.itemsView
                .setElement('#js-itemsViewModal')
                .render(params);

            this.platformsView
                .setElement('#js-platformsViewModal')
                .render(params);

            this.currenciesView
                .setElement('#js-currenciesViewModal')
                .render(params);

            $(document).foundation();
            return this;
        },

        update: function(params) {
            var self = this;
            this.render(params);
        },

        search: function() {
            var query = $('#js-searchbar').val();
            if (query && query != "") {
                var matchItems = _.uniq(ParametersManager.getItems().search(query), function(item) {
                    return item.id;
                });
                var matchPlatforms = _.uniq(ParametersManager.getPlatforms().search(query), function(platform) {
                    return platform.id;
                });

                var matchPairs = _.uniq(ParametersManager.getPairs().search(query), function(pair) {
                    return pair.id;
                });

                var tplVariables = {
                    platforms: matchPlatforms,
                    items: matchItems,
                    pairs: matchPairs
                };

                var htmlResults = this.templateSearch(tplVariables);
                $('#js-searchResults').html(htmlResults);
            } else {
                $('#js-searchResults').html("");
            }
            return true;
        },

        showSearchView: function() {
            $('#js-searchResults').show();
            return false;
        },

        hideSearchView: function() {
            $('#js-searchResults').hide();
            return false;
        },

        changeGlobalItem: function(event) {
            var itemId = $(event.target).attr('id');
            ParametersManager.changeGlobalItem(itemId);
            return false;
        },

        changeGlobalPair: function(event) {
            var itemId = $(event.target).attr('id');
            ParametersManager.changeGlobalItem(itemId);
            return false;
        },

        changeGlobalPlatform: function(event) {
            var platformId = $(event.target).attr('id');
            ParametersManager.changeGlobalPlatform(platformId);
            return false;
        },

        showPlatformsView: function() {
            $('#js-platformsViewModal').foundation('reveal', 'open');
            return false;
        },

        showPairsView: function() {
            $('#js-currenciesViewModal').foundation('reveal', 'open');
            return false;
        },

        showItemsView: function() {
            $('#js-itemsViewModal').foundation('reveal', 'open');
            return false;
        }

    });

});