const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const usercontroller = require("../controllers/users.js");

router.route("/signup")
.get(usercontroller.renderSignupFrom )
.post(wrapAsync(usercontroller.signup)
);

router.route("/login")
.get(usercontroller.renderLoginForm ) 
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  usercontroller.login
);

                                                                                   

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  usercontroller.login
);

router.get("/logout", usercontroller.logout);

module.exports = router;
