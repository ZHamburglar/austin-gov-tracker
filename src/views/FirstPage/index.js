import React, { Component } from "react";

import styles from './style.css';
// Let me tell you about the other guys

class FirstPage extends Component {
  render() {
    return (
      <div>First Page here<div className={styles.localcolor}>This is local text.</div><div className="global-text">This is the global text</div></div>
    );
  }
}
export default FirstPage;