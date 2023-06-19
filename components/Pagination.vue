<template>
    <v-row>
        <v-col>
            <v-pagination v-if="validPagination" v-model="currentPage" :total-visible="5" :length="totalPages"
                @input="paginate(currentPage)" circle></v-pagination>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Pagination',

    computed: {
        validPagination() {
            if (this.$store.state.data.pagination) {
                return this.$store.state.data.pagination.total >= 1 ? true : false
            }
        },

        currentPage: {
            get() {
                return this.$store.state.currentPage
            },
            set(value) {
                this.$store.commit('SET_CURRENT_PAGE', value)
            }
        },

        totalPages: {
            get() {
                return this.$store.state.data.pagination.total_pages
            },
            set(value) {
                this.$store.commit('SET_TOTAL_PAGES', value)
            }
        },
    },
    methods: {
        paginate(page) {
            console.log('paginate', page)
            this.$store.dispatch('paginateRules', page)
        }
    }
}

</script>