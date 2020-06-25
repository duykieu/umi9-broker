const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const User = require("../Models/User");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    let { page, perPage, ...rest } = req.query;

    page = Math.abs(page) || 1; //2
    perPage = Math.abs(perPage) || 10; //10
    const skip = Math.abs(page) * Math.abs(perPage) - 10 || 0; //10

    const total = await User.count({ ...rest });
    const users = await User.find({ ...rest })
        .skip(skip)
        .limit(perPage);

    return res.json({
        success: true,
        entries: {
            meta: pagination(page, perPage, total),
            users,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = await User.create(data);
    return res.json({
        success: true,
        entries: {
            user,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    return res.json({
        success: true,
        entries: {
            user,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            user,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            user,
        },
    });
});
