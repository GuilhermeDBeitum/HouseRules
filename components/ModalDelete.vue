<template>
    <v-dialog v-model="deleteDialog" max-width="420px">
        <v-card class="d-block text-center mx-auto">
            <v-card-title class="d-block text-center mx-auto">
                <v-avatar color="red" class="d-block text-center mx-auto mt-1" size="42">
                    <v-icon>mdi-delete</v-icon>
                </v-avatar>
            </v-card-title>

            <h3>
                <v-flex xs12 class="text-xs-center-important font-weight-black">
                    Are you sure you want to delete
                    this rule?
                    <br />
                </v-flex>
            </h3>
            <v-card-text>
                <v-flex xs12 class="text-xs-center-important font-weight-black">
                    This action cannot be undone.
                </v-flex>
            </v-card-text>
            <v-card-actions class="d-block text-center mx-auto pa-1">
                <v-btn color="red darken-1" text @click="deleteDialog = false">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteRule(item)">
                    Save
                </v-btn>
            </v-card-actions>
            <br />
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ModalDelete",
    props: { item: Object },
    computed: {
        deleteDialog: {
            get() {
                return this.$store.state.deleteDialog
            },
            set(value) {
                this.$store.commit('SET_DELETE_DIALOG', value)
            }
        }
    },
    methods: {
        async deleteRule(item) {
            this.$store.dispatch('deleteRule', item.id);
            this.deleteDialog = false
        }
    }
}
</script>
