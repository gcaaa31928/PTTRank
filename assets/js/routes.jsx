import React from 'react'
import {render} from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Index from './index'
import Post from './post'
import {BeefPost} from "./beef";
import {HottestPost} from "./hottest_post";

const history = createBrowserHistory();
render(
    <Router history={history}>
        <Switch>
            <Redirect from="/app" exact to="/app/hottest"/>
            <Route path="/app" component={Index}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);