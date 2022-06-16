import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
		<form>
			<label>
				Username:
				<input
					type="text"
					placeholder="Enter Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>

			<label>
				Password:
				<input
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			<label>
				Email:
				<input
					type="email"
					placeholder="Enter Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<label>
				Birthday:
				<input
					type="text"
					placeholder="Enter Birthday"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
				/>
			</label>
			<button type="submit" onClick={handleRegistration}>
				Submit
			</button>
		</form>
	);
}

RegistrationView.propTypes = {
	onRegister: PropTypes.func.isRequired,
};
