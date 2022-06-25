import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';

import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// declare hook for each input
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

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
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server for authentication*/
			axios
				.post('https://anime-myflix-app.herokuapp.com/login', {
					Username: username,
					Password: password,
				})
				.then((response) => {
					const data = response.data;
					props.onLoggedIn(data);
				})
				.catch((e) => {
					console.log('No such user');
				});
		}
	};

	// const handleRegister = (e) => {
	// 	e.preventDefault();
	// 	console.log('register here');
	// 	props.onRegister(true);
	// };

	return (
		<Container id="login-container">
			<Row className="justify-content-md-center row">
				<Col>
					<Card id="card">
						<Card.Body>
							<Card.Title id="card__title">Welcome to myFlix</Card.Title>

							<Form>
								<Form.Group controlId="formUsername">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter your username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
									{/* code added here to display validation error */}
									{usernameErr && <p>{usernameErr}</p>}
								</Form.Group>

								<Form.Group controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									{/* code added here to display validation error */}
									{passwordErr && <p>{passwordErr}</p>}
								</Form.Group>

								<Form.Group>
									<Button
										variant="primary"
										id="primary__button"
										type="submit"
										onClick={handleSubmit}
									>
										Login
									</Button>

									<Link to={'/register'}>
										<Button variant="secondary" id="secondary__button">
											Register here
										</Button>
									</Link>

									{/* <Button
										variant="secondary"
										id="secondary__button"
										type="submit"
										onClick={handleRegister}
									>
										Register Here
									</Button> */}
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),

	onLoggedIn: PropTypes.func.isRequired,
};
