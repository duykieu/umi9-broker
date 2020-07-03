const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const Property = require("../Models/Property");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    let { page, perPage, ...rest } = req.query;

    page = Math.abs(page) || 1; //2
    perPage = Math.abs(perPage) || 10; //10
    const skip = Math.abs(page) * Math.abs(perPage) - 10 || 0; //10

    const total = await Property.count({ ...rest });
    const properties = await Property.find({ ...rest })
        .populate("user", "username")
        .skip(skip)
        .limit(perPage);

    return res.json({
        success: true,
        entries: {
            meta: pagination(page, perPage, total),
            properties,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;

    Object.keys(data).forEach(key => {
        if (!data[key]) {
            data[key] = undefined;
        }
    });

    const property = await Property.create(data);
    return res.json({
        success: true,
        message: "Tạo mới sản phẩm thành công",
        entries: {
            property,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const property = await Property.findById(id);

    return res.json({
        success: true,
        entries: {
            property,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const property = await Property.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            property,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            property,
        },
    });
});
