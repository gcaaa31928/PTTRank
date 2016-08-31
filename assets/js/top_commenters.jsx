var React = require('react');
var ReactDOM = require('react-dom');

var TopCommenters = React.createClass({
    getInitialState: function () {
        return {data: [{id: 'gcaaa', score: 10},{id: 'gcaaa2', score: 20}]};
    },
    render: function () {
        return (
            <AbstractRankTable
                title="最常留言者"
                dataName="留言數"
                data={this.state.data}
            />
        )
    }
});


// ReactDOM.render(
    {/*<TopCommenters />,*/}
    // document.getElementById('top_commenters')
// );