import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router'
import Index from './index'

render(
    <Router history={browserHistory}>
         <Route path="/" component={Index}>
         </Route>
    </Router>
    , document.getElementById('root')
);