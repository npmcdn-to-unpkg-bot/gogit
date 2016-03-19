/// <reference path="typings/main.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import { Router, Route } from 'react-router';
import Application from 'application';
import { createHistory } from 'history';

let history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={Application}>
        </Route>
    </Router>,
    document.getElementById('app')
);
