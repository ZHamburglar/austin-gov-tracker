import React from 'react';
import { string } from 'prop-types';
import cx from 'classnames';

const Divider = ({ className, margin, ...props }) => {
  return <div className={cx('divider', margin, className)} {...props} />;
};

Divider.propTypes = {
  /** Any additional classNames to specify on the element */
  className: string,
  /** Margin utility helper class (e.g. my-3) */
  margin: string,
};

Divider.defaultProps = {
  className: '',
  margin: 'my-2',
};

export { Divider };
export default Divider;
