const mainValidator = require("../../main");
const contentValidationSchema = require("../../../../validation/schemas/content.validationSchema");

module.exports = {
  create(req, res, next) {
    return mainValidator.validateSync(
      contentValidationSchema.create(),
      req,
      next
    );
  },
};
