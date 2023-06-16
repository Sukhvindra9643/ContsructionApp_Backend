const express = require("express");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");
const {CreateQuery, getAllQueries,getMyQueries,deleteMyQuery,updateMyQuery} = require("../controllers/materialQueryController");


router.route("/createquery").post(isAuthenticatedUser,CreateQuery);
router.route("/getAllQueries").get(getAllQueries);
router.route("/myqueries").get(isAuthenticatedUser,getMyQueries)
router.route("/deleteMaterialQuery/:id").delete(deleteMyQuery)
router.route("/updateMaterialQuery/:id").put(updateMyQuery)

module.exports = router;