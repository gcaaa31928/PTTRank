var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var moment = require('moment');
require('../css/hottest_post.css');
moment.locale('zh-tw');
var HottestPost = React.createClass({
    polling_interval: 3000,
    data_limit: 4,
    index: 0,
    current_timestamp: Math.round(moment().subtract(1, 'day').valueOf() / 1000),
    getInitialState: function () {
        console.log(this.current_timestamp);
        return {
            data: [
                {
                    title: '[新聞] 蔡總統向原住民道歉ss12',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html',
                    id: '1'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html',
                    id: '2'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html',
                    id: '3'
                }
            ]
        };
    },

    componentDidMount: function () {
        this.polling();
        this.timer = setInterval(function () {
            // this.polling();
        }.bind(this), this.polling_interval)
    },

    componentWillUnmount: function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    articleHot: function(article) {
        if (article.hot >= 100)
            return 'hottest';
        else if (article.hot >=60)
            return 'hot';
        else
            return 'normal';
    },

    polling: function () {
        var url = '/api/hot_topic?start_epoch=' + this.current_timestamp;
        var data = this.state.data;
        $.get(url, function(articles) {
            for(var i = articles.length - 1; i >= 0 ;i--){
                var article = articles[i];
                article.id = this.index ++;
                article.dateFromNow = moment(article.date).fromNow();
                this.current_timestamp = Math.round(moment(article.date).valueOf() / 1000) + 1;
                this.state.data.unshift(article);
            }
            while (data.length > this.data_limit) {
                data.pop();
            }
            this.setState({data: data});
            setTimeout(function() {
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
                                return (
                                    <div className={"callout row " + this.articleHot(article)} key={article.id}>
                                        <div className="left-side col-xs-8">
                                            <div className="header">
                                                <i className="fa fa-user icon" aria-hidden="true"/>
                                                {article.author_id}
                                                <div className="pull-right date">
                                                    <i className="fa fa-clock-o icon" aria-hidden="true"/>
                                                    {article.dateFromNow}
                                                </div>
                                            </div>
                                            <div className="body">{article.title}</div>
                                        </div>
                                        <div className="right-side col-xs-4">
                                            <div className="board">
                                                {article.board}
                                            </div>
                                            <div className="rank">
                                                <i className="fa fa-star" aria-hidden="true"/>
                                                <i className="fa fa-star" aria-hidden="true"/>
                                                <i className="fa fa-star" aria-hidden="true"/>
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