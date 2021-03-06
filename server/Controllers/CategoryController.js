const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const Category = require("../Models/Category");
const pagination = require("../Helpers/pagination");
const UserGroup = require("../Models/UserGroup");

exports.get = catchAsync(async (req, res, next) => {
    const categories = await Category.find({ ...req.query });

    return res.json({
        success: true,
        entries: {
            categories,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    const category = await Category.create(data);
    return res.json({
        success: true,
        entries: {
            category,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    return res.json({
        success: true,
        entries: {
            category,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            category,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            category,
        },
    });
});
