import {get,post,dele,put} from "../common/http.js"

export function addNewWorkPlan(params) {
    return post("/workPlan/add",params);
}

export function queryWorkPlanList(params) {
    return get("/workPlan/queryWorkPlanList",params);
}
