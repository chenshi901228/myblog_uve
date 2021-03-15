import { httpRequest } from '../utils/http'

export default {
    namespaced: true,
    state: {
        list: [],
        currentIfyItem: 0,
        currentArticle: {}
    },
    getters: {
        listWithOutHomePage: state => {
            return state.list.slice(1)
        },
        currentObj: state => {
            return state.list[state.currentIfyItem]
        }
    },
    mutations: {
        getData(state, params) {
            Object.assign(state, { list: params })
        },
        classifyItem(state, params) {
            state.currentIfyItem = parseInt(params)
        },
        getArticleDetails(state, params) {
            let id = parseInt(params.id)
            let title = parseInt(params.title)
            state.currentArticle = state.list[id].contents[title]
        }
    },
    actions: {
        async getListAsync({ commit }, payload) {
            let { url } = payload
            let { status, msg } = await httpRequest(url, "post")
            if (status == "ok") {
                commit("getData", msg)
            }
        }
    }
}