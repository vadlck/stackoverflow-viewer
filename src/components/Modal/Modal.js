import React, { Component } from 'react';
import getClassName from '../../utils/getClassName';

class Modal extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.isOpen)
			document.body.classList.add('overflow-hidden');
		else
			document.body.classList.remove('overflow-hidden');
	}

	render() {
		const { children, isOpen } = this.props;
		const className = getClassName('modal-wrapper', { 'is-open': isOpen });

		return <div className={className}>
			<div className="modal-content">
				{children}
				<div className="modal-close-btn">
					<a href="#0" onClick={this.props.handleCloseModal}>Закрыть</a>
				</div>
			</div>
			<div className="modal-backdrop" onClick={this.props.handleCloseModal} />
		</div>
	}
}

export default Modal;