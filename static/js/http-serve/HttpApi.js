import axios from 'axios'
import {Message} from 'element-ui'
import globalDomain from 'static/js/config'

axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
});
axios.interceptors.response.use(res => {
    if (res.status && res.status == 200 && res.data.code != 200) {
        Message.error({message: res.data.error});
        return;
    }
    return res.data;
}, err => {
    if (err.response.status == 504 || err.response.status == 404) {
        Message.error({message: '系统异常！'});
    } else if (err.response.status == 403) {
        Message.error({message: '权限不足,请联系管理员!'});
    } else {
        Message.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
})
let base = '';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`
    });
}
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
}

export const ApiMethods = {
    ErshoufangApi: {
        queryAll: () => {
            return getRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=house/esfs')
        }
    },
    YishoufangApi: {
        queryAll: () => {
            return getRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=/house/loupans')
        },
        detail: ({id}) => {
            return getRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=/house/loupans/' + id)
        }
    },
    ClientApi: {
        queryAll: () => {
            return getRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/clients')
        },
        detail: ({id}) => {
            return getRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/clients/' + id)
        },
        follers: ({id}) => {
            return getRequest(globalDomain.api + `gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/house/client/${id}/follers`)
        },
        collect: (param) => {
            return postRequest(globalDomain.api + `gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/clients/collect`, param)
        },
        addFollow: (param) => {
            return postRequest(globalDomain.api + 'gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/house/foller', param)
        },
        transform: ({id}) => {
            return putRequest(globalDomain.api + `gycGS9Nc9e13b9ecd9991b65d693d55a45ee44094b05162?uri=http://localhost:8080/client/${id}/principal`)
        }
    }
}
