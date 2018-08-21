import axios from 'axios';

const STACK_OVERFLOW_API_URL = 'https://api.stackexchange.com/2.2';

export default {
	async getQuestionList(params) {
		const queryString = genQueryString({
			pagesize: 50,
			order: 'desc',
			sort: 'creation',
			site: 'stackoverflow',
			...params
		});
		return axios.get(`${STACK_OVERFLOW_API_URL}/questions?${queryString}`);
	},
	async getQuestionItem(question_id) {
		const queryString = genQueryString({
			site: 'stackoverflow',
			filter: 'withbody'
		})
		return axios.get(`${STACK_OVERFLOW_API_URL}/questions/${question_id}?${queryString}`);
	}
}

function genQueryString(obj) {
	return Object.keys(obj)
		.reduce((query, param) => {
			return query += `${param}=${obj[param]}&`;
		}, '')
}