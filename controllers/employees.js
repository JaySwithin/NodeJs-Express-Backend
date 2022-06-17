const Employee = require("./../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ "message": "First and last name are required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ "message": "ID is required" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if(!employee) {
    return res.status(204).json({ "message": `Employee ID ${req.body.id} doesn't exist.` });
  }

  if(req?.body?.firstname) employee.firstname === req.body.firstname;
  if(req?.body?.firstname) employee.firstname === req.body.firstname;

  const result = await employee.save();
  console.log(result);
}

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ "message": "ID is required" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if(!employee) {
    return res.status(204).json({ "message": `Employee ID ${req.body.id} doesn't exist.` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  console.log(result);
}

const getEmployeeById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ "message": "ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if(!employee) {
    return res.status(204).json({ "message": `Employee ID ${req.params.id} doesn't exist.` });
  }
  res.json(employee)
}

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById };
