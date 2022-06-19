import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleRegistration = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		props.onRegister(false);
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
	onRegister: PropTypes.func.isRequired,
};
