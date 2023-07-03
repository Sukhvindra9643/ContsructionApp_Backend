const express = require("express");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const {createService,getAllServices,getServiceDetails, deleteService, updateService} = require("../controllers/OtherServiceCreateController");
const router = express.Router();

// User routes
router.route("/getAllServices").get(isAuthenticatedUser,getAllServices);
router.route("/service/:id").get(isAuthenticatedUser, getServiceDetails);


// Admin routes
router.route("/admin/createservice").post(isAuthenticatedUser,authorizeRoles("admin"),createService);
router
  .route("/admin/service/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getServiceDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

module.exports = router;