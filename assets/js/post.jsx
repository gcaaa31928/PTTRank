require('../css/post.css');
var moment = require('moment');
require('moment/locale/zh-tw.js');
moment.locale('zh-tw');
var React = require('react');
var Post = React.createClass({

    getInitialState: function() {
        return {
            data: {}
        };
    },

    handlePost: function(post) {
        post.dateFromNow = moment(post.date).fromNow();
        return post;
    },

    componentDidMount: function() {
        var url = '/api/post/' + this.props.params.postId;
        $.get(url, function (post) {
            post = this.handlePost(post);
            this.setState({data: post});
            this.older_article_request = null;
        }.bind(this));
    },

    render: function() {
        var article = this.state.data;
        return (
            <div>
                <div className="container">
                    <div className="article-header">
                        <h2>{article.title}</h2>
                        <div className="pull-right">
                            {article.dateFromNow}
                        </div>
                    </div>
                    <div className="article-content">

                    </div>
                </div>
            </div>
        )
    }

});

export default Post;