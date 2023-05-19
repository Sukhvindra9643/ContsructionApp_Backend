const express = require("express");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {CreateQuery, getAllQueries,getMyQueries} = require("../controllers/materialQueryController");


router.route("/createquery").post(isAuthenticatedUser,CreateQuery);
router.route("/getAllQueries").get(isAuthenticatedUser,getAllQueries);
router.route("/myqueries").get(isAuthenticatedUser,getMyQueries)

module.exports = router;