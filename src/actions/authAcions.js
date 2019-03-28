import { userConstants } from "../constants/constants";
import { authService } from "../services/authService";
import { alertActions } from "./alertActions";
import { history } from "../helpers/history";
//import { alertActions } from './';
//import { history } from '../_helpers';

export const userAuthActions = {
  login,
  logout
  //getAll
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    authService.login(username, password).then(
      user => {
        console.log("login action called >>");
        dispatch(success(user));
        history.push("/HomePage");
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  authService.logout();
  return { type: userConstants.LOGOUT };
}

/*function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}*/
