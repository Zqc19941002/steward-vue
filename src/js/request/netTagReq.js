import {get,post,dele} from "../common/http.js"

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
