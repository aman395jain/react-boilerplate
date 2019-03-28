// import axios from "axios";
import { USER_DASHBOARD } from "./../constants/constants";
import usersData from "../data/tableData.json";

// Get All Users
export const getAllUsers = callBack => dispatch => {
  return dispatch({
    type: USER_DASHBOARD,
    payload: usersData
  });

  // axios
  //   .get(
  //     "http://ec2-35-153-131-42.compute-1.amazonaws.com:8080/usermgmt/getAllUsers"
  //   )
  //   .then(res => {
  //     console.log(res.data);
  // return dispatch({
  //   type: USER_DASHBOARD,
  //   payload: res.data
  // });
  //   })
  //   .catch(err => {
  //     console.log("err", err);
  //   });
};
