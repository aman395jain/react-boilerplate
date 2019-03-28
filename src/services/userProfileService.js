import axios from "axios";

const userProfileService = {
  getUserProfile: () => {
    return axios.get(
      "http://ec2-35-153-131-42.compute-1.amazonaws.com:8080/usermgmt/users/43"
    );
  }
};

export default userProfileService;
