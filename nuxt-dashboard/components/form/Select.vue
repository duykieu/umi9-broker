<template lang="pug">
    .form-group
        label {{ $t(label) }}
        b-form-select(
            :placeholder="placeholder"
            :options="options"
            :class="`form-control ${internalSize}`"
            v-bind="$props"
            v-model="validator.$model"
        )
        .form__error(
            v-if="validator.$anyDirty && validator.$invalid"
            v-for="error in errorMessages"
        ) {{ error }}
</template>

<script>
export default {
    props: [
        "label",
        "size",
        "type",
        "placeholder",
        "value",
        "rules",
        "validator",
        "name",
        "options",
    ],
    computed: {
        internalSize() {
            return this.size ? `input-${size}` : "";
        },
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        errors() {
            if (!this.validator) return [];
            if (!this.validator.$error) return [];
            const rules = Object.keys(this.validator.$params);
            const { validator } = this;
            return rules.filter(rule => !validator[rule]);
        },
        errorMessages() {
            if (!this.label) return [];
            return this.errors.map(rule => {
                return this.$t("validation." + rule, {
                    field: this.$t("fields." + this.name),
                });
            });
        },
    },
};
</script>

<style lang="scss" scope>
.form__error {
    color: $danger;
}
</style>
