const { ValidationService } = require("../../services/");
module.exports = {
  create() {
    return ValidationService.createValidationSchema({
      contentId: ValidationService.validator("mongoDbId").required(),
      owner: ValidationService.validator().string().email().required().trim(),
      url: ValidationService.validator()
        .string()
        .uri({ allowQuerySquareBrackets: true })
        .min(10)
        .max(500)
        .optional(),
    });
  },
};
