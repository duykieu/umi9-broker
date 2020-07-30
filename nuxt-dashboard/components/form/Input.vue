<template lang="pug">
    .form-group
        label {{ label }}
        input(
            :placeholder="placeholder"
            :type="type ? type : 'text'"
            :class="`form-control ${internalSize}`"
            v-model="inputVal"
            @keyup="validator && validator.$touch()"
            @keyup.enter="$emit('onEnter')"
        )
        .form__error(v-for="error in errorMessages") {{ error }}
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
    ],
    methods: {
        onKeyup() {
            this.validator && this.validator.$touch();
        },
    },

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

<style lang="scss"></style>
