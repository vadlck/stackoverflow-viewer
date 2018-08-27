import StackOverflowQuestions from '../services/StackOverflowQuestions';
import moment from 'moment';
import types from './types';

export function fetchQuestions() {
	return async (dispatch, getState) => {
		try {
			let {
				page,
				_dtLatestQuestionsLoad,
				_dtAfterStartAppQuestionsLoad
			} = getState();

			dispatch(updateState({ isLoading: true }));

			const [afterStartAppQuestionsResponse, latestQuestionsResponse] = await Promise.all([
				StackOverflowQuestions.getQuestionList({ todate: _dtAfterStartAppQuestionsLoad, page }),
				StackOverflowQuestions.getQuestionList({ fromdate: _dtLatestQuestionsLoad, page: 1 })
			]);

			const afterStartAppQuestions = afterStartAppQuestionsResponse.data.items;
			const latestQuestions = latestQuestionsResponse.data.items;

			let questions = [
				...latestQuestions.map(questionMapper),
				...afterStartAppQuestions.map(questionMapper)
			];

			if (latestQuestions.length)
				_dtLatestQuestionsLoad = latestQuestions[0].creation_date + 1;

			dispatch(updateState({
				isLoading: false,
				page: page + 1,
				_dtLatestQuestionsLoad
			}));

			dispatch(addQuestions(questions))

			function questionMapper(rawQuestion) {
				return {
					creation_date: moment.unix(rawQuestion.creation_date).format('DD MMMM, H:mm'),
					question_id: rawQuestion.question_id,
					title: rawQuestion.title,
					owner: rawQuestion.owner
				}
			}
		} catch (error) {
			dispatch(showError(JSON.stringify(error.response.data)))
		}
	}
}

export function openQuestionDetail(question_id) {
	return async dispatch => {
		try {
			const questionResponse = await StackOverflowQuestions.getQuestionItem(question_id);

			dispatch(updateState({
				openedQuestionDetail: questionResponse.data.items[0],
				isLoading: false
			}))
		} catch (error) {
			dispatch(showError(JSON.stringify(error.response.data)))
		}
	}
}

export function closeQuestionDetail() {
	return {
		type: types.CLOSE_QUESTION_DETAIL
	}
}

function addQuestions(questions) {
	return {
		type: types.ADD_QUESTIONS,
		payload: {
			questions
		}
	}
}

function showError(message) {
	return {
		type: types.SHOW_ERROR,
		payload: {
			errorMessage: message
		}
	}
}

function updateState(payload) {
	return {
		type: types.UPDATE_STATE,
		payload
	}
}