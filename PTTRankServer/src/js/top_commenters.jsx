var React = require('react');
var ReactDOM = require('react-dom');

var TopCommenters = React.createClass({
    getInitialState: function () {
        return {data: [{id: 'gcaaa', score: 10},{id: 'gcaaa2', score: 20}]};
    },
    render: function () {
        return (
            <table className="ui inverted table">
                <thead>
                <tr>
                    <th colSpan="2" className="center aligned">最常留言者</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>留言數</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map(function (comment, i) {
                        return (
                            <tr key={i}>
                                <td>{comment.id}</td>
                                <td>{comment.score}</td>
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
    <TopCommenters />,
    document.getElementById('top_commenters')
);