import {
    httpUtils
} from '../utils/httpRequest'

export default {
    namespaced: true,
    state: {
        list: [],
        loopList: [],
        currentIfyItem: "首页",
    },
    mutations: {
        classifyItem(state, params) {
            state.currentIfyItem = params
        },
        homePageInit(state, params) {
            Object.assign(state, {
                list: params.list,
                loopList: params.loopList
            })
        }

    },
    actions: {
        async getHomePageAsync({
            commit
        }, payload) {
            let data = await httpUtils(payload.url, "post")
            commit('homePageInit', data)
        }
    }
}