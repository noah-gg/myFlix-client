import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './registration-view.scss';

import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	// declare hook for each input
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [emailErr, setEmailErr] = useState('');

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr('Username Required!');
			isReq = false;
		} else if (username.length < 5) {
			setUsernameErr('Username must be atleast 5 characters');
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password Required!');
			isReq = false;
		} else if (password.length < 6) {
			setPassword('Password must be 6 characters long');
			isReq = false;
		}
		if (!email) {
			setEmailErr('Password Required!');
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setEmail('Email must be a valid email address');
			isReq = false;
		}

		return isReq;
	};

	const handleRegistration = (e) => {
		e.preventDefault();

		const isReq = validate();
		if (isReq) {
			axios
				.post('https://anime-myflix-app.herokuapp.com/users', {
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday,
				})
				.then((response) => {
					const data = response.data;
					console.log(data);
					alert('Registration successful! Please login.');
					window.open('/', '_self');
					// opens in current tab
				})
				.catch((e) => {
					console.log('Error');
					alert('Unable to register');
				});
		}
	};

	return (
		<Container id="login-container">
			<Row className="justify-content-md-center row">
				<Col>
					<Card id="card">
						<Card.Body>
							<Card.Title id="card__title">Please Register</Card.Title>

							<Form>
								<Form.Group>
									<Form.Label>Username: </Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										Required
									/>
									{/* code added here to display validation error */}
									{usernameErr && <p>{usernameErr}</p>}
								</Form.Group>

								<Form.Group>
									<Form.Label>Password: </Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										Required
									/>
									{/* code added here to display validation error */}
									{passwordErr && <p>{passwordErr}</p>}
								</Form.Group>

								<Form.Group>
									<Form.Label>Email: </Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										Required
									/>
									{/* code added here to display validation error */}
									{emailErr && <p>{emailErr}</p>}
								</Form.Group>

								<Form.Group>
									<Form.Label>Birthday: </Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Birthday"
										value={birthday}
										onChange={(e) => setBirthday(e.target.value)}
										Required
									/>
								</Form.Group>

								<Form.Group>
									<Button
										variant="primary"
										id="primary__button"
										type="submit"
										onClick={handleRegistration}
									>
										Submit
									</Button>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

RegistrationView.propTypes = {
	onRegister: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.string,
	}),
};
