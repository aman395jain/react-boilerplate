import { GET_PROFILE } from "./../constants/constants";
import userProfileService from "../services/userProfileService";

export const userProfileAction = userProfile => dispatch => {
  userProfileService
    .getUserProfile()
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
