const express = require("express");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {CreateQueryService, getAllQueryServices,getMyQueryServices,deleteMyQueryService,updateMyQueryService} = require("../controllers/queryServiceController");


router.route("/createqueryservice").post(isAuthenticatedUser,CreateQueryService);
router.route("/getAllQueryServices").get(getAllQueryServices);
router.route("/myqueryservices").get(isAuthenticatedUser,getMyQueryServices);
router.route("/deleteQueryService/:id").delete(deleteMyQueryService);
router.route("/updateQueryService/:id").put(updateMyQueryService)

module.exports = router;