import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory, Redirect} from 'react-router'
import Index from './index'
import Post from './post'
import Navbar from './navbar'
render(
    <div>
        <Navbar/>
        <Router history={browserHistory}>
            {/*<Redirect from="/" to="index" />*/}
            <Route path="/main" component={Index}/>
            <Route path="/main/post/:postId" component={Post}/>
        </Router>
    </div>
    , document.getElementById('root')
);