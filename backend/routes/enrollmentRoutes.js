const express = require("express");
const router = express.Router();
const {
  getEnrollments,
  createEnrollment,
  updateEnrollment
} = require("../controllers/enrollmentController");

router.route("/")
  .get(getEnrollments)
  .post(createEnrollment);

router.patch("/:id", updateEnrollment);

module.exports = router;
