<template lang="pug">
    .form-group
        label {{ $t(label) }}
        b-form-select(
            :placeholder="placeholder"
            :options="options"
            :class="`form-control ${internalSize}`"
            v-model="inputVal"
            @change="validator && validator.$touch()"
        )
        .form__error(v-for="rule in errors") {{ label && $fm(rule, label.split('.').pop()) }}
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
    },
};
</script>

<style lang="scss" scope>
.form__error {
    color: $danger;
}
</style>
