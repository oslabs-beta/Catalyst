import * as types from '../constants/actionTypes';


// interface IncrementAction {
//   type: typeof Increment_COUNTER
// };

// interface DecrementAction {
//   type: typeof DECREMENT_COUNTER
// };

// export type ActionTypes = IncrementAction | DecrementAction
//  */

 
export const SetAge = (incomingAge: any) => ({
    type: types.INCREMENT_COUNTER,
    payload :incomingAge
})
