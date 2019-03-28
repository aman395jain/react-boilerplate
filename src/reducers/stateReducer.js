import { SET_REGISTER_STATE } from "../constants/constants";

const initialState = { regState: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_STATE:
      return { regStateData: action.payload };
    default:
      return state;
  }
}
