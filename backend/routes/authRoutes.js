const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/authValidation");
const loginLimiter = require("../middleware/loginLimiter");

router.post("/register", validateRegistration, authController.register);
router.post("/login", loginLimiter, validateLogin, authController.login);

module.exports = router;