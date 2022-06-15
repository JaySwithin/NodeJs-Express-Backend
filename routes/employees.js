const express = require("express");
const router = express.Router();
const { getAllEmployees, createEmployee } = require("../controllers/employees");

router.route("/")
  .get(getAllEmployees)
  .post(createEmployee)

module.exports = router;
