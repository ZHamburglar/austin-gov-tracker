import React from 'react';
import { node, string } from 'prop-types';
import cx from 'classnames';

const ModalActions = ({ children, className, ...props }) => {
  return (
    <div className={cx('modal__actions', className)} {...props}>
      {children}
    </div>
  );
};

ModalActions.propTypes = {
  /** Children, which should be Buttons and are required */
  children: node.isRequired,
  /** Any additional classNames to specify on the element */
  className: string,
};

// See https://github.com/gaearon/react-hot-loader#checking-element-types
const ModalActionsType = <ModalActions />.type;

export { ModalActions, ModalActionsType };
export default ModalActions;
