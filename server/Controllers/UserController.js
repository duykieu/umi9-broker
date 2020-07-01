const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const User = require("../Models/User");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    let { page, perPage, type, ...rest } = req.query;
    let typeQuery = {};
    if (type === "internal") {
        typeQuery: {
            userGroup: {
                $ne: "member";
            }
        }
    }

    if (page && perPage) {
        page = Math.abs(page) || 1; //2
        perPage = Math.abs(perPage) || 15; //10
        const skip = Math.abs(page) * Math.abs(perPage) - 15 || 0; //10

        const users = await User.find({ ...rest, ...typeQuery })
            .skip(skip)
            .limit(perPage);
        return res.json({
            success: true,
            entries: {
                meta: pagination(page, perPage, users.length),
                users,
            },
        });
    } else {
        const users = await User.find({ ...typeQuery });
        return res.json({
            success: true,
            entries: {
                users,
            },
        });
    }
});

exports.store = catchAsync(async (req, res, next) => {
    const data = req.body;
    Object.keys(data).forEach(key => {
        if (!data[key]) {
            data[key] = undefined;
        }
    });

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
