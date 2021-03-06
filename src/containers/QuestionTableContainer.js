import React from 'react';
import { connect } from 'react-redux';
import QuestionTable from '../components/QuestionTable/QuestionTable';
import { fetchQuestions, openQuestionDetail } from '../store/actions';

const mapStateToProps = state => ({
	questions: state.questions,
	isLoading: state.isLoading,
	hasOpenedQuestionDetail: !!state.detailedQuestion
})

const mapDispatchToProps = dispatch => ({
	fetchQuestions: params => dispatch(fetchQuestions(params)),
	handleRowClick: question_id => dispatch(openQuestionDetail(question_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable);