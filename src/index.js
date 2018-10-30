import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem} from 'react-bootstrap';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
