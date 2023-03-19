const { v4: uuid } = require("uuid");
const User = require("./user.modal");
exports.SignUp = async (req, res) => {
  try {
    const id = uuid();
    const user = new User({ userId: id, fullname: req.body.fullname });
    await user.save();
    return res.json({
      status: true,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
