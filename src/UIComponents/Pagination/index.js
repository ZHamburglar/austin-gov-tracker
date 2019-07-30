import React from 'react';
import { arrayOf, func, number } from 'prop-types';
import cx from 'classnames';

import Card from '../Card';
import Dropdown from '../Dropdown';
import Icon from '../Icon';

class Pagination extends React.Component {
  handleNextClick = pageNum => {
    const { onPageChange, currentPage } = this.props;
    if (!this.disableNext()) {
      onPageChange(currentPage + 1);
    }
  };

  handlePrevClick = pageNum => {
    const { onPageChange, currentPage } = this.props;
    if (!this.disablePrev()) {
      onPageChange(currentPage - 1);
    }
  };

  handlePageSizeChange = size => {
    this.props.onPageSizeChange(size);
    this.dropdown.collapse();
  };

  disableNext = () => {
    const { currentPage, pageSize, totalItems } = this.props;
    return currentPage >= Math.ceil(totalItems / pageSize);
  };

  disablePrev = () => {
    const { currentPage } = this.props;
    return currentPage <= 1;
  };

  render() {
    const {
      currentPage,
      onPageChange,
      onPageSizeChange,
      totalItems,
      pageSize,
      sizeOptions,
      ...props
    } = this.props;
    const viewingMin = currentPage * pageSize - pageSize + 1;
    const totalAllowed = currentPage * pageSize;
    const viewingMax = totalAllowed <= totalItems ? totalAllowed : totalItems;

    return (
      <div className="pagination" {...props}>
        <div onClick={this.handlePrevClick}>
          <Icon
            className={cx('pagination__nav pagination__nav--prev', {
              'pagination__nav--disabled': this.disablePrev(),
            })}
            icon="arrow-alt-circle-left"
            size="lg"
          />
        </div>
        {onPageSizeChange ? (
          <Dropdown
            ref={node => {
              this.dropdown = node;
            }}
            trigger={() => (
              <div className="pagination__current pagination__current--expandable">
                Viewing {viewingMin}-{viewingMax}
              </div>
            )}
            content={() => (
              <Card>
                <div className="p-3">
                  {sizeOptions.map(size => {
                    return (
                      <div
                        className="pagination__size-option"
                        onClick={() => this.handlePageSizeChange(size)}
                        key={size}
                      >
                        Show {size}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
            popperOptions={{
              placement: 'bottom',
              modifiers: { offset: { offset: '0,5' } },
            }}
          />
        ) : (
          <div className="pagination__current">
            Viewing {viewingMin}-{viewingMax}
          </div>
        )}

        <span> of {totalItems}</span>
        <div onClick={this.handleNextClick}>
          <Icon
            className={cx('pagination__nav pagination__nav--next', {
              'pagination__nav--disabled': this.disableNext(),
            })}
            icon="arrow-alt-circle-right"
            size="lg"
          />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: number.isRequired,
  onPageChange: func.isRequired,
  onPageSizeChange: func,
  pageSize: number.isRequired,
  sizeOptions: arrayOf(number),
  totalItems: number.isRequired,
};

Pagination.defaultProps = {
  sizeOptions: [25, 50, 100],
};

export { Pagination };
export default Pagination;
