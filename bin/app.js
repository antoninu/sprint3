const path = require("path");
global.basePath = path.normalize(`${__dirname}/..`);

/**
 * Initialize Models
 */
require(`${basePath}/app/models/`);

/**
 * Require Needed Services
 */
const serviceContainerManager = require("../app/utils/serviceContainerManager");
const {
  AuthService,
  CryptoService,
  DbService,
  EntityLoaderService,
  FileUploadService,
  ResponseService,
  ServerService,
  ContentService,
  UserService,
} = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);

/**
 * Create initial service instances
 */

const authService = new AuthService(appConfig.auth.authProvider);

serviceContainerManager.register([
  { name: "authService", provider: authService },
  // { name: 'cryptoService', provider: new CryptoService() },
  {
    name: "dbService",
    provider: new DbService({
      connectionString: appConfig.db.connectionString,
    }),
  },
  { name: "EntityLoaderService", provider: EntityLoaderService },
  { name: "FileUploadService", provider: FileUploadService },
  { name: "ServerService", provider: ServerService },
  { name: "contentService", provider: new ContentService() },
  {
    name: "userService",
    provider: new UserService({
      authService,
      cryptoService: new CryptoService(),
    }),
  },
  { name: "ResponseService", provider: ResponseService },
]);

/**
 * Require platform services and modules
 */
const App = require("express");
const app = new App();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const cors = require("cors");
const { dbService } = serviceContainerManager.load(["dbService"]);

/**
 * Starts app server
 */
app.listen(appConfig.env.port, () => {
  console.log(
    `Hell yeah on port '${appConfig.env.port}' under '${appConfig.env.name}' environment`
  );
});

/**
 * Established DB Connection
 */
try {
  dbService.connect();
} catch (err) {
  console.log(err);
  throw err;
}

/**
 * Sets App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    console.log({
      headers: req.headers,
      url: req.url,
      method: req.method,
      body: req.body,
    });
    next();
  })
  .use(helmet())
  .use(cors({}))
  .use("/", require(`${basePath}/routes/`))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);

/**
 * Server Handlers
 */
/**
 * Route Not Found Error Handler
 */
function routeNotFoundHandler(req, res, next) {
  const error = new NotFound("route not found");

  console.logError(error);

  ResponseService.sendErrorResponse(res, error);
}

/**
 * Catches all the errors and sends response
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function mainErrorHandler(err, req, res, next) {
  let error = {};

  if (err && err.status && err.message) {
    error = err;
  } else if (req.app.get("env") === "production") {
    error.message = "Ooops, something went wrong";
  } else {
    error.message = err.stack || err;
  }
  console.log(err);
  ResponseService.sendErrorResponse(res, error);
}

module.exports = app;
