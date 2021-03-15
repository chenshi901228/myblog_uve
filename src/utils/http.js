import { baseUrl } from './baseconfig'



/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params={}] body的请求参数，默认为空
 * @return 返回Promise
 */

let httpRequest = async function (url, method, params = {}) {
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        // "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    if (JSON.stringify(params) == "{}") {
        return await fetch(baseUrl + url, {
            method,
            headers: header
        }).then(res => res.json())
            .catch(err => err)
    } else {
        return await fetch(baseUrl + url, {
            method,
            headers: header,
            body: JSON.stringify(params)
        }).then(res => res.json())
            .catch(err => err)
    }
}


export { httpRequest }