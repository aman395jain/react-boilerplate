import { GET_PROFILE } from "../constants/constants";

const initialState = { userProfileData: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        userProfileData: action.payload
      };
    default:
      return state;
  }
}
