import * as types from '../store/types';

export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case types.UPDATE_STATE:
			return { ...state, ...action.payload }

		case types.CLOSE_QUESTION_DETAIL:
			return { ...state, detailedQuestion: null }

		case types.ADD_QUESTIONS:
			return {
				...state,
				questions: [
					...state.questions,
					...action.payload.questions
				]
			}

		default:
			return state;
	}
}