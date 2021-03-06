const { baseObject, DBID, DICTIONARY } = require('../schemas');

const requestSchema = {
  ...baseObject('create_financial_model_request'),
  properties: {
    modelId: DBID,
  },
};

const responseSchema = DICTIONARY;

const handler = async (req, res, next) => {
  try {
    const { modelId } = req.params;
    const { financialModels } = req.dataStores;

    const model = await financialModels.get(modelId);

    if (model) {
      res.status(200).json(model);
    } else {
      req.log.clientInfo(
        `404: ${req.method} ${req.url}: unknown modelId '${modelId}'`
      );
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/financial-model/:modelId',
  handler,
  requiresAuth: true,
  requestSchema,
  responseSchema,
};
