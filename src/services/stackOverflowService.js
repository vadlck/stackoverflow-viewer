import axios from 'axios';
import genQueryString from '../utils/getQueryString';

class StackOverflowService {
	apiUrl = 'https://api.stackexchange.com/2.2'

	async getQuestionList(params) {
		const queryString = genQueryString({
			pagesize: 50,
			order: 'desc',
			sort: 'creation',
			site: 'stackoverflow',
			...params
		});

		return axios.get(`${this.apiUrl}/questions?${queryString}`);
	}

	async getQuestionItem(question_id) {
		return axios.get(`${this.apiUrl}/questions/${question_id}?site=stackoverflow&filter=withbody`);
	}

	
}

export default new StackOverflowService();