<template lang="pug">
    .header__content
        button.btn__menu.btn-transparent(@click="$emit('toggleSidebar')")
            BIcon.menu__icon(icon="filter-left")
        .header__content--container
            .header__content--left
            .header__content--right
                ul.functions__buttons
                    li.function__buttons-item
                        button.btn.btn-transparent
                            BIcon(icon="plus")
                .user__avatar
                    .user__avatar--icon(@click="toggleUserMenu") D
                    ul.user__avatar--dropdown(v-if="showUserMenu" tabindex="0" v-out="onClickOutside")
                        li
                            NuxtLink(to="/example") Quản lý tài khoản
                        li
                            NuxtLink(to="/example") Đổi mật khẩu
                        li
                            NuxtLink(to="/example") Thoát ra
</template>
<script>
export default {
    data() {
        return {
            showUserMenu: false,
        };
    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
    },
    events: {
        onClickOutside() {
            this.showUserMenu = false;
        },
    },
};
</script>
<style lang="scss">
.header__content {
    &--container {
        height: 5rem;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        padding-left: 5rem;
        padding-right: 2rem;
    }

    &--left {
    }

    &--right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .functions__buttons {
            margin-bottom: 0;
            list-style-type: none;
            display: flex;
            justify-content: flex-end;
            margin-right: 1.5rem;

            li {
                padding-top: 0.3rem;
            }

            &-item {
                margin-top: 0.3rem;
            }

            svg {
                width: 3rem;
                height: 3rem;
                display: flex;
            }

            button:focus,
            button:active,
            button:visited {
                outline: none;
            }
        }

        .user__avatar {
            position: relative;

            &--icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 3rem;
                width: 3rem;
                background-color: $main-dark-color;
                color: $white;
                border-radius: 50%;
                font-size: 2rem;
                font-weight: bold;
                cursor: pointer;
            }

            &--dropdown {
                list-style-type: none;
                margin: 0;
                padding: 0;
                position: absolute;
                right: 0;

                width: 15rem;
                background-color: $white;

                a {
                    display: block;
                    padding: 0.5rem 1rem;

                    &:hover {
                        background-color: $primary;
                        color: $gray-100;
                    }
                }
            }
        }
    }

    .btn__menu {
        position: absolute;
        left: 1rem;
        top: 1rem;
        z-index: 10;

        svg {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    &--left {
        svg {
            width: 2.5rem;
            height: 2.5rem;
            fill: $gray-600;
        }
    }
}

@include media-breakpoint-down(md) {
    .main__view {
        width: 100%;
        left: 0;
    }
    .header__content {
        left: 0;
        width: 100%;
    }

    .main__sidebar {
        display: none;

        &.active {
            display: flex;
        }
    }
}

@include media-breakpoint-up(lg) {
    .header__content {
        .btn__menu {
        }
    }
}
</style>
