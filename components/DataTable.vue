<template>
    <v-card outlined>
        <v-card-title>
            <v-row justify="center">
                <v-card outlined>
                    <v-card-title class="text-h4">House Rules</v-card-title>
                </v-card>
            </v-row>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-if="$store.state.data.entities" :page.sync="page" :items-per-page="itemsPerPage" :headers="headers"
            :items="$store.state.data.entities" :search="search" hide-default-footer disable-sort>
            <template v-slot:item.name="{ item }">
                <span> {{ item.name }}</span>
            </template>
            <template v-slot:item.active="{ item }">
                <v-icon color="green" v-if="item.active === 1">
                    mdi-checkbox-marked-circle
                </v-icon>

            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="blue" x-small fab @click="getEditData(item)">
                    <v-icon> mdi-pencil</v-icon>
                </v-btn>

                <v-btn color="red" x-small fab @click="getDeleteData(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <ModalCreate :formTitle="formTitle" :item="data" />
        <ModalDelete :item="data" />
        <Loading />
        <template>
            <v-btn color="primary" dark rounded fab fixed right bottom @click="getCreateData()">
                <v-icon> mdi-plus </v-icon>
            </v-btn>
        </template>
        <Pagination />
    </v-card>
</template>

<script>

export default {
    name: "DataTable",
    data() {
        return {
            data: {},
            search: "",
            formTitle: "",
            headers: [
                { text: "Rule", value: "name" },
                { text: "Active", value: "active", width: 90 },
                { value: "actions", sortable: false, width: 132 },
            ],
        }
    },
    computed: {

        page() {
            return this.$store.state.data.pagination.current_page
        },

        itemsPerPage() {
            return this.$store.state.data.pagination.per_page
        },

        createDialog: {
            get() {
                return this.$store.state.createDialog;
            },
            set(value) {
                this.$store.commit("SET_CREATE_DIALOG", value);
            }
        },
        deleteDialog: {
            get() {
                return this.$store.state.deleteDialog;
            },
            set(value) {
                this.$store.commit("SET_DELETE_DIALOG", value);
            }
        }
    },

    methods: {

        getCreateData() {
            this.createDialog = true,
                this.data = {},
                this.formTitle = 'CREATE RULE'
        },
        getEditData(item) {
            this.createDialog = true,
                this.data = item,
                this.formTitle = 'EDIT RULE'
            this.$store.commit('SET_NAME', item.name)
            this.$store.commit('SET_ACTIVE', item.active)
        },
        getDeleteData(item) {
            this.deleteDialog = true,
                this.data = item
        },
    },
    mounted() {
        this.$store.dispatch("listRules");
    },
}

</script>