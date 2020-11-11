const serviceContainerManager = require("../../utils/serviceContainerManager");
const { contentService, ResponseService } = serviceContainerManager.load([
  "contentService",
  "ResponseService",
]);

module.exports = {
  async create(req, res, next) {
    try {
      await contentService.createOne(req.body);
      return ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },
};
