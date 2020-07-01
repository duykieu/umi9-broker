const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const City = require("../Models/City");
const State = require("../Models/State");
const mongoose = require("mongoose");

exports.get = catchAsync(async (req, res, next) => {
    const { idOrSlug } = req.params;

    let state;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
        state = await State.findById(idOrSlug);
    } else {
        state = await State.findOne({ slug: idOrSlug });
    }

    if (!state) {
        return next(new AppError("State does not exists", 500));
    }

    const cities = await City.find({ state: state._id });

    return res.json({
        success: true,
        entries: {
            cities,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    const city = await City.create(data);
    return res.json({
        success: true,
        entries: {
            city,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const city = await City.findById(id);

    return res.json({
        success: true,
        entries: {
            city,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const city = await City.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            city,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            city,
        },
    });
});
