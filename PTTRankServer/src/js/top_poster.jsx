var React = require('react');
var ReactDOM = require('react-dom');

var TopPosters = React.createClass({
    getInitialState: function () {
        return {data: [{id: 'gcaaa', score: 10},{id: 'gcaaa2', score: 20}]};
    },
    render: function () {
        return (
            <AbstractRankTable
                title="最常發文者"
                dataName="發文數"
                data={this.state.data}
            />
        )
    }
});


ReactDOM.render(
    <TopPosters />,
    document.getElementById('top_posters')
);