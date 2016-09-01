var React = require('react');
var ReactDOM = require('react-dom');
require('../css/hottest_post.css');


var HottestPost = React.createClass({
    getInitialState: function () {
        return {
            data: [
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                },
                {
                    title: '新聞] 蔡總統向原住民道歉 張震嶽批「越講越噁',
                    author_id: 'gcaaa',
                    date: '不久前',
                    weight: '燙',
                    url: 'https://www.ptt.cc/bbs/Gossiping/M.1470339394.A.1FC.html'
                }
            ]
        };
    },
    render: function () {
        return (
            <div className="ui inverted segment">
                <div className="ui inverted relaxed divided list">
                    {
                        this.state.data.map(function (article, i) {
                            return (
                                <div className="hottest item ui grid" key={i}>
                                    <div className="content twelve wide column">
                                        <div className="header">{article.author_id}</div>
                                        <div className="body">{article.title}</div>
                                    </div>
                                    <div className="content four wide column">
                                        <i className="calendar icon" />
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