import {
    SET_FIRST_TOTAL,
    ADD_FIRST_TOTAL,
    SUB_FIRST_TOTAL,
    SET_SECOND_TOTAL,
    ADD_SECOND_TOTAL,
    SUB_SECOND_TOTAL,
} from './constants';

/**
 * Increase First Total
 *
 * @param {Number} data
 */
export const addFirstTotal = data => {
    return (dispatch, getState) => {
      const first = getState().get('calculator').toJS().first_total;
      const first_added = first + 1;
      dispatch(setFirstTotal(first_added));
    }
};

/**
 * Decrease First Total
 *
 * @param {Number} data
 */
export const subFirstTotal = data => {
  return (dispatch, getState) => {
    const first = getState().get('calculator').toJS().first_total;
    const first_subtracted = first - 1;
    dispatch(setFirstTotal(first_subtracted));
  }
};

/**
 * Set First Total
 *
 * @param {Number} data
 */
export const setFirstTotal = data => {
    return { type: SET_FIRST_TOTAL, data };
};

/**
 * Increase Second Total
 *
 * @param {Number} data
 */
export const addSecondTotal = data => {
  return (dispatch, getState) => {
    const second = getState().get('calculator').toJS().second_total;
    const second_added = second + 1;
    dispatch(setSecondTotal(second_added));
  }
};

/**
 * Decrease Second Total
 *
 * @param {Number} data
 */
export const subSecondTotal = data => {
  return (dispatch, getState) => {
    const second = getState().get('calculator').toJS().second_total;
    const second_subtracted = second -1;
    dispatch(setSecondTotal(second_subtracted));
  }
};

/**
 * Set Second Total
 *
 * @param {Number} data
 */
export const setSecondTotal = data => {
    return { type: SET_SECOND_TOTAL, data };
};
