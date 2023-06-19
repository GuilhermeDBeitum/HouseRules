<template>
    <v-overlay :value="$store.state.loading">
        <v-card-text>
            Loading...
            <v-progress-linear indeterminate color="blue"></v-progress-linear>
        </v-card-text>
    </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["loading"]),

        loading: {
            get() {
                return this.$store.state.loading;
            },

            set(value) {
                this.$store.commit("SET_LOADING", value);
            },
        },
    },
};
</script>