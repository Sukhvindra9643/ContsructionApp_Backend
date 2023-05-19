const express = require("express");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {CreateContact, getAllContact,getMyContact} = require("../controllers/MaterialContactController");


router.route("/createcontact").post(isAuthenticatedUser,CreateContact);
router.route("/getAllContact").get(isAuthenticatedUser,getAllContact);
router.route("/mycontact").get(isAuthenticatedUser,getMyContact)

module.exports = router;