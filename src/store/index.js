import { createStore, applyMiddleware } from 'redux';
import reduser from './reducer';
import thunk from 'redux-thunk';
import moment from 'moment';

const dateNow = moment().unix();
const initialState = {
	questions: [],
	page: 1,
	_dtLatestQuestionsLoad: dateNow,
	_dtAfterStartAppQuestionsLoad: dateNow,
	isLoading: true,
	openedQuestionDetail: null,
	errorMessage: null
}

const store = createStore(
	reduser,
	initialState,
	applyMiddleware(thunk)
);

export default store;