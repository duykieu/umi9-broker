const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const Property = require("../Models/Property");
const pagination = require("../Helpers/pagination");

exports.get = catchAsync(async (req, res, next) => {
    let { $skip, $top, $filter, ...rest } = req.query;

    $filter = JSON.parse($filter);

    const filterCondition = {};
    if ($filter.state) filterCondition.state = $filter.state;
    if ($filter.city) filterCondition.city = $filter.city;
    if ($filter.street) filterCondition.street = $filter.street;
    if ($filter.ward) filterCondition.ward = $filter.ward;
    const filterWidth = [];
    if ($filter.width && $filter.width instanceof Array) {
        if ($filter.width[0] > 0 && $filter.width[1] === 100) {
            filterCondition.width = { $gte: $filter.width[0] };
        }
        if ($filter.width[1] < 100 && $filter.width[0] === 0) {
            filterCondition.width = { $lte: $filter.width[1] };
        }
        if ($filter.width[0] > 0 && $filter.width[1] < 100) {
            filterCondition.$and = [
                { width: { $gte: $filter.width[0] } },
                { width: { $lte: $filter.width[1] } },
            ];
        }
    }

    // if ($filter.width && $filter.width instanceof Array && $filter.width[0] > 0) {
    //     filterWidth.push({ width: { $gt: $filter.width[0] } });
    // }
    // if ($filter.width && $filter.width instanceof Array && $filter.width[1] < 100) {
    //     filterWidth.push({ width: { $lt: $filter.width[1] } });
    // }

    // if (
    //     ($filter.width && $filter.width instanceof Array && $filter.width[0] > 0) ||
    //     $filter.width[1] < 100
    // ) {
    //     filterCondition.width = { $and: [] };
    // }

    console.log({ filterWidth });

    $top = Math.abs($top) || 15; //10
    $skip = Math.abs($skip) || 0; //10

    const numOfDocs = await Property.countDocuments({ ...filterCondition });
    let properties;
    properties = await Property.find({ ...filterCondition })
        .populate("state")
        .populate("city")
        .populate("street")
        .populate("ward")
        .populate("category")
        .skip($skip)
        .limit($top);

    const gridItems = properties.map(
        ({
            fullAddress,
            _id,
            category,
            width,
            long,
            landSize,
            behindWidth,
            gfa,
            numOfBeds,
            numOfWcs,
            structure,
            state,
        }) => ({
            fullAddress,
            id: _id,
            category: category.name,
            width,
            long,
            landSize,
            behindWidth,
            gfa,
            numOfBeds,
            numOfWcs,
            structure,
            state: state.name,
        })
    );

    return res.json({
        success: true,
        entries: {
            meta: {
                numOfDocs,
                numOfPages:
                    numOfDocs % $top === 0 ? numOfDocs / $top : Math.floor(numOfDocs / $top + 1),
                currentPage: $skip / $top,
            },
            properties: gridItems,
        },
    });
});

exports.grid = catchAsync(async (req, res, next) => {
    const { $inlinecount, $skip, $top } = req.query;

    const itemCount = await Property.countDocuments();
    const properties = await Property.find()
        .populate("state")
        .populate("city")
        .populate("street")
        .populate("ward")
        .populate("category")
        .skip(Number($skip))
        .limit(Number($top));

    const gridItems = properties.map(
        ({
            fullAddress,
            _id,
            category,
            width,
            long,
            landSize,
            behindWidth,
            gfa,
            numOfBeds,
            numOfWcs,
            structure,
            state,
        }) => ({
            fullAddress,
            id: _id,
            category: category.name,
            width,
            long,
            landSize,
            behindWidth,
            gfa,
            numOfBeds,
            numOfWcs,
            structure,
            state: state.name,
        })
    );

    return res.json({
        Items: gridItems,
        Count: itemCount,
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
