const express = require("express");
const router = express.Router();

const {createServiceQuery,getMyServiceQuery,getSellerServiceQuery} = require("../controllers/serviceQueryController.js");
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/createservicequery").post(createServiceQuery);
router.route("/getmyservicequery").get(isAuthenticatedUser,getMyServiceQuery);
router.route("/getsellerservicequery").get(isAuthenticatedUser,getSellerServiceQuery);

module.exports = router;