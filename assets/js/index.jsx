import TopCommenters from './top_commenters'
import HottestPost from './hottest_post'
require('../css/index.css');

var React = require('react');
var Index = React.createClass({
    render: function() {
        return (
            <div className="grid page">
                <div className="row">
                    <div className="col-sm-8">
                        <HottestPost />,
                    </div>
                    <div className="col-sm-4">
                        <TopCommenters />,
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