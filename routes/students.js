// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let StudentController = require("../controllers/student");

// POST methods
router.post("/student-login", StudentController.loginAccount);

module.exports = router;