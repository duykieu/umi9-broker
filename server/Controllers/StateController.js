const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const State = require("../Models/State");

exports.get = catchAsync(async (req, res, next) => {
    const states = await State.find({ ...req.query });

    return res.json({
        success: true,
        entries: {
            states,
        },
    });
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    const state = await State.create(data);
    return res.json({
        success: true,
        entries: {
            state,
        },
    });
});

exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const state = await State.findById(id);

    return res.json({
        success: true,
        entries: {
            state,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const state = await State.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            state,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const state = await State.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            state,
        },
    });
});
