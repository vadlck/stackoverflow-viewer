import React, { Component, Fragment } from 'react';
import QuestionTableRow from './QuestionTableRow/QuestionTableRow';
import Spinner from '../Spinner/Spinner';

class QuestionTable extends Component {
	state = {
		scrollTop: 0
	}

	componentDidMount() {
		this.props.fetchQuestions();
		window.addEventListener('keydown', this.handleKeyPress)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress)
	}

	componentWillUpdate(nextProps, nextState) {
		this.refs.scrollable.scrollTop = nextState.scrollTop;
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.hasOpenedQuestionDetail === this.props.hasOpenedQuestionDetail;
	}

	onScroll = () => {
		const { scrollHeight, clientHeight, scrollTop } = this.refs.scrollable;
		const { isLoading } = this.props;

		if (!isLoading && (scrollTop + clientHeight >= scrollHeight - 400)) {
			this.props.fetchQuestions();
			this.setState({
				scrollTop: scrollTop
			})
		}
	}

	renderTableContent() {
		const { isLoading, questions } = this.props;

		return <Fragment>
			{questions.map(question => <QuestionTableRow key={question.question_id} {...question} />)}
			<Spinner isShown={isLoading} />
		</Fragment>
	}

	handleBodyClick = ({ target }) => {
		let parentsCount = 3;

		while (!(target.dataset && target.dataset.id) || !parentsCount--)
			target = target.parentElement;

		if (target.dataset.id)
			this.props.handleRowClick(target.dataset.id);
	}

	handleKeyPress = event => {
		if (event.keyCode === 34)
			this.refs.scrollable.scrollTop = this.refs.scrollable.scrollHeight;
	}

	render() {
		return <div className="question-table" >
			<div className="question-table__header">
				<div className="question-table__header-item">Автор</div>
				<div className="question-table__header-item">Заголовок</div>
				<div className="question-table__header-item">Дата создания</div>
			</div>
			<div className="question-table__body"
				ref="scrollable"
				onScroll={this.onScroll}
				onClick={this.handleBodyClick}>
				{this.renderTableContent()}
			</div>
		</div>
	}
}

export default QuestionTable;