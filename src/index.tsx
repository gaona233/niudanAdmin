import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/main/App';
import * as serviceWorker from './serviceWorker';
import PageRouter from './router/router';

ReactDOM.render(<PageRouter />, document.getElementById('root'));

serviceWorker.unregister();