const DbModelService = require("./DbModelService");

module.exports = class ContentService extends DbModelService {
  constructor() {
    super("Content");
  }

  async createOne({ title }) {
    const foundContent = await this.getOne({ query: { title } });

    if (
      foundContent &&
      Object.keys(foundContent) &&
      Object.keys(foundContent).length
    ) {
      return foundContent;
    }

    const newItem = new this._model({ title });

    return newItem.save();
  }
};
