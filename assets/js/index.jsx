import TopCommenters from './top_commenters'
import HottestPost from './hottest_post'
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom'
import {BeefPost} from "./beef";
require('../css/index.css');

var React = require('react');
var Index = React.createClass({

    getInitialState: function () {
        console.log('initial state');
        return {
            tabs: ['熱門文章', '吵架專區'],
            tabUrl: ['/app/hottest', '/app/beef']
        };
    },

    clickedTab: function (id) {
        this.setState({selectedTab: id});
    },

    isTabActive: function (pathname) {

        return (pathname === this.props.location.pathname) ? 'active' : '';
    },

    render: function () {
        return (
            <div>
                <nav className="header navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">PTT Rank</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                {
                                    this.state.tabs.map(function (tab, i) {
                                        return (
                                            <li className={this.isTabActive(this.state.tabUrl[i])} key={i}>
                                                <Link to={this.state.tabUrl[i]}>{tab}</Link>
                                            </li>
                                        )
                                    }.bind(this))
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="grid page">
                    <div className="row">
                        <div className="col-sm-8">
                            <Route path={`${this.props.match.url}/hottest`} component={HottestPost}/>
                            <Route path={`${this.props.match.url}/beef`} component={BeefPost}/>
                        </div>
                        <div className="col-sm-4">
                            <TopCommenters />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Index