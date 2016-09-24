require('../css/post.css');
var React = require('react');
var Post = React.createClass({

    getInitialState: function() {
        return {
            data: {}
        };
    },

    componentDidMount: function() {
        var url = '/api/post/' + this.props.params.postId;
        $.get(url, function (post) {
            this.setState({data: post});
            this.older_article_request = null;
        }.bind(this));
    },

    render: function() {
        var article = this.state.data;
        return (
            <div>
                <div className="container">
                    <h2>{article.title}</h2>
                </div>
            </div>
        )
    }

});

export default Post;