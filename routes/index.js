const router = require("express").Router();
const apiRoutes = require("./api");

// In order to communicate with routes within api and if the read for any reason fails we will see an error code //

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;