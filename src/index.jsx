import React from 'react';

// import ReactDOM from 'react-dom'; <= using this for the latest React v18 instead of ReactDOM
import { createRoot } from 'react-dom/client';

// import MainView
import { MainView } from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
	render() {
		return (
			<Container>
				<MainView />
			</Container>
		);
	}
}

// Find the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);

// Tell React to render your app in the root of DOM element
root.render(React.createElement(MyFlixApplication, container));
