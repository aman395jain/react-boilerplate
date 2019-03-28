import { SET_REGISTER } from "../constants/constants";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
