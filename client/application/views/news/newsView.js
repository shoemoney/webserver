define('newsView', ['news', 'storyjs', 'timelinejs', 'moment', 'text!./newsView.html', 'text!./application/views/news/articleContentTpl.html'], function(News, storyjs, timelinejs, moment, NewsViewTemplate, ArticleContentTemplate) {

    return Backbone.View.extend({

        el: '#js-news',

        events: {
            'click .slider-item': 'clickOnArticle'
        },

        template: _.template(NewsViewTemplate),
        articleContentTemplate: _.template(ArticleContentTemplate),

        initialize: function() {
            _.bindAll(
                this,
                "render"
            );
            this.news = new News();
            this.news.on('update', this.render);
            this.news.socketSync();
        },

        clickOnArticle: function(event) {
            this.$currentNewsItem = $(event.target).closest('.slider-item');
            if (!this.$currentNewsItem.hasClass('read')) {
                this.$currentNewsItem.addClass('read');
            }
            var newsGuid = this.$currentNewsItem.attr('id');
            this.$currentNewsItem.find('.icon-ok').removeClass('hide');
            this.$('.marker.active').find('h3').append('<span class="icon-ok right"></span>');
            this.currentNews = this.news.getNewsByGuid(newsGuid);
            window.open(this.currentNews.link, '_blank');
            event.preventDefault();
        },

        render: function() {
            var self = this;
            if (this.news && this.news.models.length > 0) {
                this.$el.html(this.template());
                createStoryJS({
                    type: 'timeline',
                    width: '100%',
                    height: '500',
                    start_at_end: true,
                    hash_bookmark: false,
                    lang: 'en',
                    font: 'Lato',
                    maptype: 'osm',
                    source: this.news.toTimelineJSON(),
                    embed_id: 'timeline-news'
                });
            }
            $(document).foundation({
                equalizer: {
                    equalize_on_stack: true
                }
            });
            return this;
        }

    });

});