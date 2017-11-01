import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import About from './admin/about';
import Index from './admin/index';
import Home from './admin/home';
import Main from './main';
import * as config from '../env';
import ROUTES from '../constants/routes';
import NotFound from './not-found';
import Auth from './admin/auth';
import PasswordReset from './admin/password-reset';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		firebase.initializeApp(config.FIREBASE);
	}

	render() {
		return (
			<Switch>
				<Route path={ROUTES.password_reset} component={PasswordReset} />
				<Route exact path={ROUTES.about} component={About} />
				<Route exact path={ROUTES.index} component={Auth(Index)} />
				<Route exact path={ROUTES.home} component={Home} />
				<Route exact path="/" component={Main} />
				
				<Route exact path= "*" component={NotFound} />
			</Switch>
		);
	}
}

export default withCookies(App);