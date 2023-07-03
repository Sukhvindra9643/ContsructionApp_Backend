const express = require("express");
const router = express.Router();

const {createServiceQuery,getMyServiceQuery,getSellerServiceQuery} = require("../controllers/ServiceBookingController.js");
const { isAuthenticatedUser} = require("../middleware/auth.js");

router.route("/createservicequery").post(createServiceQuery);
router.route("/getmyservicequery").get(isAuthenticatedUser,getMyServiceQuery);
router.route("/getsellerservicequery").get(isAuthenticatedUser,getSellerServiceQuery);

module.exports = router;