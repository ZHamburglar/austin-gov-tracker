import React from 'react';
import { bool, func, node, string } from 'prop-types';
import Modal from 'react-modal';
import cx from 'classnames';
import Icon from '../Icon';
import styles from './style.scss';

const customStyles = {
  content: {
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class ModalComponent extends React.Component {
  requestClose = () => {
    const { onRequestClose } = this.props;
    onRequestClose();
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleOverlayClick = () => {
    const { disableOverlayClose } = this.props;
    if (disableOverlayClose) {
      return;
    }

    this.handleClose();
  };

  render() {
    const {
      children,
      className,
      onClose,
      isOpen,
      onAfterOpen,
      onRequestClose,
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        onClose={onClose}
        contentLabel="Example Modal"
        className={styles.modal}
      >
        <div className={cx(styles.modal__dialog, className)}>
          <div className={styles.modal__close} onClick={this.requestClose}>
            <Icon icon="times-circle" className={styles.modal__close_icon} />
          </div>
          <div className={styles.modal__content}>{children}</div>
        </div>
      </Modal>
    );
  }
}

Modal.propTypes = {
  /** Any node to be displayed as drawer content */
  children: node,
  /** Any additional classNames to specify on the element */
  className: string,
  /** Whether or not to disable the ability to close the modal by clicking the overlay */
  disableOverlayClose: bool,
  /** Whether or not the drawer is currently visible */
  isOpen: bool,
  /** Callback function executed when the drawer should be closed */
  onClose: func.isRequired,
};

ModalComponent.defaultProps = {
  disableOverlayClose: false,
  isOpen: false,
};

export { ModalComponent };
export default ModalComponent;
