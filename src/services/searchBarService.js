import axios from "axios";

const serachBarService = {
  getSearchData: () => {
    return axios.get("http://dummy.restapiexample.com/api/v1/employees", {
      header: { "Content-Type": "application/json" }
    });
  }
};

export default serachBarService;
