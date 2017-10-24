import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../admin/auth';
import UserAPI from '../../apis/auth';
import { Logout } from '../../actions/auth';
import { FetchPosts } from '../../actions/posts';

class NavbarMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({
			showModal: true
		});
	}

	closeModal() {
		this.setState({
			showModal: false
		});
	}

	render() {

		const renderUserSession = () => {
			if(this.props.auth && this.props.auth.user) {
				return (
					<ul className="list-unstyled navbar-nav">
						<li className="nav-item"><Link to="/blog">My Posts</Link></li>
						<ul className="list-unstyled navbar-nav align-right">
							<li className="nav-item">{this.props.auth.user.email}</li>
							<li className="nav-item">
								<a tabIndex="0" role="button"  onClick={() => this.props.logout()}>Logout</a>
							</li>
						</ul>
					</ul>
				);
			}

			return (
				<li 
					className="align-right" 
					tabIndex="0" 
					role="button" 
					onClick={() => this.openModal()} 
					style={{ color: '#aaa'}}
				>
					Login
				</li>
			);
		};
		return (
			<div>
				<Navbar fixedTop={false}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">Learn To React</a>
						</Navbar.Brand>
					</Navbar.Header>
					<ul className="list-unstyled navbar-nav">
						<li className="nav-item"><Link to="/">Home</Link></li>
						<li className="nav-item"><Link to="/about">About</Link></li>
						{renderUserSession()}
					</ul>
				</Navbar>
				<Auth 
					showModal={this.state.showModal}
					closeModal={this.closeModal}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {auth: state.auth};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			const signOutPromise = UserAPI.logout();
			signOutPromise.then(() => {
				localStorage.clear('loggedInUser');
				dispatch(Logout());
				dispatch(FetchPosts({}));
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain);
