import { combineReducers } from "redux";
import { authentication } from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import userReducer from "./dashboardReducer";
import countryReducer from "./countryReducer";
import stateReducer from "./stateReducer";
import registrationUser from "./registrationReducer";
import { alert } from "./alertReducer";

const rootReducer = combineReducers({
  authentication: authentication,
  userDashboard: userReducer,
  userProfile: userProfileReducer,
  regCountry: countryReducer,
  regUser: registrationUser,
  regState: stateReducer,
  alert
});

export default rootReducer;
