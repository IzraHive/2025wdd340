const invModel = require("../models/inventory-model")
const Util = {};

Util.getNav = async function () {
  try {
    const data = await invModel.getClassifications();
    let list = "<ul>";
    list += '<li><a href="/">Home</a></li>';

    if (data?.rows?.length) {
      data.rows.forEach(row => {
        list += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`;
      });
    }

    list += "</ul>";
    return list;
  } catch (error) {
    console.error("getNav error:", error);
    // Return static fallback nav so login page doesn't crash
    return '<ul><li><a href="/">Home</a></li></ul>';
  }
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="/inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the detail view HTML
* ************************************ */
Util.buildDetailView = async function(data){
  let detail
  if(data){
    detail = `
      <div class="vehicle-detail">
        <img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model}">
        <div class="vehicle-info">
          <h2>${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
          <p class="price">Price: $${new Intl.NumberFormat('en-US').format(data.inv_price)}</p>
          <p class="description">${data.inv_description}</p>
          <ul class="vehicle-specs">
            <li><strong>Mileage:</strong> ${new Intl.NumberFormat('en-US').format(data.inv_miles)} miles</li>
            <li><strong>Color:</strong> ${data.inv_color}</li>
          </ul>
        </div>
      </div>
    `
  } else {
    detail = '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  return detail
}

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util