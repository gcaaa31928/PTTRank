var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var moment = require('moment');
require('moment/locale/zh-tw.js');
require('../css/hottest_post.css');
moment.locale('zh-tw');
var HottestPost = React.createClass({
    polling_interval: 3000,
    data_limit: 15,
    index: 0,
    start_page: 0,
    current_timestamp: Math.round(moment().subtract(1, 'day').valueOf() / 1000),
    olders_timestamp:  Math.round(moment().subtract(1, 'day').valueOf() / 1000),
    polling_request: null,
    older_article_request: null,
    keep_polling: true,
    getInitialState: function () {
        return {
            data: []
        };
    },

    componentDidMount: function () {
        function isScrollBottom() {
            var hottest_post_ele = $(".hottest-post");
            var elementHeight = hottest_post_ele[0].scrollHeight;
            var scrollPosition = hottest_post_ele.height() + hottest_post_ele.scrollTop();
            return (elementHeight == scrollPosition);
        }

        function isScrollTop() {
            var hottest_post_ele = $(".hottest-post");
            var scrollPosition = hottest_post_ele.scrollTop();
            return (0 == scrollPosition);
        }

        $(".hottest-post").scroll(function () {
            if (isScrollBottom()) {
                this.keep_polling = false;
                this.polling_request.abort();
                if (!this.older_article_request) {
                    this.olderArticles();
                }
            } else if (isScrollTop()) {
                this.keep_polling = true;
                this.polling_request.abort();
                this.polling();
            }
        }.bind(this));
        this.polling();
    },

    componentWillUnmount: function () {
    },

    articleHot: function (article) {
        if (article.hot >= 100)
            return 'hottest';
        else if (article.hot >= 60)
            return 'hot';
        else
            return 'normal';
    },

    articleScore: function (article) {
        if (article.score >= 100)
            return 5;
        else if (article.score >= 80)
            return 4;
        else if (article.score >= 60)
            return 3;
        else if (article.score >= 40)
            return 2;
        else if (article.score >= 20)
            return 1;
        return 0;
    },

    handleOlderArticles: function(articles, state_data) {
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            article.dateFromNow = moment(article.date).fromNow();
            state_data.push(article);
        }
    },

    handleArticles: function (articles, state_data) {
        state_data = [];
        for (var i = articles.length - 1; i >= 0; i--) {
            var article = articles[i];
            article.dateFromNow = moment(article.date).fromNow();
            // this.current_timestamp = Math.round(moment(article.date).valueOf() / 1000) + 1;
            state_data.unshift(article);
            while (state_data.length > this.data_limit) {
                state_data.pop();
            }
        }
        return state_data;
    },

    olderArticles: function () {
        this.start_page ++;
        var url = '/api/hot_topic?start_epoch=' + this.olders_timestamp +
            '&start_page=' + this.start_page;
        var data = this.state.data;
        this.older_article_request = $.get(url, function (articles) {
            this.handleOlderArticles(articles, data);
            this.setState({data: data});
            this.older_article_request = null;
        }.bind(this));
    },

    polling: function () {
        var url = '/api/hot_topic?start_epoch=' + this.current_timestamp;
        var data = this.state.data;
        this.polling_request = $.get(url, function (articles) {
            data = this.handleArticles(articles, data);
            this.setState({data: data});
            setTimeout(function () {
                if(this.keep_polling)
                    this.polling();
            }.bind(this), this.polling_interval);
        }.bind(this));
    },

    render: function () {

        return (
            <div>
                <h3>熱門文章</h3>
                <div className="grid hottest-post">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "animated",
                            enterActive: "fadeIn",
                            leave: "animated",
                            leaveActive: "fadeOut",
                        }}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                    >
                        {
                            this.state.data.map(function (article, i) {
                                var scoresElement = [];
                                for (var k = 0; k < this.articleScore(article); k++) {
                                    scoresElement.push(<i className="fa fa-star" aria-hidden="true"/>)
                                }

                                return (
                                    <div className={"callout row " + this.articleHot(article)} key={article.url}>
                                        <div className="left-side col-xs-8">
                                            <div className="header">
                                                <i className="fa fa-user icon" aria-hidden="true"/>
                                                {article.author_id}
                                                <div className="pull-right date">
                                                    <i className="fa fa-clock-o icon" aria-hidden="true"/>
                                                    {article.dateFromNow}
                                                </div>
                                            </div>
                                            <a href={article.url} target="_blank">
                                                <div className="body">{article.title}</div>
                                            </a>
                                        </div>
                                        <div className="right-side col-xs-4">
                                            <div className="board">
                                                {article.board}
                                            </div>
                                            <div className="rank">
                                                {scoresElement}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }.bind(this))
                        }
                    </ReactCSSTransitionGroup>

                </div>
            </div>
        )
    }
});
export default HottestPost;