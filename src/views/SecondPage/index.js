import React, { Component } from "react";
import styles from './style.css';

class SecondPage extends Component {
  render() {
    return (
      <div>Second Page here<div className="global-text">This is the global text</div><p className={styles.localtext}>This is also local text.</p></div>
    );
  }
}
export default SecondPage;