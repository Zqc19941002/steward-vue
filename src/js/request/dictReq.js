import {get,post,dele,put} from "../common/http.js"

export function queryDict() {
   return get("/dict/query",{})
}

export function queryAccountInfo() {
   return get("/account/info",{})
}
