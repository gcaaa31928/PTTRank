var React = require('react');
var ReactDOM = require('react-dom');

var AbstractRankTable = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        title: React.PropTypes.string,
        dataName: React.PropTypes.string
    },

    render: function() {
        return(
            <table className="ui inverted table">
                <thead>
                <tr>
                    <th colSpan="2" className="center aligned">{this.props.title}</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>{this.props.dataName}</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map(function (comment, i) {
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