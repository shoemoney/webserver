define('offcanvasmenuView', ['config', 'text!offcanvasmenuView.html', 'backbone', 'weeknewsView', 'calculatorView', 'shortcutsView', 'lastupdateView'], function(config, OffcanvasmenuTemplate, Backbone, WeeknewsView, CalculatorView, ShortcutsView, LastupdateView) {

    return Backbone.View.extend({

        el: '#js-offcanvasmenu',

        template: _.template(OffcanvasmenuTemplate),

        events: {
            'click #js-calculator': 'showCalculatorModal',
            'click #js-weeknews': 'showWeeknewsModal',
            'click #js-shortcuts': 'showShortcutsModal',
            'click #js-ressources': 'openBlogRessourcesInNewTab'
        },

        initialize: function() {
            _.bindAll(this,
                'render'
            );
            this.calculatorView = new CalculatorView();
            this.weeknewsView = new WeeknewsView();
            this.shortcutsView = new ShortcutsView();
            this.lastupdateView = new LastupdateView();
            
        },

        render: function(params) {
            this.$el.html(this.template());

            $('.js-offcanvasToggle').click(function() {
                $('body').animate({
                    scrollTop: 0
                });
            });

            this.lastupdateView
                .setElement('#js-lastUpdate')
                .render();
            $(document).foundation();
            return this;
        },

        showCalculatorModal: function() {
            this.calculatorView
                .setElement('#js-calculatorModal')
                .render();
            $('#js-calculatorModal').foundation('reveal', 'open');
        },

        showShortcutsModal: function() {
            this.shortcutsView
                .setElement('#js-shortcutsModal')
                .render();
            $('#js-shortcutsModal').foundation('reveal', 'open');
        },

        showWeeknewsModal: function() {
            this.weeknewsView
                .setElement('#js-weeknewsModal')
                .render();
            $('#js-weeknewsModal').foundation('reveal', 'open');
        },

        openBlogRessourcesInNewTab: function(event) {
            window.open("http://blog.heartbit.io/", '_blank');
            event.preventDefault();
        }

    });

});