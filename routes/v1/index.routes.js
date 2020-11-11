const express = require("express");
const appRoute = express.Router({ strict: true });

/**
 * Core Routes
 */
appRoute.use("/core", require("./core.route"));

/**
 * Content Routes
 */
appRoute.use("/content", require("./content.routes/content.main.route"));

/**
 * User Routes
 */
appRoute.use("/users", require("./user.routes/user.main.routes"));

module.exports = appRoute;
