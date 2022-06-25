import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Form, Container, Button, Row, Col, FormGroup } from 'react-bootstrap';

import './profile-view.scss';

export function UpdateView(props) {
	const { user } = props;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [values, setValues] = useState({
		usernameErr: '',
		passwordErr: '',
		emailErr: '',
	});

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setValues({ ...values, usernameErr: 'Username Required!' });
			isReq = false;
		} else if (username.length < 5) {
			setValues({
				...values,
				usernameErr: 'Username must be atleast 5 characters',
			});
			isReq = false;
		}
		if (!password) {
			setValues({ ...values, passwordErr: 'Password Required!' });
			isReq = false;
		} else if (password.length < 6) {
			setValues({
				...values,
				passwordErr: 'Password must be 6 characters long',
			});
			isReq = false;
		}
		if (!email) {
			setValues({ ...values, emailErr: 'Password Required!' });
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setValues({ ...values, emailErr: 'Email must be a valid email address' });
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			const token = localStorage.getItem('token');
			axios
				.put(
					'https://anime-myflix-app.herokuapp.com/users/${user.Username}',
					{
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					console.log(response.data);
					alert('Profile was succesfully updated.');
					window.open('/users/:username', '_self');
				})
				.catch((error) => {
					console.error(error);
					alert('Unable to update profile.');
				});
		}
	};

	return (
		<Container id="update-form" className="mt-5">
			<Row>
				<h4>Edit profile</h4>
			</Row>
			<Row>
				<Col sm="10" md="8" lg="6">
					<Form>
						<Form.Group controlId="formUsername">
							<Form.Label>Username: </Form.Label>
							<Form.Control
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Username"
								required
							/>
							{/* display validation error */}
							{values.usernameErr && <p>{values.usernameErr}</p>}
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label>Password: </Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
							/>
							{/* display validation error */}
							{values.passwordErr && <p>{values.passwordErr}</p>}
						</Form.Group>

						<Form.Group controlId="formEmail">
							<Form.Label>Email: </Form.Label>
							<Form.Control
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="example@email.com"
								required
							/>
							{/* display validation error */}
							{values.emailErr && <p>{values.emailErr}</p>}
						</Form.Group>

						<Form.Group controlId="formBirthday">
							<Form.Label>Birthday: </Form.Label>
							<Form.Control
								type="text"
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
								placeholder="YYYY-MM-DD"
							/>
							{/* display validation error */}
							{values.usernameErr && <p>{values.usernameErr}</p>}
						</Form.Group>

						<Form.Group className='mt-3'>
							<Button variant="primary" type="submit" onClick={handleSubmit}>
								Edit Profile
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}