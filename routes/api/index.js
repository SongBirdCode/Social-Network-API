// Create a router instance

const router = require("express").Router();
// Import user and thought routes

const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
// Define endpoints for user and thought routes

router.use("/user",userRoutes);
router.use("/thought",thoughtRoutes);
// Export the router

module.exports = router;