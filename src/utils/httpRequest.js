import axios from 'axios'

import {
    baseUrl
} from './baseconfig'


/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params={}] body的请求参数，默认为空
 * @return 返回Promise
 */

// 请求拦截
axios.interceptors.request.use(config => {
    // let url = config.url
    // if (!url.match(/(login)|(reg)/)) {
    //     const token = localStorage.getItem("token")
    //     config.headers['Authorization'] = token
    // }else{
    //     console.log(config)
    // }
    return config
}, err => {
    return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
    if (res.status == 200) {
        return res.data
    }
    return res
}, err => {
    return Promise.reject(err)
})

function httpUtils(url, method, params = {}) {
    url = baseUrl + url
    if (JSON.stringify(params) !== "{}") {
        //带参数
        return new Promise((resolve, reject) => {
            axios({
                    url,
                    method,
                    data: JSON.stringify(params)
                }).then(res => resolve(res))
                .catch(err => reject(err))
        })
    } else {
        // 不带参数
        return new Promise((resolve, reject) => {
            axios({
                    url,
                    method
                }).then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

}

export {
    httpUtils
}