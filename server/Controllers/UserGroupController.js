const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const UserGroup = require("../Models/UserGroup");
const pagination = require("../Helpers/pagination");

/**
 * Get all group
 * @type {function(...[*]=)}
 */
exports.get = catchAsync(async (req, res, next) => {
    const userGroups = await UserGroup.find({ ...req.query });
    const totalRows = await UserGroup.countDocuments();
    return res.json({
        success: true,
        entries: {
            userGroups,
            totalRows,
        },
    });
});

/**
 * Create new user group
 * @type {function(...[*]=)}
 */
exports.store = catchAsync(async (req, res, next) => {
    const { data } = req.body;
    const userGroup = await UserGroup.create(data);
    return res.json({
        success: true,
        entries: {
            userGroup,
        },
    });
});

/**
 * Get single group
 * @type {function(...[*]=)}
 */
exports.show = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userGroup = await UserGroup.findById(id);

    return res.json({
        success: true,
        entries: {
            userGroup,
        },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const userGroup = await UserGroup.findByIdAndUpdate(id, data, { new: true });

    return res.json({
        success: true,
        entries: {
            userGroup,
        },
    });
});

exports.destroy = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userGroup = await UserGroup.findByIdAndDelete(id);

    return res.json({
        success: true,
        entries: {
            userGroup,
        },
    });
});
