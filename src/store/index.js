import { createStore, applyMiddleware } from 'redux';
import reduser from './reducer';
import thunk from 'redux-thunk';
import moment from 'moment';

const initialState = {
	questions: [],
	page: 1,
	lastQuestionsLoadDateTime: moment().unix(),
	firstQuestionsLoadDateTime: moment().unix(),
	isLoading: true,
	detailedQuestion: null,
	errorMessage: null
}

const store = createStore(
	reduser,
	initialState,
	applyMiddleware(thunk)
);

export default store;