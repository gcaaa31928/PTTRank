
require('../css/hottest_post.css');
require('../css/index.css');
import 'semantic/dist/semantic.min.css'


var React = require('react');

var Index = React.createClass({
    render: function() {
        return (
            <div className="ui grid page">
                <div className="row">
                    <div className="six wide column">
                        <TopCommenters />,
                    </div>
                    <div className="ten wide column">
                        <HottestPost />,
                    </div>
                </div>
                <div className="row">
                    {/*<div className="five wide column" id="top_posters"></div>*/}
                    {/*<div className="five wide column" id="top_quality"></div>*/}
                    {/*<div className="five wide column" id="top_conscience"></div>*/}
                </div>
            </div>
        )
    }
});

export default Index