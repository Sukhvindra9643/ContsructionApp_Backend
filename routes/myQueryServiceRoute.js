const express = require("express");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {CreateQueryService,getAllQueryService,getMyQueryService} = require("../controllers/MyQueryServiceController");


router.route("/createservicecontact").post(isAuthenticatedUser,CreateQueryService);
router.route("/getAllServiceQuery").get(isAuthenticatedUser,getAllQueryService);
router.route("/myQueryService").get(isAuthenticatedUser,getMyQueryService)

module.exports = router;