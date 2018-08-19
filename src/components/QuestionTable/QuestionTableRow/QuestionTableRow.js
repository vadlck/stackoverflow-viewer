import React from 'react';

function QuestionTableRow({ owner, title, creation_date, question_id }) {
	return <div className="question-table__row" data-id={question_id}>
		<div className="question-table__cell" dangerouslySetInnerHTML={{ __html: owner.display_name }} />
		<div className="question-table__cell" dangerouslySetInnerHTML={{ __html: title }} />
		<div className="question-table__cell">{creation_date}</div>
	</div>
}

export default QuestionTableRow;