// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let OrganizationController = require("../controllers/organization");

// POST methods
router.post("/add-orgnization",auth.apiKeyAuth,  OrganizationController.addOrg);
router.post("/org-login", OrganizationController.loginAccount);
router.post("/add-student",auth.apiKeyAuth, OrganizationController.addstudents);
router.get("/fetch-student",auth.apiKeyAuth, OrganizationController.fetchstudent);


module.exports = router;