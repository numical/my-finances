const { financialModels } = require('../datastores');
const { BadRequest, NotFound } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { modelId } = req.params;
    if (!modelId) throw new BadRequest('modelId missing');

    const model = await financialModels.get(modelId);

    if (model) {
      res.status(200).json(model);
    } else {
      throw new NotFound();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/financial-model/:modelId',
  handler,
  authPath: '/financial-model',

};
