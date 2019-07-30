import React from 'react';
import { string } from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

const ModalTitle = ({ className, ...props }) => {
  return <div className={cx(styles.modal__title, className)} {...props} />;
};

ModalTitle.propTypes = {
  /** Any additional classNames to specify on the element */
  className: string,
};

export { ModalTitle };
export default ModalTitle;
