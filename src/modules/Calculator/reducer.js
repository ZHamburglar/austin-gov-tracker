/**
 * Import Dependencies
 */
import { fromJS } from 'immutable';
import { SET_FIRST_TOTAL, SET_SECOND_TOTAL } from './constants';

/**
 * Set Initial State
 */
export const initialState = fromJS({
    first_total: 0,
    second_total: 0,
});

/**
 * Define the reducer with actions
 *
 * @param {Object} state
 * @param {Object} action
 */
function CalculatorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FIRST_TOTAL:
      if (!action.data) action.data = initialState.get('first_total');
      return state.set('first_total', action.data);

    case SET_SECOND_TOTAL:
      if (!action.data) action.data = initialState.get('second_total');
      return state.set('second_total', action.data);

    default:
      return state;
  }
}

/**
 * Export the reducer
 */
export default CalculatorReducer;