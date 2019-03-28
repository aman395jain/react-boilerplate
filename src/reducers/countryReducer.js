import { SET_REGISTER_COUNTRY } from "../constants/constants";

const initialState = { regCountry: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_COUNTRY:
      return { regCountryData: action.payload };

    default:
      return state;
  }
}
