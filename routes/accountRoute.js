// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");

//GET routes
// Route to render the login view
router.get("/", utilities.handleErrors(accountController.buildLogin));

// Also allow /login explicitly
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to render the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// POST route
router.post("/register", utilities.handleErrors(accountController.registerAccount));

module.exports = router;
