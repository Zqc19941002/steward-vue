import {get,post,dele,put} from "../common/http.js"

export function querySysMenuNode(params) {
    return get("/menu/menuNode",params);
}

export function addNewMenu(params) {
    return post("/menu/addMenu",params);
}

export function deleteMenu(params) {
    return post("/menu/deleteMenu",params);
}
