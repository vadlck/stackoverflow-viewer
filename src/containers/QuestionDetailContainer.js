import React from 'react';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import QuestionDetail from '../components/QuestionDetail/QuestionDetail';
import { closeQuestionDetail } from '../store/actions';

const mapStateToProps = state => ({
	isOpen: !!state.detailedQuestion,
	children: React.createElement(QuestionDetail, state.detailedQuestion)
})

const mapDispatchToProps = dispatch => ({
	handleCloseModal: () => dispatch(closeQuestionDetail())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);