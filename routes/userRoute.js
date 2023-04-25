const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  deleteUser,
  getAllSellers,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// Admin Routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/allsellers")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllSellers);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
