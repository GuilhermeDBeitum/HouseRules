import Vue from "vue";
import Vuex from "vuex";
import getApiClient from "../services/api"

Vue.use(Vuex);

const SET_DATA = "SET_DATA";
const SET_NAME = "SET_NAME";
const SET_ACTIVE = "SET_ACTIVE"
const SET_CREATE_DIALOG = "SET_CREATE_DIALOG";
const SET_DELETE_DIALOG = "SET_DELETE_DIALOG";
const SET_FORM_TITLE = "SET_FORM_TITLE";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_LOADING = "SET_LOADING";

const state = () => ({

    createDialog: false,
    deleteDialog: false,
    formTitle: "",
    data: [],
    house_rules: {},
    name: "",
    active: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false
})
const getters = {
    name: state => state.name,
    active: state => state.active,
    loading: state => state.loading,
}
const mutations = {
    [SET_DATA](state, data) {
        state.data = data
    },
    [SET_NAME](state, name) {
        state.name = name
        state.house_rules.name = name
    },
    [SET_ACTIVE](state, active) {
        active == true ? state.active = 1 : state.active = 0
        state.house_rules.active = state.active
    },
    [SET_CREATE_DIALOG](state, createDialog) {
        state.createDialog = createDialog
    },
    [SET_DELETE_DIALOG](state, deleteDialog) {
        state.deleteDialog = deleteDialog
    },
    [SET_FORM_TITLE](state, formTitle) {
        state.formTitle = formTitle
    },
    [SET_TOTAL_PAGES](state, totalPages) {
        state.totalPages = totalPages
    },
    [SET_CURRENT_PAGE](state, currentPage) {
        state.currentPage = currentPage
    },
    [SET_LOADING](state, loading) {
        state.loading = loading
    }
}
const actions = {

    async listRules({ commit }) {
        commit("SET_LOADING", true);
        await getApiClient().get()
            .then((response) => {
                commit("SET_DATA", response.data.data);
                if (response.status == 200) {
                    commit("SET_LOADING", false);
                }
            });
    },

    async paginateRules({ commit }, page) {
        commit("SET_LOADING", true);
        await getApiClient().get(`?page=${page}`)
            .then((response) => {
                commit("SET_DATA", response.data.data);
                if (response.status == 200) {
                    commit("SET_LOADING", false);
                }
            });
    },

    async showRule({ commit }, id) {
        commit("SET_LOADING", true);
        const response = await getApiClient().get(`${id}`)
        if (response.status == 200) {
            commit("SET_LOADING", false);
        }
    },

    async createRule({ commit, state, dispatch }) {
        commit("SET_LOADING", true);
        const response = await getApiClient().post('', { house_rules: state.house_rules })
        if (response.status == 200) {
            dispatch("paginateRules", state.currentPage);
            commit("SET_LOADING", false);
        }
    },

    async updateRule({ commit, state, dispatch }, id) {
        commit("SET_LOADING", true);
        const response = await getApiClient().put(`${id}`, { house_rules: state.house_rules })
        if (response.status == 200) {
            dispatch("paginateRules", state.currentPage);
            commit("SET_LOADING", false);
        }
    },

    async deleteRule({ commit, state, dispatch }, id) {
        commit("SET_LOADING", true);
        const response = await getApiClient().delete(`${id}`)
        if (response.status == 200) {
            dispatch("paginateRules", state.currentPage);
            commit("SET_LOADING", false);
        }
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
}