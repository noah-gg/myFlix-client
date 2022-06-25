import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';

import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {

	addToFavouriteList(movieId) {
		const currentUser = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios.post(`https://anime-myflix-app.herokuapp.com/users/${currentUser}/movies/${movieId}`, {}, {
			headers: { Authorization: `Bearer ${token}` }
		}).then((response) => {
			console.log(response.data)
			alert(`The movie was successfully added to your list`)
		}).catch(error => console.error(error))
	}
	
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view">
				<div className="movie-poster">
					<img id="movie__img" crossOrigin="anonymous" src={movie.ImagePath} />
				</div>

				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movie.Title}</span>
				</div>

				<div className="movie-genre">
					<span className="label">Genre: </span>
					<Link to={`/genres/${movie.Genre.Name}`}>
						<Button variant="link">{movie.Genre.Name}</Button>
					</Link>
				</div>

				<div className="movie-director">
					<span className="label">Director: </span>
					<Link to={`/directors/${movie.Director.Name}`}>
						<Button variant="link">{movie.Director.Name}</Button>
					</Link>
				</div>

				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>
				<div>
					<Button
						id="back__button"
						className='button btn-left'
						onClick={() => {
							onBackClick(null);
						}}
					>
						Back
					</Button>

					<Button
						id="favourite__button"
						className='button btn-right'
						onClick={() => {
							this.addToFavouriteList(movie._id);
						}}
					>
						Add to favourites
					</Button>
				</div>
				
			</div>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string,
		}),
		ImagePath: PropTypes.string.isRequired,
	}).isRequired,

	onBackClick: PropTypes.func.isRequired,
};
