import {get,post,dele,put} from "../common/http.js"
export function queryMessage(params) {
    return get("/message/query",params)
}
