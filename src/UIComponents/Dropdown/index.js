import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import PopperJS from 'popper.js';
import cx from 'classnames';
import { merge } from 'lodash';

import ClickOutside from '../ClickOutside';
import Portal from '../Portal';
import { safeInvoke } from '../utils';

class Dropdown extends React.Component {
  state = {
    isExpanded: false,
  };

  triggerRef = React.createRef();
  contentRef = React.createRef();

  initPopper = () => {
    const { popperOptions } = this.props;
    const popperDefaults = {
      placement: 'bottom-start',
      modifiers: {
        preventOverflow: {
          enabled: false,
        },
        arrow: {
          enabled: true,
        },
        hide: {
          enabled: false,
        },
      },
    };
    const combinedOptions = merge(popperDefaults, popperOptions || {});
    this.popperInstance = new PopperJS(
      this.triggerRef.current,
      this.contentRef.current,
      combinedOptions
    );
  };

  componentWillUnmount = () => {
    this.popperInstance && this.popperInstance.destroy();
  };

  collapse = e => {
    const { disabled, onCollapse } = this.props;
    !disabled &&
      this.setState({ isExpanded: false }, () => {
        safeInvoke(onCollapse, e);
      });
  };

  expand = e => {
    const { disabled, onExpand } = this.props;
    if (disabled) return;

    this.setState({ isExpanded: true }, () => {
      this.popperInstance.update();
      safeInvoke(onExpand, e);
    });
  };

  toggleExpansion = e => {
    const { disabled } = this.props;
    if (!disabled) {
      if (this.state.isExpanded) {
        this.collapse(e);
      } else {
        this.expand(e);
      }
    }
  };

  handleBlur = () => {
    if (this.props.closeOnBlur) {
      this.collapse();
    }
  };

  render() {
    const { className, content, disabled, trigger } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={cx('dropdown', className)}>
        <ClickOutside onClickOutside={this.handleBlur}>
          <div
            className="dropdown__trigger"
            onClick={this.toggleExpansion}
            ref={this.triggerRef}
          >
            {trigger(isExpanded, this.collapse, this.toggleExpansion)}
          </div>
          <Portal onMount={this.initPopper}>
            <div
              className={cx('dropdown__content', {
                'dropdown__content--expanded': !disabled ? isExpanded : false,
              })}
              ref={this.contentRef}
            >
              {content(isExpanded, this.collapse, this.toggleExpansion)}
            </div>
          </Portal>
        </ClickOutside>
      </div>
    );
  }
}

Dropdown.propTypes = {
  /** Additional classNames for the dropdown */
  className: string,
  /** Close the dropdown when blurring off the content */
  closeOnBlur: bool,
  /** Render prop for displaying the dropdown content */
  content: func,
  /** Disable the dropdown functionality */
  disabled: bool,
  /** Callback to execute when the dropdown is being collapsed */
  onCollapse: func,
  /** Callback to execute when the dropdown is being expanded */
  onExpand: func,
  /** Options object to modify or extend the popper instance */
  popperOptions: shape(),
  /** Render prop for dispalying the trigger of the dropdown */
  trigger: func,
};

Dropdown.defaultProps = {
  closeOnBlur: true,
  disabled: false,
};

export { Dropdown };
export default Dropdown;
