// utilities/inventory-validation.js
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/* ***************************
 *  Classification Data Validation Rules
 * ************************** */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters.")
  ]
}

/* ***************************
 *  Check classification data and return errors or continue
 * ************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/* ***************************
 *  Inventory Data Validation Rules
 * ************************** */
validate.inventoryRules = () => {
  return [
    // Make is required and must be string
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a make with at least 3 characters."),

    // Model is required and must be string
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a model with at least 3 characters."),

    // Year is required and must be 4 digits
    body("inv_year")
      .trim()
      .isLength({ min: 4, max: 4 })
      .withMessage("Year must be a 4-digit number.")
      .isNumeric()
      .withMessage("Year must be a number."),

    // Description is required
    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    // Image path is required
    body("inv_image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an image path."),

    // Thumbnail path is required
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a thumbnail path."),

    // Price is required and must be number
    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Price must be a number.")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    // Miles is required and must be number
    body("inv_miles")
      .trim()
      .isNumeric()
      .withMessage("Miles must be a number.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer."),

    // Color is required
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),

    // Classification is required
    body("classification_id")
      .trim()
      .isNumeric()
      .withMessage("Please select a classification.")
  ]
}

/* ***************************
 *  Check inventory data and return errors or continue
 * ************************** */
validate.checkInventoryData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

module.exports = validate