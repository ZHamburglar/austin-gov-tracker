import React from 'react';
import { bool, func, node, string } from 'prop-types';
import { animated, config, Transition } from 'react-spring';
import cx from 'classnames';

// import Icon from '../Icon';
import Portal from '../Portal';
import { ModalActionsType } from './ModalActions';

class Modal extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleOverlayClick = () => {
    if (this.props.disableOverlayClose) {
      return;
    }

    this.handleClose();
  };

  hasActions = () => {
    const { children } = this.props;

    const equalityPredicate = child => child && child.type === ModalActionsType;

    return React.Children.toArray(children).some(equalityPredicate);
  };

  render() {
    const { children, className, isVisible } = this.props;

    return (
      <Portal>
        <Transition
          native
          items={isVisible}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={{ ...config, duration: 300 }}
        >
          {toggle =>
            toggle &&
            (styles => (
              <animated.div
                className={cx({
                  modal: true,
                  'modal--has-actions': this.hasActions(),
                })}
                style={styles}
              >
                <div className={cx('modal__dialog', className)} style={styles}>
                  {/* <Icon
                    icon="close"
                    className="modal__close"
                    onClick={this.handleClose}
                  /> */}
                  <div className="modal__content">{children}</div>
                </div>
                <animated.div
                  className="overlay"
                  onClick={this.handleOverlayClick}
                  style={styles}
                />
              </animated.div>
            ))
          }
        </Transition>
      </Portal>
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
  isVisible: bool,
  /** Callback function executed when the drawer should be closed */
  onClose: func.isRequired,
};

Modal.defaultProps = {
  disableOverlayClose: false,
  isVisible: false,
};

export { Modal };
export default Modal;
