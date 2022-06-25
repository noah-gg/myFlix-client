import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<Card id="movie__card">
				<Card.Img
					variant="top"
					id="movie__card__img"
					crossOrigin="anonymous"
					src={movie.ImagePath}
				/>
				<Card.Body id="movie__card__body">
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					<Link to={`/movies/${movie._id}`}>
						<Button variant="link">Open</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
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
};
