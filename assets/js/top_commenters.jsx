import AbstractRankTable from './abstract_rank_table'
var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
moment.locale('zh-tw');
var TopCommenters = React.createClass({
    polling_interval: 5000,
    data_limit: 10,

    current_timestamp: Math.round(moment().subtract(1, 'day').valueOf() / 1000),
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function() {
        this.polling();
    },

    componentWillUnmount: function() {
    },

    polling: function() {
        var url= '/api/top_commenters?start_epoch=' + this.current_timestamp;
        var data = this.state.data;
        $.get(url, function(users) {
            this.setState({data: users});
            setTimeout(function() {
                this.polling();
            }.bind(this), this.polling_interval)
        }.bind(this))
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

export default TopCommenters


// ReactDOM.render(
    {/*<TopCommenters />,*/}
    // document.getElementById('top_commenters')
// );