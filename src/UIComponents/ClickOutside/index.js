import React, { Component } from 'react';
import { func, node } from 'prop-types';

class ClickOutside extends Component {
  containerRef = React.createRef();
  isTouch = false;

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  handle = e => {
    if (e.type === 'touchend') this.isTouch = true;
    if (e.type === 'click' && this.isTouch) return;
    const { onClickOutside } = this.props;
    const el = this.containerRef.current;
    if (!el.contains(e.target)) onClickOutside(e);
  };

  render() {
    const { children, onClickOutside, ...props } = this.props;

    return (
      <div
        {...props}
        style={{ display: 'contents', ...(props.style ? props.style : {}) }}
        ref={this.containerRef}
      >
        {children}
      </div>
    );
  }
}

ClickOutside.propTypes = {
  /** Children to be excluded from the outside detection */
  children: node,
  /** Callback to be executed when a click outside is detected */
  onClickOutside: func.isRequired,
};

export { ClickOutside };
export default ClickOutside;
