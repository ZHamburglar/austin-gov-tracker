/**
 * Import Dependencies
 */
import { combineReducers } from 'redux-immutable';

/**
 * Import Reducers
 * All Reducers must be declared here
 */
import CalculatorReducer from './modules/Calculator/reducer';


/**
 * Combine the Reducers
 */
const reducers = combineReducers({
    calculator: CalculatorReducer,
});

 /**
 * Export the combined Reducers
 */
export default reducers;