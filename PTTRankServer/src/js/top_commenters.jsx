var React = require('react');
var ReactDOM = require('react-dom');

var TopCommenters = React.createClass({
    getInitialState: function () {
        return {top_comments: []};
    },
    render: function () {
        return (
            <table class="ui inverted table">
                <thead>
                {
                    this.state.top_comments.map(function (name) {
                        return (
                            <tr>
                                <td></td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>Jill</td>
                    <td>Denied</td>
                    <td>None</td>
                </tr>
                </tbody>
            </table>
        )
    }
});


ReactDOM.render(
    document.getElementById('top_commenters')
);