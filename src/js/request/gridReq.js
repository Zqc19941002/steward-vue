import {get,post,dele,put} from "../common/http.js"

export function queryGridList(params) {
    return get('/grid/list',params);
}

export function saveGrid(params) {
    return post('/grid/save',params);
}

export function queryRivalList(params) {
    return get('/channel/queryRivalLonLatList',params);
}
