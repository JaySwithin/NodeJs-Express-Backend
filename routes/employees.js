const express = require("express");
const router = express.Router();
const { getAllEmployees, createEmployee } = require("../controllers/employees");
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)

module.exports = router;
