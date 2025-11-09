const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

// ------------------ Management View ------------------
invCont.buildManagement = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

// ------------------ Add Classification View ------------------
invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    classification_name: ''
  })
}

// ------------------ Process Add Classification ------------------
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  let nav = []

  try {
    nav = await utilities.getNav()
  } catch (err) {
    console.error("getNav failed:", err)
    nav = [] // fallback so page still renders
  }

  // Server-side validation
  if (!classification_name || !/^[A-Za-z0-9]+$/.test(classification_name)) {
    return res.status(400).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: [{ msg: "Classification name is required and cannot contain spaces or special characters" }],
      classification_name
    })
  }

  try {
    const result = await invModel.addClassification(classification_name)
    if (result?.rowCount > 0) {
      req.flash("notice", `Congratulations, ${classification_name} was successfully added.`)

      // rebuild nav again safely
      try { nav = await utilities.getNav() } catch (err) { console.error(err); nav = [] }

      return res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null
      })
    }
  } catch (error) {
    console.error("Add Classification Error:", error)
    return res.status(500).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: [{ msg: error.message }],
      classification_name
    })
  }
}


// ------------------ Add Inventory View ------------------
invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
  })
}

// ------------------ Process Add Inventory ------------------
invCont.addInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const {
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id
  } = req.body

  try {
    const result = await invModel.addInventory(
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    )

    if (result?.rowCount > 0) {
      req.flash("notice", `Congratulations, the ${inv_make} ${inv_model} was successfully added.`)
      return res.status(201).render("inventory/management", { title: "Vehicle Management", nav, errors: null })
    }
  } catch (error) {
    console.error("Add inventory error:", error)
    const classificationList = await utilities.buildClassificationList(classification_id)
    return res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: [{ msg: error.message }],
      // sticky inputs
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    })
  }
}

module.exports = invCont
