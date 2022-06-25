import React, { Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavouriteMoviesView(props) {
	const { movies, favouriteMovies, currentUser, token } = props;

	const favouriteMoviesList = movies.filter(m => {
		// console.log(JSON.stringify(favouriteMovies))
		return favouriteMovies.includes(m._id);
	});

	const handleMovieDelete = (movieId) => {
		axios
			.delete(
				`https://anime-myflix-app.herokuapp.com/users/${currentUser}/movies/${movieId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then(() => {
				alert(`The movie was successfully deleted`);
				window.open('/users/:username', '_self');
			})
			.catch((error) => console.error(error));
	};

	return (
		<Fragment>
			{favouriteMoviesList.length === 0 ? (
				<p>You have no favourite movies yet.</p>
			) : (
				favouriteMoviesList.map((movie) => {
					return (
						<Col xs={10} sm={8} md={6}>
							<Card id="movie__card">
								<Link to={`/movies/${movies._id}`}>
									<Card.Img
										variant="top"
										id="movie__card__img"
										crossOrigin="anonymous"
										src={movie.ImagePath}
									/>
								</Link>
								<Card.Body id="movie__card__body">
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Description}</Card.Text>
									<Link to={`/movies/${movie._id}`}>
										<Button variant="link">Open</Button>
									</Link>
									<Button
										className="button ml-2"
										variant="outline-primary"
										size="sm"
										onClick={() => {
											handleMovieDelete(movie._id);
										}}
									>
										Remove
									</Button>
								</Card.Body>
							</Card>
						</Col>
					);
				})
			)}
		</Fragment>
	);
}
