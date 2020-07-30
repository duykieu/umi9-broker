<template lang="pug">
    div
        BCard.no__padding
            BTable(
                v-bind="$props"
            )
                template(v-slot:head(checkbox))
                    input(type="checkbox" @change="selectAll = !selectAll")
                template(v-slot:cell(checkbox)="row")
                    input(
                        type="checkbox"
                        :checked="selectedRows.includes(row.item._id)"
                        :value="row.item._id"
                        @change="checkboxChange"
                    )
        BPagination(
            v-if="total && perPage && total > perPage"
            :per-page="perPage"
            :total-rows="total"
            v-model="page"
        )

</template>

<script>
export default {
    name: "GridComponent",
    props: ["items", "fields", "total", "perPage", "page"],
    data() {
        return {
            selectAll: false,
            selectedRows: [],
            currentPage: this.page,
        };
    },
    watch: {
        selectAll: {
            handler() {
                if (this.selectAll) {
                    return (this.selectedRows = this.items.map(el => el._id));
                }
                return (this.selectedRows = []);
            },
        },
    },
    methods: {
        checkboxChange({ target: { checked, value } }) {
            const currentSelectedRows = [...this.selectedRows];
            if (checked) {
                if (!currentSelectedRows.includes(value)) {
                    currentSelectedRows.push(value);
                    this.selectedRows = currentSelectedRows;
                }
            } else {
                this.selectedRows = currentSelectedRows.filter(el => el !== value);
            }
        },
    },
};
</script>

<style scoped></style>
