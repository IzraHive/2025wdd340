const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const validate = require("../utilities/inventory-validation")
const utilities = require("../utilities/")

// Management View
router.get("/", utilities.handleErrors(invController.buildManagement))

// Add Classification
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add Inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router
