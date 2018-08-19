import 'babel-polyfill';
import './index.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import moment from 'moment';
import App from './App';

moment.locale('ru');

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)