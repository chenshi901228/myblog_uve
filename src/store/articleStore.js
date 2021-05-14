import {
    httpUtils
} from '../utils/httpRequest'

export default {
    namespaced: true,
    state: {
        article: {},
        articleList:[],
        rightList: [],
        prev:{},
        next:{}
    },
    mutations: {
        getArticle(state, params) {
            Object.assign(state,
                params
            )
        },
        setRightList(state,
            rightList
        ) {
            Object.assign(state, {
                rightList
            })
        }
    },
    actions: {
        async getArticleAsync({
            commit
        }, payload) {
            let data = await httpUtils(payload.url, "post", payload.params)
            commit('getArticle', data)
        }
    }
}