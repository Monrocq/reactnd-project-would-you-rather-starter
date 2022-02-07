import {receiveUsers} from "./users"

// export function handleInitialData() {
//   return dispatch => {
//     return dispatch(receiveUsers([
//       "Adel",
//       "John",
//       "Sarah",
//       "Tyler"
//     ]));
//   }
// }

export function handleInitialData() {
  return receiveUsers([
    "Adel",
    "John",
    "Sarah",
    "Tyler"
  ])
  }