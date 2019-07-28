/**
 @copyright MIT License

 The MIT License (MIT)

Copyright (c) 2016-present, Vojtech Miksu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// https://github.com/tajo/react-portal/blob/master/src/Portal.js
// Modified to meet custom needs of this package.

import React from 'react';
import ReactDOM from 'react-dom';
import { any, node, func } from 'prop-types';

import { safeInvoke } from '../utils';

class Portal extends React.Component {
  static propTypes = {
    children: node.isRequired,
    node: any,
    onMount: func,
  };

  state = {
    canUseDOM: false,
  };

  componentDidMount() {
    this.setState({ canUseDOM: true }, () => {
      safeInvoke(this.props.onMount);
    });
  }

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }

    this.defaultNode = null;
  }

  render() {
    if (!this.state.canUseDOM) {
      return null;
    }

    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      this.defaultNode.className = 'portal';
      document.body.appendChild(this.defaultNode);
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode
    );
  }
}

export default Portal;
