const utilities = require("../utilities/");

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  try {
    let nav = await utilities.getNav();
    
    res.render("account/login", {
      title: "Login",
      nav,
      messages: req.flash('info'),
    });
  } catch (error) {
    next(error); // send error to Express error handler
  }
}

module.exports = { buildLogin };
