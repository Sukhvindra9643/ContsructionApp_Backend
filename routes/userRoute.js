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
  addServices,
  Verify
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify").post(Verify);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/allsellers").get(getAllSellers);
router.route("/addservices").post(isAuthenticatedUser,addServices);

// Admin Routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
