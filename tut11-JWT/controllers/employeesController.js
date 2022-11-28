const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

// working fine
const getAllEmplpoyees = (req, res) => {
  res.json(data.employees);
};

// id is coming out wrong
// code alright
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  console.log(newEmployee);

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  console.log(employee);
  if (!employee) {
    return res.status(400).json({ message: "Employee not found " });
  }

  const updateEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  console.log(updateEmployee);

  if (updateEmployee.firstname) employee.firstname = updateEmployee.firstname;
  if (updateEmployee.lastname) employee.lastname = updateEmployee.lastname;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredArray, employee];
  // const sortedArray = unsortedArray.sort((a, b) =>
  //   a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  // );
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

/// employee not found
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(400).json({ message: "Employee not found " });
  }

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res.status(400).json({ message: "Employee not found " });
  }
  console.log(employee);
  res.json(employee);
};

module.exports = {
  getAllEmplpoyees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
