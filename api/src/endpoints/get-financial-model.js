const { financialModels } = require('../datastores');
const { BadRequest, NotFound } = require('../errors');

const handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequest('id missing');

    const model = await financialModels.get(id);

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
  path: '/financial-model',
  handler,
};
