const express = require("express");
const router = express.Router();
const {createCategory,getAllCategories,deleteCategory,updateCategory} = require("../controllers/categoryController.js");
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/createCategory").post(isAuthenticatedUser,createCategory);
router.route("/getAllCategories").get(isAuthenticatedUser,getAllCategories);
router.route("/deleteCategory/:id").delete(isAuthenticatedUser,deleteCategory);
router.route("/updateCategory/:id").put(isAuthenticatedUser,updateCategory);

module.exports = router;