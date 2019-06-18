/**
 * Import Dependencies
 */
import { createSelector } from 'reselect';

/**
 * Select the portion of the root reducer
 */
export const CalculatorReducer = () => state => state.get('facebook');

/**
 * Get First Total
 *
 * @return {String}
 */
export const getFirstTotal = () =>
  createSelector(
    FacebookReducer(),
    state => {
      const d = state.get('ad_type');
      return !d || d.__altered == false ? d.toJS() : d;
    }
  );