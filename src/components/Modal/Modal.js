import React, { Component } from 'react';
import getClassName from '../../utils/getClassName';

class Modal extends Component {
	render() {
		const { children, isOpen } = this.props;
		const className = getClassName('modal-wrapper', { 'is-open': isOpen });

		return <div className={className}>
			<div className="modal-content">
				{children}
				<div className="modal-close-btn">
					<span onClick={this.props.handleCloseModal}>Закрыть</span>
				</div>
			</div>
			<div className="modal-backdrop" onClick={this.props.handleCloseModal} />
		</div>
	}
}

export default Modal;