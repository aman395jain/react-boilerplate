import { SET_REGISTER } from "./../constants/constants";
import signUpService from "../services/signUp_service";

// Register User
// export const registerUser = userData => dispatch => {
//   console.log("in the action", userData.address.country);
//   function registration() {
//     console.log("in the registration ");
//   }
//   signUpService
//     .postSignUp(userData)
//     .then(res => {
//       console.log("in the sign up action", res);
//       dispatch({
//         type: SET_REGISTER,
//         payload: {
//           userData: { ...userData, postStatus: res.status }
//         }
//       });
//     })
//     .catch(err => {
//       console.log("in err", err.response.status);
//       dispatch({
//         type: SET_REGISTER,
//         payload: {
//           userData: { ...userData, postStatus: err.response.status }
//         }
//       });
//     });
// };

export const registerUser = {
  register
};

function register(regData) {
  return dispatch => {
    console.log("in the register1111");
    dispatch(regUser(regData));
  };
}

function regUser(reg) {
  return {
    type: "SET_REGISTER",
    payload: reg
  };
}

//get country

// export const countryData = userData => dispatch => {
//   signUpService.getCountry().then(res => {
//     dispatch({
//       type: SET_REGISTER,
//       payload: {
//         userData: {
//           ...userData,
//           country: res.data
//         }
//       }
//     });
//   });
// };
