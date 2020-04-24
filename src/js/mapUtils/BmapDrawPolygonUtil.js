import CommonUtil from "./CommonUtil"
import BMapLib from 'BMapLib'
import form from "../../components/demo-components/form";

/** log level **/
var ll = {debug: false, info: false, error: true, temp: true};
var mll = {debug: false};
var intervalTimer = null;
var drawingManager = null;
var bmap;
var first;
var start;
var end;
var pathPoint=[];
var polyLineArr=[];
var utils;


export default {

    /**
     * 初始化绘制工具
     * @param bmap
     * @param mapConfig
     * @returns {null|BMapLib.DrawingManager}
     */
    initDrawingManager(bmap, mapConfig) {
        var that = this;
        var styleOverlayPolygon = mapConfig.styleOverlayPolygon;
        console.log(mapConfig)
        console.log(styleOverlayPolygon)
        var drawingToolOptions = {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //位置
            offset: new BMap.Size(20, 20), //偏离值
            scale: 0.8,
            drawingModes: [
                BMAP_DRAWING_MARKER,
                BMAP_DRAWING_POLYLINE,
                BMAP_DRAWING_POLYGON
            ]
        };
        var drawingManagerOption = {
            isOpen: true, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: drawingToolOptions,
            circleOptions: styleOverlayPolygon,
            polylineOptions: styleOverlayPolygon,
            polygonOptions: styleOverlayPolygon, //多边形的样式
            rectangleOptions: styleOverlayPolygon
        };
        //重新加载并实例化鼠标绘制工具
        that.drawingManager = null;
        that.drawingManager = new BMapLib.DrawingManager(bmap, drawingManagerOption);
        return that.drawingManager;
    },

    /**
     * 获取覆盖层的点数组
     * @param overlay
     * @returns {[]}
     */
    getPathByOverlay(overlay){
        var pointArray=[];
        if (!CommonUtil.isNullObj(overlay)){
            var path = overlay.getPath();
            for (var i = 0; i < path.length; i++) {
                pointArray.push(new BMap.Point(path[i].lng, path[i].lat)); //获得区域数组
                if (ll.debug) console.log("lng:" + path[i].lng + "\n lat:" + path[i].lat);
            }
        }
        return pointArray;
    },

    drawRectangle(bmap, mapConfig, cbdrawRectangle){
        if (ll.debug) console.log("BmapDrawPolygonUtil.drawPolygon");
        var that = this;
        that.initDrawingManager(bmap, mapConfig);
        that.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE)
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        that.drawingManager.addEventListener('overlaycomplete', function (e) {

            //绘制完成关闭绘制
            // that.drawingManager.close();
            var polygon = e.overlay;
            var _bmap = e.target._map;
            //多边形右键编辑多边形
            var polygonMenu = new BMap.ContextMenu();
            var txtMenuItem = [
                {
                    text: '开始编辑',
                    callback: function () {
                        polygon.enableEditing();
                    }
                },
                {
                    text: '关闭编辑',
                    callback: function () {
                        polygon.disableEditing();
                    }
                },
                {
                    text: '保存网格',
                    callback: function () {
                        if (!CommonUtil.isNullObj(cbdrawRectangle) && typeof cbdrawRectangle == 'function') {
                            var pointdata=that.getPathByOverlay(polygon);
                            cbdrawRectangle(pointdata);
                        }
                    }
                },
                {
                    text: '删除网格',
                    callback: function () {
                        _bmap.removeOverlay(polygon);
                    }
                }
            ];
            for (var i = 0; i < txtMenuItem.length; i++) {
                polygonMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
            }
            polygon.addContextMenu(polygonMenu);
            //多边形点数组
            if (!CommonUtil.isNullObj(cbdrawRectangle) && typeof cbdrawRectangle == 'function') {
                var pointdata=that.getPathByOverlay(polygon);
                cbdrawRectangle(pointdata);
            }
        });
        return bmap;
    },

    /**
     * 绘制多边形
     * @param bmap
     * @param mapConfig
     * @param cbDrawPolygon
     * @returns {*}
     */
    drawPolygon(bmap, mapConfig, cbDrawPolygon) {
        if (ll.debug) console.log("BmapDrawPolygonUtil.drawPolygon");
        var that = this;
        that.initDrawingManager(bmap, mapConfig);
        that.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON)
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        that.drawingManager.addEventListener('overlaycomplete', function (e) {
            //绘制完成关闭绘制
            that.drawingManager.close();
            var polygon = e.overlay;
            var _bmap = e.target._map;
            //多边形右键编辑多边形
            var polygonMenu = new BMap.ContextMenu();
            var txtMenuItem = [
                {
                    text: '开始编辑',
                    callback: function () {
                        polygon.enableEditing();
                    }
                },
                {
                    text: '关闭编辑',
                    callback: function () {
                        polygon.disableEditing();
                    }
                },
                {
                    text: '保存网格',
                    callback: function () {
                        if (!CommonUtil.isNullObj(cbDrawPolygon) && typeof cbDrawPolygon == 'function') {
                            var pointdata=that.getPathByOverlay(polygon);
                            cbDrawPolygon(pointdata);
                        }
                    }
                },
                {
                    text: '删除网格',
                    callback: function () {
                        _bmap.removeOverlay(polygon);
                    }
                }
            ];
            for (var i = 0; i < txtMenuItem.length; i++) {
                polygonMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
            }
            polygon.addContextMenu(polygonMenu);
            //多边形点数组
            if (!CommonUtil.isNullObj(cbDrawPolygon) && typeof cbDrawPolygon == 'function') {
                var pointdata=that.getPathByOverlay(polygon);
                cbDrawPolygon(pointdata);
            }
        });
        return bmap;
    },

    /**
     * 绘制连线
     * @param bmap
     * @param mapConfig
     * @param cbDrawPolygonLine
     * @returns {*}
     */
    drawPolygonLine(bmap, mapConfig, cbDrawPolygonLine) {
        if (ll.debug) console.log("BmapDrawPolygonUtil.drawPolygonLine");
        var that = this;
        that.initDrawingManager(bmap, mapConfig);
        that.drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE)
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        that.drawingManager.addEventListener('overlaycomplete', function (e) {
            //绘制完成关闭绘制
            that.drawingManager.close();
            var map = e.target._map;
            var overlay=e.overlay;
            overlay.enableEditing();
            if (!CommonUtil.isNullObj(cbDrawPolygonLine) && typeof cbDrawPolygonLine == 'function') {
                var pointData=that.getPathByOverlay(overlay);
                cbDrawPolygonLine(pointData)
            }
        });
        return bmap;
    },

    /**
     * 沿路绘制
     * @param bmap
     * @param mapConfig
     * @param cbDrawPolygonAlongRoad
     */
    drawPolygonAlongRoad(bmap, mapConfig, cbDrawPolygonAlongRoad){
        if (ll.debug) console.log("BmapDrawPolygonUtil.drawPolygonAlongRoad");
        var that = this;
        bmap.addEventListener('click', function (e) {
            that.onClick(e,bmap,that);
        });
        //右键或者双击时结束绘制
        bmap.addEventListener('dblclick', function (e) {
            first = null
            start = null
            end = null
            map.removeEventListener('click', that.onClick(e))
            //reservePath()
        });
        //右键单击结束绘制
        //保存所有的路径、还有线，以便删除
        bmap.addEventListener('rightclick', function (e) {
            first = null
            start = null
            end = null
            //此时需要重新组成多边形
            //还可以删除相应的点
            map.removeEventListener('click', that.onClick(e))
            //保存路线坐标
            //reservePath()
        });
    },

    walk(bmap,start, end){
        var that=this;
        var options = {
            renderOptions: {
                //不显示搜索了，直接画图吧
                //map: map,
                //autoViewport: true
            },
            onSearchComplete: function (results) {

                if (walking.getStatus() == BMAP_STATUS_SUCCESS) {
                    var plan = results.getPlan(0);
                    var path = []
                    var routesNum = plan.getNumRoutes();
                    for (var i = 0; i < routesNum; i++) {
                        var route = plan.getRoute(i);
                        var routePath = route.getPath();
                        var pathLength = routePath.length
                        for (var j = 0; j < pathLength; j++) {
                            path.push(routePath[j]);
                        }
                    }
                    var allPathPoint=pathPoint.concat(path)
                    pathPoint=Array.from(new Set(allPathPoint))
                    //开始绘制折线
                    that.drawWalkLine(pathPoint,bmap)
                }
            }
        };
        var walking = new BMap.WalkingRoute(bmap, options);
        walking.search(start, end);
    },

    drawWalkLine(path,bmap){
        var polyline = new BMap.Polyline(path, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
        bmap.addOverlay(polyline);
        polyLineArr.push(polyline);
        console.log(polyLineArr)
    },

    onClick(e,bmap,that){
        //将坐标填的 ul
        //console.log(e.lnglat)
        if (!start) {
            // map.setCenter(e.point)
            start = e.point
            end = e.point
        } else {
            //这里可能还有修正最后的点
            start = end
            end = e.point
            that.walk(bmap,start,end)
        }
    },

    /**
     * 沿路绘制完成
     * @param bmap
     * @param mapConfig
     * @param cbDrawPolygonAlongRoadOver
     */
    drawPolygonAlongRoadOver(bmap, mapConfig, cbDrawPolygonAlongRoadOver){
        let that=this;
        //只能获取所有的折线a
        var overlays = bmap.getOverlays();
        var overlay=overlays[overlays.length-1]
        var path = overlay.getPath();
        //开始绘制多边形
        var polygon = new BMap.Polygon(path, mapConfig.styleOverlayPolygon);  //创建多边形
        //从地图上清楚绘制的线条
        for (let i = 0; i < polyLineArr.length; i++) {
            var polyLine=polyLineArr[i];
            bmap.removeOverlay(polyLine);
        }
        polyLineArr=[];
        bmap.addOverlay(polygon);
        var ctxMenu = new BMap.ContextMenu();
        ctxMenu.addItem(new BMap.MenuItem('开始编辑', function () {
            polygon.enableEditing();
        }));
        ctxMenu.addItem(new BMap.MenuItem('关闭编辑', function (e, ee) {
            polygon.disableEditing();
        }));
        ctxMenu.addItem(new BMap.MenuItem('删除网格', function (e, ee) {
            bmap.removeOverlay(polygon);
        }));
        ctxMenu.addItem(new BMap.MenuItem('保存网格', function (e, ee) {
            var opts = {
                width: 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title: "网格信息保存", // 信息窗口标题
                enableMessage: true,//设置允许信息窗发送短息
                message: "这里可以填写网格名称、类型等信息，最后保存"
            }
            var infoWindow = new BMap.InfoWindow("这里可以填写网格名称、类型等信息，最后保存<button>保存网格</button>", opts);  // 创建信息窗口对象

            bmap.openInfoWindow(infoWindow, e); //开启信息窗口
            console.log("保存网格")
            console.log(e)
            console.log(ee)

        }));

        ctxMenu.addItem(new BMap.MenuItem('渠道搜索', function (e, ee) {
            var opts = {
                width: 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title: "渠道数量查询", // 信息窗口标题
                enableMessage: true,//设置允许信息窗发送短息
                message: "这里可以后台查询当前条件下的渠道数量等"
            }
            var infoWindow = new BMap.InfoWindow("这里可以后台查询当前条件下的渠道数量等，进行显示<button>查询</button>", opts);  // 创建信息窗口对象
            bmap.openInfoWindow(infoWindow, e); //开启信息窗口
        }));
        polygon.addContextMenu(ctxMenu)
    }

}
