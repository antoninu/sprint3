const { DbService } = require(`${basePath}/app/services`);

const schemaData = {
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, required: true, unique: true },
  owner: { type: String, required: true, unique: true },
};

const schemaOptions = {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
};

module.exports = DbService.createSchema(schemaData, schemaOptions);
