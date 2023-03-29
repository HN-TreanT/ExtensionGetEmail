const Model = require("./model");
const { v4: uuid } = require("uuid");
exports.getAllModel = async (req, res) => {
  try {
    const models = await Model.find();
    if (models.length <= 0) {
      return res.json({
        status: true,
        message: "model not found",
      });
    } else {
      return res.json({
        status: true,
        data: models,
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      message: err.message,
    });
  }
};
exports.postModel = async (req, res) => {
  try {
    const id = uuid();
    const model = new Model({ modelId: id, ...req.body });
    await model.save();
    return res.json({
      status: true,
      data: model,
    });
  } catch (err) {
    return res.json({
      status: false,
      message: err.message,
    });
  }
};
