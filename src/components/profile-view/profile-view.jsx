import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect } from 'react';

import { Button, Container, Row, Col } from 'react-bootstrap';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';

import './profile-view.scss';

export function ProfileView(props) {
	const [user, setUser] = useState(props.user);
	const [movies, setMovies] = useState(props.movies);
	const [favouriteMovies, setFavouriteMovies] = useState([]);
	const currentUser = localStorage.getItem('user');
	const token = localStorage.getItem('token');

	const getUser = () => {
		axios
			.get(`https://anime-myflix-app.herokuapp.com/users/${currentUser}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setUser(response.data);
				setFavouriteMovies(response.data.FavouriteMovies);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleDelete = () => {
		axios
			.delete(`https://anime-myflix-app.herokuapp.com/users/${currentUser}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert(`Your account ${user.Username} has been succesfully deleted.`);
				localStorage.clear();
				window.open('/register', '_self');
			})
			.catch((error) => console.error(error));
	};

	return (
		<Container id="profile__form">
			<Row>
				<h4>Your Account</h4>
			</Row>
			<Row className="mt-3">
				<Col className="Label">Username: </Col>
				<Col className="value">{user.Username}</Col>
			</Row>
			<Row className="mt-3">
				<Col className="Label">Password: </Col>
				<Col className="value">******</Col>
			</Row>
			<Row className="mt-3">
				<Col className="Label">Email: </Col>
				<Col className="value">{user.Email}</Col>
			</Row>
			<Row className="mt-3">
				<Col className="Label">Birthday: </Col>
				<Col className="value">{user.Birthday}</Col>
			</Row>
			<Row className="mt-5">
				<h4>Your favourite movies</h4>
			</Row>
			<Row className="mt-3">
				<FavouriteMoviesView
					movies={movies}
					favouriteMovies={favouriteMovies}
					currentUser={currentUser}
					token={token}
				/>
			</Row>
			<UpdateView user={user} />
			<Row className="mt-5">
				<h4>Account Deletion </h4>
			</Row>
			<Button className="mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
		</Container>
	);
}
