const express = require("express");
const router = express.Router();
const {createCategory,getAllCategories,deleteCategory,updateCategory,getCategories} = require("../controllers/categoryController.js");
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/createCategory").post(isAuthenticatedUser,createCategory);
router.route("/getAllCategories").get(getAllCategories);
router.route("/category/:id").get(getCategories);
router.route("/deleteCategory/:id").delete(isAuthenticatedUser,deleteCategory);
router.route("/updateCategory/:id").put(isAuthenticatedUser,updateCategory);

module.exports = router;