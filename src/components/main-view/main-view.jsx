import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	getMovies(token) {
		axios
			.get('https://anime-myflix-app.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign the result to the state
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	/* When a user seuccessfully logs in, this function updates the `user` property in state to that *particular user */
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

	render() {
		const { movies, user } = this.state;

		// /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
		// if (!user)
		// 	return (
		// 		<Row>
		// 			<Col>
		// 				<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
		// 			</Col>
		// 		</Row>
		// 	);
		// /* Before the movies have been loaded */
		// if (movies.length === 0) return <div className="main-view" />;

		return (
			<Router>
				<NavbarView user={user} />
				<Row className="main-view justify-content-md-center">
					<Route
						exact
						path="/"
						render={() => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className="main-view" />;
							return movies.map((m) => (
								<Col md={3} sm={6} key={m._id}>
									<MovieCard movie={m} />
								</Col>
							));
						}}
					/>

					<Route
						path="/register"
						render={() => {
							if (user) return <Redirect to="/" />;
							return (
								<Col>
									<RegistrationView />
								</Col>
							);
						}}
					/>

					<Route
						path="/movies/:movieId"
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className="main-view" />;
							return (
								<Col md={8}>
									<MovieView
										movie={movies.find((m) => m._id == match.params.movieId)}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>

					<Route
						path="/directors/:name"
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className="main-view" />;
							return (
								<Col md={8}>
									<DirectorView
										director={
											movies.find((m) => m.Director.Name === match.params.name)
												.Director
										}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>

					<Route
						path="/genres/:name"
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className="main-view" />;
							return (
								<Col md={8}>
									<GenreView
										genre={
											movies.find((m) => m.Genre.Name === match.params.name)
												.Genre
										}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>

					<Route
						path="/users/:username"
						render={({ match, history }) => {
							if (!user)
								return (
									<Col>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</Col>
								);
							if (movies.length === 0) return <div className="main-view" />;
							if (!user) return <Redirect to="/" />;
							return (
								<Col md={8}>
									<ProfileView
										movies={movies}
										user={user === match.params.username}
										onBackClick={() => history.goBack()}
									/>
								</Col>
							);
						}}
					/>
				</Row>
			</Router>
		);
	}
}
