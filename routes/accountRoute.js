// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

//GET routes
// Route to render the login view
router.get("/", utilities.handleErrors(accountController.buildLogin));

// Also allow /login explicitly
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to render the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// POST route for registration with server-side validation
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;
