const express = require("express");
const appRoute = express.Router({ strict: true });

const validator = require(`${basePath}/app/middlewares/dataValidators/entities/content/main`);
const controller = require(`${basePath}/app/controllers/content.controller/content.main.controller`);

appRoute.post("/", validator.create, controller.create);

module.exports = appRoute;
