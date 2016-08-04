var React = require('react');
var ReactDOM = require('react-dom');


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
                }
            ]
        };
    },
    render: function () {
        return (
            <table className="ui inverted table">
                <thead>
                <tr>
                    <th colSpan="4" className="center aligned">熱門文章</th>
                </tr>
                <tr>
                    <th>標題</th>
                    <th>ID</th>
                    <th>時間</th>
                    <th>熱度</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map(function (article, i) {
                        return (
                            <tr key={i}>
                                <td><a href={article.url} target="_blank">{article.title}</a></td>
                                <td>{article.author_id}</td>
                                <td>{article.date}</td>
                                <td>{article.weight}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
});


ReactDOM.render(
    <HottestPost />,
    document.getElementById('hottest_post')
);