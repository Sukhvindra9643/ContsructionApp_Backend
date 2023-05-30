const express = require("express");
const { isAuthenticatedUser} = require("../middleware/auth");
const {processPayment,paymentVerify} = require("../controllers/paymentcontroller.js");
const router = express.Router();

router.route("/pay").post(processPayment);
router.route("/stripe").post(isAuthenticatedUser,paymentVerify);



module.exports = router;
