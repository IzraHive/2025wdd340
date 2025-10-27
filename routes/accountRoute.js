// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");

// Route to render the login view
router.get("/", utilities.handleErrors(accountController.buildLogin));

// Also allow /login explicitly
router.get("/login", utilities.handleErrors(accountController.buildLogin));

module.exports = router;
