<template lang="pug">
    .sidebar__content
        NuxtLink.__logo(to="/") IP
            span Intelligent Property

        //- Level 1
        ul.menu__list
            li(v-for="item in menuItems")
                NuxtLink.menu__item(v-if="item.path" :to="item.path")
                    BIcon.menu__item-icon(v-if="item.icon" :icon="item.icon")
                    span {{ item.label }}
                .menu__item(v-if="!item.path")
                    BIcon.menu__item-icon(v-if="item.icon" :icon="item.icon")
                    span {{ item.label }}

                //- level 2
                ul.submenu__level-1(v-if="item.children")
                    li(v-for="child in item.children")
                        NuxtLink.menu__item(v-if="child.path" :to="child.path") {{ child.label }}
                        .menu__item(v-if="!child.path") {{ child.label }}

                            //Level 3
                            ul.submenu__level-2(v-if="child.children")
                                li(v-for="i in child.children")
                                    NuxtLink.menu__item(v-if="i.path" :to="i.path") {{ i.label }}
</template>
<script>
export default {
    data() {
        return {
            menuItems: [
                {
                    label: "Trang chủ",
                    path: "/",
                    permission: "DashboardIndex",
                    icon: "house-fill",
                },
                {
                    label: "Sản phẩm",
                    icon: "house-door",
                    children: [
                        {
                            label: "Tất cả sản phẩm",
                            path: "/property",
                            permission: "PropertyIndex",
                        },
                        {
                            label: "Thêm sản phẩm",
                            path: "/property/add",
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
                            path: "/ads/add",
                            permission: "AdsStore",
                        },
                    ],
                },
                {
                    label: "Người dùng",
                    icon: "person",
                    children: [
                        {
                            label: "Tất cả người dùng",
                            path: "/user",
                            permission: "UserIndex",
                        },
                        {
                            label: "Thêm người dùng",
                            path: "/user/add",
                            permission: "UserStore",
                        },
                        {
                            label: "Nhóm người dùng",
                            path: "/user-group",
                            permission: "UserGroupIndex",
                        },
                    ],
                },
                {
                    label: "Cài đặt",
                    path: "/setting",
                    permission: "SettingIndex",
                    icon: "gear",
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.__logo {
    color: $gray-200;
    font-size: 4rem;
    font-weight: 900;
    text-align: center;
    display: block;
    margin-bottom: 3rem;

    span {
        font-size: 1.6rem;
    }
}

.sidebar__content {
    width: 100%;

    .btn__menu {
        position: absolute;
        right: -3rem;
        top: 0.5rem;

        svg {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    ul {
        list-style-type: none;
        padding-left: 0;
    }
}

.menu__list {
    .menu__item {
        color: $text-dark-color;
        padding: 0.5rem 1.5rem;
        display: block;

        &:hover {
            color: $white;
            text-decoration: none;
        }

        &.nuxt-link-exact-active {
            color: $white;
        }

        &-icon {
            margin-right: 0.5rem;
        }
    }

    .submenu__level-1 {
        > li {
            padding-left: 2rem;
        }
    }
}
</style>
