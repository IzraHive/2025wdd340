const express = require("express")
const router = new express.Router()
const baseController = require("../controllers/baseController")
const utilities = require("../utilities/")

// Home route
router.get("/", utilities.handleErrors(baseController.buildHome))

// Intentional error route for testing
router.get("/trigger-error", utilities.handleErrors(baseController.buildError))

module.exports = router