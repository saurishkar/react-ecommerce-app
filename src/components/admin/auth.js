import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Login } from '../../actions/auth';
import UserAPI from '../../apis/auth';

class Auth extends React.Component {

	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(formData) {
		this.props.Login(formData);

		this.props.closeModal();
		this.props.reset(); // Resets the Login Form on successful login

	}

	componentDidMount() {
		// this.props.fetchUsers();
	}

	renderField(field) {

		return (
			<div>
				<label>{field.label}</label>
				<input {...field.input} 
					type={field.type} 
					name={field.name}
					placeholder={field.placeholder}
					className={`form-control ${ field.meta.error && field.meta.touched ? 'error':''}`}
				/>
				<span className="text-danger"><small>{field.meta.touched && field.meta.error}</small></span><br />
			</div>
		);
	}

	render() {
		// console.log('Modal', this.props.showModal);
		const { handleSubmit } = this.props;
		return (
			<Modal bsSize="sm" show={this.props.showModal} onHide={()=>this.props.closeModal()}>
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Modal.Header closeButton>
						<h4 className="text-center">Login</h4>
					</Modal.Header>
					<Modal.Body>
						<div className="login-form">
							<Field 
								label="Email"
								name="email"
								type="email"
								placeholder="Email"
								component={this.renderField}
							/>
							<Field 
								label="Password"
								name="password"
								type="password"
								placeholder="Password"
								component={this.renderField}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-danger text-center form-control" type="submit">Login</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

function validate(values) {
	const errors = [];

	if(!values.email) {
		errors.email = 'Email is Required';
	}

	if(!values.password) {
		errors.password = 'Password is Required';
	}

	return errors;
	
}

function mapDispatchToProps(dispatch) {
	return {
		Login: (formData) => {

			const userLoginPromise = UserAPI.login(formData);
			userLoginPromise.then((response) => {
				console.log(response);
				localStorage.setItem('loggedInUser', JSON.stringify(formData));
				// dispatch(Login(response));
			});

			return userLoginPromise;
		}
	};
}


export default reduxForm({
	validate: validate,
	form: 'loginAdminForm'
})(connect(null, mapDispatchToProps)(Auth)
);
