import axios from "axios";

export const authService = {
  login: () => {
    // return axios.get(
    //   "http://ec2-35-153-131-42.compute-1.amazonaws.com:8080/usermgmt/users/43"
    // );
    return new Promise((resolve, reject) => {
      console.log("User service called >>>>>>>>");
      let user = {
        id: 1,
        username: "Ravish123",
        firstName: "Ravi",
        lastName: "Sharma",
        token: "fake-jwt-token"
      };
      localStorage.setItem("user", JSON.stringify(user));
      resolve(user);
    });
  },
  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
  }
};
