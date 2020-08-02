const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const acl = require("./acl");

exports.get = catchAsync(async (req, res, next) => {
    const permissions = {};
    Object.keys(acl).forEach(resource => {
        permissions[resource] = Object.keys(acl[resource]).map(permission => permission);
    });
    return res.json({
        success: true,
        entries: {
            permissions,
        },
    });
});
