import React from 'react';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

// import MainView
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
	render() {
		return <MainView />;
	}
}

// Find the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);

// Tell React to render your app in the root of DOM element
root.render(React.createElement(MyFlixApplication, container));
