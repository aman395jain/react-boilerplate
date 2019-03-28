// import { SET_REGISTER } from "../actions/types";

// const initialState = { isAuthentication: false, regData: {} };

// export default function(state = initialState, action) {
//   // console.log("reducers", action.type);
//   switch (action.type) {
//     case SET_REGISTER:
//       return action.payload;
//     default:
//       return state;
//   }
// }
import { userConstants } from "../constants/constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  //console.log("auth reducer called with action >>", action);
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
