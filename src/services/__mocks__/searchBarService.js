const fakedata = [
  {
    id: 1234,
    employee_name: "test",
    employee_salary: 111111,
    employee_age: 25,
    profile_image: ""
  },
  {
    id: 123456,
    employee_name: "aman",
    employee_salary: 222222,
    employee_age: 28,
    profile_image: ""
  }
];

const serachBarService = {
  getSearchData: () => {
    return new Promise(resolve => {
      resolve(fakedata);
    });
  }
};

export default serachBarService;
