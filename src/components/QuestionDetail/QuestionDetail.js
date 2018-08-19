import React from 'react';

function QuestionDetail({ body, link }) {
	return <div className="question-detail">
		<div className="question-detail__question-link">
			<a target="_blank" href={link}>Открыть оригинал</a>
		</div>
		<div dangerouslySetInnerHTML={{ __html: body }} />
		<div>{link}</div>
	</div>
}

export default QuestionDetail;