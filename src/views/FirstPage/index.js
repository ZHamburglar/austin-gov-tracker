import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { func, number } from 'prop-types';
import { addFirstTotal, subFirstTotal, addSecondTotal, subSecondTotal } from '@modules/Calculator/actions';
import { getFirstTotal, getSecondTotal } from '@modules/Calculator/selectors';

import styles from './style.scss';
// Let me tell you about the other guys

class FirstPage extends Component {
  render() {
    const { first_total, second_total } = this.props;
    return (
      <div>
        <p>First Page here</p>
        <div className={styles.localcolor}>This is local text.</div>
        <div className="global-text">This is the global text</div>
        <div className="pb-2">
          <div className="d-inline-block">
            <button onClick={() => this.props.addFirstTotal()}>Add +</button>
          </div>
          <div className="d-inline-block px-2 text-hover-red">First Total: {first_total}</div>
          <div className="d-inline-block">
            <button onClick={() => this.props.subFirstTotal()}>Sub -</button>
          </div>
        </div>
        <div className="pb-1">
          <div className="d-inline-block">
            <button onClick={() => this.props.addSecondTotal()}>Add +</button>
          </div>
          <div className="d-inline-block px-2 text-hover-blue">Second Total: {second_total}</div>
          <div className="d-inline-block">
            <button onClick={() => this.props.subSecondTotal()}>Sub -</button>
          </div>
        </div>
        
        
      </div>
    );
  }
}

/**
 * Define component props
 */
FirstPage.propTypes = {
  addFirstTotal: func.isRequired,
  addSecondTotal: func.isRequired,
  first_total: number.isRequired,
  second_total: number.isRequired,
  subFirstTotal: func.isRequired,
  subSecondTotal: func.isRequired,
};

/**
 * Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  first_total: getFirstTotal(),
  second_total: getSecondTotal(),
});

/**
 * Export the component
 */
export default connect(
  mapStateToProps, 
  { 
    addFirstTotal, 
    subFirstTotal, 
    addSecondTotal, 
    subSecondTotal
  }
)(FirstPage);