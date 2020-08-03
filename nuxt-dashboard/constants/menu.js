export default [
    {
        label: "Trang chủ",
        path: "/",
        permission: "DashboardIndex",
        icon: "house-fill",
    },
    {
        label: "Sản phẩm",
        icon: "house-door",
        active: [],
        children: [
            {
                label: "Tất cả sản phẩm",
                path: "/property",
                permission: "PropertyIndex",
            },
            {
                label: "Thêm sản phẩm",
                path: "/property/create",
                permission: "PropertyStore",
            },
            {
                label: "Quản lý chuyên mục",
                path: "/category",
                permission: "CategoryIndex",
            },
            {
                label: "Quản lý đơn vị",
                path: "/price-model",
                permission: "PriceModelIndex",
            },
        ],
    },
    {
        label: "Tin đăng",
        icon: "newspaper",
        children: [
            {
                label: "Tất cả tin đăng",
                path: "/ads",
                permission: "AdsIndex",
            },
            {
                label: "Thêm sản phẩm",
                path: "/ads/create",
                permission: "AdsStore",
            },
        ],
    },
    {
        label: "Người dùng",
        icon: "person",
        active: ["/user-group/create"],
        children: [
            {
                label: "Tất cả người dùng",
                path: "/user",
                permission: "UserIndex",
            },
            {
                label: "Thêm người dùng",
                path: "/user/create",
                permission: "UserStore",
            },
            {
                label: "Nhóm người dùng",
                path: "/user-group",
                permission: "UserGroupIndex",
                active: ["user-group"],
            },
        ],
    },
    {
        label: "Cài đặt",
        path: "/setting",
        permission: "SettingIndex",
        icon: "gear",
    },
];
