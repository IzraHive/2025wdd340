const pool = require("../database/")

// Get all classifications
async function getClassifications() {
  const data = await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
  return data
}

// Get inventory items by classification ID
async function getInventoryByClassificationId(classification_id) {
  const data = await pool.query(
    `SELECT * FROM public.inventory AS i
     JOIN public.classification AS c
     ON i.classification_id = c.classification_id
     WHERE i.classification_id = $1`,
    [classification_id]
  )
  return data.rows
}

// Get inventory item by ID
async function getInventoryById(inv_id) {
  const data = await pool.query(
    `SELECT * FROM public.inventory WHERE inv_id = $1`,
    [inv_id]
  )
  return data.rows[0]
}

// Add new classification
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    const result = await pool.query(sql, [classification_name])
    return result
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("This classification already exists")
    }
    throw error
  }
}

// Add new inventory item
async function addInventory(
  inv_make, inv_model, inv_year, inv_description,
  inv_image, inv_thumbnail, inv_price, inv_miles,
  inv_color, classification_id
) {
  const sql = `INSERT INTO inventory 
    (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`
  const result = await pool.query(sql, [
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id
  ])
  return result
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
  addInventory,
  addClassification
}
