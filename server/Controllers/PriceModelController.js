const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const PriceModel = require("../Models/PriceModel");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    const priceModels = await PriceModel.find({ ...req.query });

    return res.json({
        success: true,
        entries: {
            priceModels,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    const priceModel = await PriceModel.create(data);
    return res.json({
        success: true,
        entries: {
            priceModel,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const priceModel = await PriceModel.findById(id);

    return res.json({
        success: true,
        entries: {
            priceModel,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const priceModel = await PriceModel.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            priceModel,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const priceModel = await PriceModel.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            priceModel,
        },
    });
});
