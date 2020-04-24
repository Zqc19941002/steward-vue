import CommonUtil from "./CommonUtil"

/** log level **/
var ll = {debug: false, info: false, error: true, temp: true};
var mll = {debug: false};
var intervalTimer = null;


export default {


    addPolygonList: function (map, drawObjList) {
        if (ll.debug) console.log("BmapPolygonUtil.addPolygonList");
        if (ll.debug) console.log(drawObjList);
        var pointArrayView = [];
        $(drawObjList).each(function () {
            var drawObj = this;
            if (CommonUtil.isNullObj(drawObj.latlng)) return;
            var labelmsg = '<span data-type="' + drawObj.type + '" data-code="' + drawObj.busiRegCode + '">' + drawObj.busiRegName + '</span>';
            var pointArray = [];
            var coordinates = drawObj.latlng.geom.coordinates[0];
            for (var i = 0; i < coordinates.length; i++) {
                var point = new BMap.Point(coordinates[i][0], coordinates[i][1]);
                pointArray.push(point);
            }
            pointArrayView = pointArrayView.concat(pointArray);
            var polygonDrawJson = new BMap.Polygon(pointArray, map.mapConfig.styleOverlayPolygon);
            polygonDrawJson.drawObj = drawObj;
            polygonDrawJson.drawObj.drawType = "busi_reg";
            map.addOverlay(polygonDrawJson);
            drawObj.drawType = "busi_reg_label";
            addLabel(map, calculateCenter(pointArray), labelmsg, drawObj);
        });
        map.setViewport(pointArrayView);
    },
    showAdmRegList(map, drawObjList) {
        if (ll.debug) console.log("showAdmRegList");
        if (ll.debug) console.log(drawObjList);
        var boundary = new BMap.Boundary();
        var pointArrayView = new Array();
        var total = drawObjList.length;
        var cnt = 0;
        var that = this;
        // 获取行政区域
        $(drawObjList).each(function () {
            var drawObj = this;
            drawObj.type = "busi_reg_city_code";
            var labelmsg = '<span data-type="' + drawObj.type + '" data-code="' + drawObj.busiRegCode + '">' + drawObj.busiRegName + '</span>';
            boundary.get(drawObj.admRegName, function (rs) {
                var count = rs.boundaries.length;
                if (count === 0) {
                    printlog(ll.error, "未能获取行政区域:" + drawObj.admRegName);
                    return;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], map.mapConfig.styleOverlayPolygon);
                    pointArray = pointArray.concat(ply.getPath());
                    pointArrayView = pointArrayView.concat(pointArray);
                    ply.drawObj = drawObj;
                    ply.drawObj.drawType = "busi_reg";
                    map.addOverlay(ply);
                    drawObj.drawType = "busi_reg_label";
                    that.addLabel(map, that.calculateCenter(pointArray), labelmsg, drawObj);
                }
                cnt++;
                if (cnt == total) {
                    map.setViewport(pointArrayView);
                    map.panBy(-120, 0);
                }
            });
        });
    },




}
