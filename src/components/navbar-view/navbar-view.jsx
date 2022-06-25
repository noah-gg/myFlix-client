import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function NavbarView() {
	let user = localStorage.getItem('user');

	const handleLogOut = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.open('/', '_self');
		propTypes.onLoggedOut(user);
	};

	const isAuth = () => {
		if (typeof window == 'undefined') {
			return false;
		}
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token');
		} else {
			return false;
		}
	};

	return (
		<Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand>myFlix anime</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="me-auto">
						{isAuth() && <Nav.Link href="/">Movies</Nav.Link>}
						{isAuth() && <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>}
						{isAuth() && (
							<Button variant="link" onClick={handleLogOut}>
								Sign-out
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
