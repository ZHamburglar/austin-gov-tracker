import React from 'react';
import { bool, oneOf, string } from 'prop-types';
import cx from 'classnames';

const Icon = ({ icon, className, size, spin, ...props }) => {
  return (
    <span
      className={cx({
        icon: true,
        [`icon--${icon}`]: true,
        [`icon--${size}`]: true,
        'icon--spin': spin,
        [className]: className,
      })}
      {...props}
    />
  );
};

Icon.propTypes = {
  /** Any additional classNames to specify on the element */
  className: string,
  /** The identifier of the icon - see below for a complete list */
  icon: string.isRequired,
  /** Size of the avatar */
  size: oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  /** Animate the rotation of an icon */
  spin: bool,
};

Icon.defaultProps = {
  size: 'medium',
  spin: false,
};

export { Icon };
export default Icon;
