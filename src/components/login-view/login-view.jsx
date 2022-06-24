import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';

import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
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
				console.log('no such user');
			});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		console.log('register here');
		props.onRegister(true);
	};

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
								</Form.Group>

								<Form.Group controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
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

									<Button
										variant="secondary"
										id="secondary__button"
										type="submit"
										onClick={handleRegister}
									>
										Register Here
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

LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),

	onLoggedIn: PropTypes.func.isRequired,
};
