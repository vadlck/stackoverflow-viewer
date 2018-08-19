import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import QuestionTableContainer from './containers/QuestionTableContainer';
import QuestionDetailContainer from './containers/QuestionDetailContainer';

function App({ errorMessage }) {
	if (errorMessage)
		return <h1>{errorMessage}</h1>

	return <Fragment>
		<QuestionTableContainer />
		<QuestionDetailContainer />
	</Fragment>
}

const mapStateToProps = state => ({
	errorMessage: state.errorMessage
})

export default connect(mapStateToProps)(App);