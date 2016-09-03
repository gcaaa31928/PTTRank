var React = require('react');
var ReactDOM = require('react-dom');
require('../css/hottest_post.css');


var HottestPost = React.createClass({
    polling_interval: 3000,
    data_limit: 4,
    getInitialState: function () {
        return {
            data: [
                {
                    title: '[新聞] 蔡總統向原住民道歉ss12',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    board: '八卦版',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                }
            ]
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            this.polling();
        }.bind(this), this.polling_interval)
    },

    componentWillUnmount: function () {
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    polling: function () {
        console.log('sdfsdf');
        var data = this.state.data;
        data.unshift(
            {
                title: '[新聞] 蔡總統向原住民道歉ss12',
                author_id: 'gcaaa',
                date: '不久前',
                board: '八卦版',
                weight: '燙',
                url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
            }
        );
        while (data.length > this.data_limit) {
            data.pop();
        }
        this.setState({data: data});
    },

    render: function () {
        return (
            <div>
                <h3>熱門文章</h3>
                <div className="grid hottest-post">
                    {
                        this.state.data.map(function (article, i) {
                            return (
                                <div className="callout row animated fadeIn" key={i}>
                                    <div className="left-side col-xs-8">
                                        <div className="header">
                                            {article.author_id}
                                            <div className="pull-right date">
                                                <i className="fa fa-clock-o" aria-hidden="true"/>
                                                {article.date}
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
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});
export default HottestPost;