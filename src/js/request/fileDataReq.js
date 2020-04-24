import {get,post,dele,put} from "../common/http.js"

export function saveFile(params) {
    return post('/file/saveFile',params);
}

export function saveFolder(params) {
    return post('/file/saveFolder',params);
}

export function getFileList(params) {
    return get("file/fileAllList",params)
}

export function getFileTypeList(params) {
    return get("file/fileTypeAllList",params)
}

export  function renameStewFile(params) {
    return put("file/renameFile",params)
}
