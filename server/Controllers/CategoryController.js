const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const Category = require("../Models/Category");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    let { page, perPage, ...rest } = req.query;

    page = Math.abs(page) || 1; //2
    perPage = Math.abs(perPage) || 10; //10
    const skip = Math.abs(page) * Math.abs(perPage) - 10 || 0; //10

    const total = await Category.count({ ...rest });
    const categories = await Category.find({ ...rest })
        .skip(skip)
        .limit(perPage);

    return res.json({
        success: true,
        entries: {
            meta: pagination(page, perPage, total),
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
    const category = await Host.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            category,
        },
    });
});
