/* eslint-disable react/require-default-props */
import React from 'react';
import { bool, oneOf, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faTimesCircle,
  faCoffee,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faTimesCircle,
  faCoffee
);

// More information on Icons found here:
// https://github.com/FortAwesome/react-fontawesome#explicit-import

const Icon = ({
  border,
  icon,
  className,
  flip,
  inverse,
  pulse,
  rotation,
  size,
  spin,
}) => {
  return (
    <FontAwesomeIcon
      border={border}
      className={className}
      color="black"
      flip={flip}
      icon={icon}
      inverse={inverse}
      pulse={pulse}
      rotation={rotation}
      size={size}
      spin={spin}
    />
  );
};

Icon.propTypes = {
  /** Any additional classNames to specify on the element */
  border: bool,
  /** Any additional classNames to specify on the element */
  className: string,
  /** Change the flip direction of the icon - see below for a complete list */
  flip: oneOf(['horizontal', 'vertical', 'both']),
  /** The identifier of the icon - see below for a complete list */
  icon: string.isRequired,
  /** Use the inverse of an icon */
  inverse: bool,
  /** Animate the pulse of an icon */
  pulse: bool,
  /** Turn the direction of the icon - see below for a complete list */
  rotation: oneOf([90, 180, 270]),
  /** Size of the Icon */
  size: oneOf([
    'lg',
    'xs',
    'sm',
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
  ]),
  /** Animate the rotation of an icon */
  spin: bool,
};

Icon.defaultProps = {
  border: false,
  className: '',
  pulse: false,
  size: 'lg',
  spin: false,
};

export { Icon };
export default Icon;
