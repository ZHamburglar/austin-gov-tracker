import React, { memo } from 'react';
import { oneOf, string } from 'prop-types';
import cx from 'classnames';

const Card = ({ className, ...props }) => (
  <div className={cx('card', className)} {...props} />
);

const BorderedCard = ({ borderColor, borderPosition, className, ...props }) => (
  <div
    className={cx(
      'card-bordered',
      `card-bordered__${borderPosition}`,
      `border-${borderPosition}-${borderColor}`,
      className
    )}
    {...props}
  />
);

Card.Bordered = BorderedCard;

Card.propTypes = {
  /** Any additional classNames to specify on the element */
  className: string,
};

BorderedCard.propTypes = {
  /** Border color (see note for supported colors) */
  borderColor: string,
  /** Border position */
  borderPosition: oneOf(['left', 'top', 'right', 'bottom']),
  /** Any additional classNames to specify on the element */
  className: string,
};

BorderedCard.defaultProps = {
  borderColor: 'coral',
  borderPosition: 'left',
};

const MemoizedCard = memo(Card);

MemoizedCard.Bordered = BorderedCard;

export { Card };

export default MemoizedCard;
