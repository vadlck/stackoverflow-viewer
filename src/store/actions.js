import stackOverflowService from '../services/stackOverflowService';
import moment from 'moment';
import * as types from './types';

export function fetchQuestions() {
	return async (dispatch, getState) => {
		try {
			let { page, lastQuestionsLoadDateTime, firstQuestionsLoadDateTime } = getState();

			dispatch(updateState({ isLoading: true }));

			const { data } = await stackOverflowService
				.getQuestionList({ todate: firstQuestionsLoadDateTime, page });

			let questions = data.items.map(questionMapper);

			const latestQuestionsResponse = await stackOverflowService.getQuestionList({
				page: 1,
				fromdate: lastQuestionsLoadDateTime
			});

			if (latestQuestionsResponse.data.items.length) {
				lastQuestionsLoadDateTime = latestQuestionsResponse.data.items[0].creation_date + 1;
				questions = latestQuestionsResponse.data.items
					.map(questionMapper)
					.concat(questions)
			}

			dispatch(updateState({
				isLoading: false,
				page: page + 1,
				lastQuestionsLoadDateTime
			}))

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
			console.error(error);
			dispatch(showError(JSON.stringify(error.response.data)))
		}
	}
}

export function openQuestionDetailModal(question_id) {
	return async dispatch => {
		try {
			const { data } = await stackOverflowService.getQuestionItem(question_id);
			const question = data.items[0];

			dispatch(updateState({
				detailedQuestion: question,
				isLoading: false
			}))
		} catch (error) {
			console.error(error);
			dispatch(showError(JSON.stringify(error.response.data)))
		}
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

export function closeQuestionDetail() {
	return {
		type: types.CLOSE_QUESTION_DETAIL
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