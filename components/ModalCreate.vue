<template>
    <v-row justify="center" no-gutters>
        <v-dialog v-model="createDialog" persistent max-width="200px">
            <v-card outlined>
                <v-col cols="12" sm="12" md="12">
                    <v-card-title>
                        <strong>
                            {{ formTitle }}
                        </strong>
                    </v-card-title>
                </v-col>
                <v-card-text>
                    <v-container>
                        <v-row justify="center" no-gutters>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Name" v-model="name" :rules="required"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-checkbox color="green" label="Active" v-model=active></v-checkbox>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="center" no-gutters>
                        <v-col cols="12" sm="12" md="12">
                            <v-btn color="red darken-1" text @click="createDialog = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="createRule(item)">
                                Save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'ModalCreate',
    props: { item: Object, 'formTitle': String },
    data() {
        return {
            valid: false,
            required: [(v) => !!v || 'Put the name.',
            (v) => /[^ ]/.test(v) || "Can not be empty.",
            ]
        }
    },
    computed: {
        name: {
            get() {
                return this.$store.state.name
            },
            set(value) {
                this.$store.commit('SET_NAME', value)
            }
        },

        active: {
            get() {
                return this.$store.state.active
            },
            set(value) {
                this.$store.commit('SET_ACTIVE', value)
            }
        },

        createDialog: {
            get() {
                return this.$store.state.createDialog
            },
            set(value) {
                this.$store.commit('SET_CREATE_DIALOG', value)
            }
        },

    },

    watch: {
        item: {
            handler() {
                if (this.formTitle === 'CREATE RULE') {
                    if (this.$refs.form)
                        this.$refs.form.reset()
                }
            },
            deep: true
        }
    },
    methods: {
        createRule(item) {
            if (this.$refs.form)
                if (this.$refs.form.validate()) {
                    item.id ? this.$store.dispatch('updateRule', item.id)
                        : this.$store.dispatch('createRule')
                    this.createDialog = false
                }
        }
    }
}
</script>