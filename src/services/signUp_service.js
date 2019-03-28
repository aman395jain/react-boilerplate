import axios from "axios";

const signUpService = {
  postSignUp: signUpData => {
    return axios.post(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/users",
      {
        createdByUserId: Math.floor(Math.random() * 100),
        employeeId: parseInt(signUpData.empId),
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        organization: signUpData.organization,
        roleId: Math.floor(Math.random() * 100),
        userContactDTO: {
          address: signUpData.address.streetAddress,
          city: signUpData.address.city,
          continent: signUpData.address.continent,
          country: signUpData.address.country,
          emailId: signUpData.Email,
          phoneNo: signUpData.PhoneNumber,
          state: signUpData.address.state,
          zip: signUpData.address.zipCode
        },
        userId: Math.floor(Math.random() * 100)
      },
      {
        header: { "Content-Type": "application/json" }
      }
    );
  },

  getCountry: () => {
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/country",
      {
        header: { "Content-Type": "application/json" }
      }
    );
  },
  getStateAgainstCountry: countryId => {
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/state/{countryId}?countryId=" +
        countryId,
      {
        header: { "Content-Type": "application/json" }
      }
    );
  },
  getCityAgainstState: stateId => {
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/city/{stateId}?stateId=" +
        stateId,
      {
        header: { "Content-Type": "application/json" }
      }
    );
  }
};

export default signUpService;
