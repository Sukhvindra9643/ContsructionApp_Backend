const express = require("express");
const { isAuthenticatedUser, authorizeRoles,authorizeSellerRoles } = require("../middleware/auth");
const {createService,getAllServices,getAllSellerServices,getAllAdminServices,getServiceDetails, deleteService, updateService} = require("../controllers/serviceController");
const router = express.Router();

// User routes
router.route("/getAllServices").get(isAuthenticatedUser,getAllServices);
router.route("/service/:id").get(isAuthenticatedUser, getServiceDetails);


// Admin routes
router.route("/admin/createservice").post(isAuthenticatedUser,authorizeRoles("admin"),createService);
router.route("/admin/getAllServices").get(isAuthenticatedUser,authorizeRoles("admin"),getAllAdminServices);
router
  .route("/admin/service/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getServiceDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);


// Seller routes
router.route("/seller/createservice").post(isAuthenticatedUser,authorizeSellerRoles("seller"),createService);
router.route("/seller/getAllSellerServices").get(isAuthenticatedUser,authorizeSellerRoles("seller"),getAllSellerServices);
router
  .route("/seller/service/:id")
  .get(isAuthenticatedUser, authorizeSellerRoles("seller"), getServiceDetails)
  .put(isAuthenticatedUser, authorizeSellerRoles("seller"), updateService)
  .delete(isAuthenticatedUser, authorizeSellerRoles("seller"), deleteService);

module.exports = router;