<template lang="pug">
    .user__page
        PageTitleComponent Quản lý người dùng
        FilterBarComponent
        GridComponent.padding(
            :items="users.rowData"
            :fields="fields"
            :perPage="users.perPage"
            :page="users.page"
            :total="users.total"
        )

</template>
<script>
import { AgGridVue } from "ag-grid-vue";
import PageTitleComponent from "~/components/ui/PageTitleComponent";
import FilterBarComponent from "~/components/ui/FilterBarComponent";
import GridComponent from "~/components/ui/GridComponent";

export default {
    components: { GridComponent, FilterBarComponent, PageTitleComponent, AgGridVue },
    layout: "main",
    data() {
        return {
            users: {
                perPage: 15,
                page: 1,
                total: 0,
                rowData: [],
            },
            columnDefs: null,
            fields: [
                "checkbox",
                { label: "Họ tên", key: "fullName" },
                "email",
                { label: "Điện thoại", key: "phoneNumber" },
                { label: "Địa chỉ", key: "address" },
                { label: "Vai trò", key: "userGroup" },
            ],
        };
    },

    created() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            const params = {
                perPage: this.users.perPage,
                page: this.users.page,
            };
            return this.$api.User.Get(params)
                .then(({ data: { success, entries, meta } }) => {
                    if (success) {
                        // return entries.users;
                        this.users = {
                            rowData: entries.users,
                            total: entries.meta.total,
                            perPage: entries.meta.perPage,
                            page: entries.meta.currentPage,
                        };
                    }
                })
                .catch(({ message, ...rest }) => {
                    this.$notification("error", "Lỗi kết nối với máy chủ");
                    // this.$log(rest, message);
                });
        },
    },
};
</script>
