const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const City = require("../Models/City");
const State = require("../Models/State");
const mongoose = require("mongoose");
const Project = require("../Models/Project");

exports.get = catchAsync(async (req, res, next) => {
    const { stateId, cityId } = req.params;

    if (!stateId || !cityId) {
        return next(new AppError("Missing params"));
    }

    let state, city;

    //Is state exits ?
    if (mongoose.Types.ObjectId.isValid(stateId)) {
        state = await State.findById(stateId);
    } else {
        state = await State.findOne({ slug: stateId });
    }

    if (!state) {
        return next(new AppError("State does not exists"));
    }

    //Then find city by state
    if (mongoose.Types.ObjectId.isValid(cityId)) {
        city = await City.findById(cityId);
    } else {
        city = await City.findOne({ slug: cityId, state: state._id });
    }

    if (!city) {
        return next(new AppError("City does not exists"));
    }

    const projects = await Project.find({ city: city._id });

    return res.json({
        success: true,
        entries: {
            projects,
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
