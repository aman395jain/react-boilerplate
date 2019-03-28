import { USER_DASHBOARD } from "../constants/constants";

const initialState = {
  usersData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_DASHBOARD:
      return { ...state, usersData: action.payload };
    default:
      return state;
  }
}
