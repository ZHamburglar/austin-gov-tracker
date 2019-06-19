/**
 * Import Dependencies
 */
import { createSelector } from 'reselect';

/**
 * Select the portion of the root reducer
 */
export const CalculatorReducer = () => state => state.get('calculator');

/**
 * Get First Total
 *
 * @return {String}
 */
export const getFirstTotal = () =>
  createSelector(
    CalculatorReducer(),
    state => {
      const d = state.get('first_total');
      return !d || d.__altered == false ? d : d;
    }
  );

/**
 * Get Second Total
 *
 * @return {String}
 */
export const getSecondTotal = () =>
createSelector(
  CalculatorReducer(),
  state => {
    const d = state.get('second_total');
    return !d || d.__altered == false ? d : d;
  }
);