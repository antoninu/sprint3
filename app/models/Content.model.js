const { DbService } = require(`${basePath}/app/services`);
const schema = require("./schemas/content.schema");

const Model = DbService.createModel("Content", schema);

module.exports = Model;
