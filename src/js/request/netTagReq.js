import {get,post,dele,put} from "../common/http.js"

export function queryNetTagPage(params) {
    return get("/netTag/queryNetTagPage",params);
}

export function addNetTag(params) {
    return post("/netTag/addNetTag",params);
}

export function deleteNetTag(params) {
    return dele("/netTag/deleteNetTag",params)
}

export function deleteNetTags(params) {
    return dele("/netTag/deleteNetTags",params)
}

export function updateNetTag(params) {
    return put("/netTag/updateNetTag",params)
}

export function flagAsCommonNetTag(params) {
    return put("/netTag/flagAsCommonNetTag",params)
}

export function getCommonNetTag(params) {
    return get("/netTag/getCommonNetTag",params)
}
