import {
    httpUtils
} from '../utils/httpRequest'

export default {
    namespaced: true,
    state: {
        list: [],
        total: 0,
        pageSize: 5,
        currentPage: 1,
        currentClassItem: {},
        rightList: []
    },
    mutations: {
        getClassItem(state, {
            total,
            pageSize,
            currentPage,
            currentClassItem,
            list
        }) {
            Object.assign(state, {
                total,
                pageSize,
                currentPage,
                currentClassItem,
                list
            })
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
        async getClassItemAsync({
            commit
        }, payload) {
            let data = await httpUtils(payload.url, "post", payload.params)
            commit('getClassItem', data)
        }
    }
}