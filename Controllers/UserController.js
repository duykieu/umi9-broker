const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");

//Model
const UserModel = require("../Models/User");

exports.get = catchAsync(async (req, res, next) => {
  const users = await UserModel.find({});

  return res.json({
    status: "success",
    entries: {
      users,
    },
  });
});

exports.store = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  if (!data) return next(new AppError("You must specify `data` in body"));

  const user = await UserModel.create(data);

  return res.json({
    status: "success",
    entries: {
      user,
    },
  });
});

exports.show = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You must specify `id` in params", 200));

  const user = await UserModel.findById(id);
  return res.json({
    status: "success",
    entries: {
      user,
    },
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  if (!id || !data)
    return next(new AppError("You must specify `id` and `data`", 200));

  const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return res.json({
    status: "success",
    entries: {
      user,
    },
  });
});

exports.destroy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You must specify `id` in params", 200));

  const user = await UserModel.findByIdAndDelete(id);
  return res.json({
    status: "success",
    entries: {
      user,
    },
  });
});
