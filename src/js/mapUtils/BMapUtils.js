import BMap from 'BMap'
import BMapLib from 'BMapLib'
import CommonUtil from "./CommonUtil"
import BmapPolygonUtil from "./BmapPolygonUtil"
import BmapMarkerUtil from "./BmapMarkerUtil"
import BmapDrawPolygonUtil from "./BmapDrawPolygonUtil";

/** log level **/
var ll={debug:true,info:false,error:true,temp:true};
var mll={debug:false};
var intervalTimer=null;


export default {
    showMap:function(map,mapConfig) {
        let that=this;
        if(ll.debug) console.log("BmapUtil.showMap");
        mapConfig=that.setDefaultConfig(mapConfig);
        if(ll.debug) console.log(mapConfig);
        var bmap=new BMap.Map(mapConfig.divId,{enableMapClick:mapConfig.enableMapClick,minZoom:mapConfig.minZoom,maxZoom:mapConfig.maxZoom});
        bmap.mapConfig=mapConfig;
        bmap.centerAndZoom(mapConfig.centerName,mapConfig.zoom);
        bmap.enableScrollWheelZoom(mapConfig.enableScrollWheelZoom);
        bmap.groups={polygonGroups:{},polygonLabelGroups:{},markerGroups:{},markerLabelGroups:{}};
        bmap.tool={};
        if(mll.debug) {
            bmap.off("click");
            bmap.on("click",function(e) {
                console.log(e);
            });
        }
        if(mapConfig.isAddScale) {
            var bmapScale=new BMap.ScaleControl();
            bmap.tool.scale=bmapScale;
            bmap.addControl(bmapScale);
        }
        if(mapConfig.isAddNavigation) {
            var bmapNavigation=new BMap.NavigationControl();
            bmap.tool.navigation=bmapNavigation;
            bmap.addControl(bmapNavigation);
        }
        bmap.mapConfig=mapConfig;
        console.log(bmap);
        return bmap;
    },

    showShange(map,shangeArr) {
        var bs = map.getBounds();   //获取地图边界
        for (let i = 0; i < shangeArr.length; i++) {
            var grid_point=shangeArr[i];
            var isin = BMapLib.GeoUtils.isPointInRect(grid_point, bs);  //判断是否入界
            isin=true
            if (isin) {      //
                // alert(idx+"::::"+a_gridid[idx]+"::"+a_flo[idx]);
                // 绘制矩形
                // var pStart = new BMap.Point(grid_point.lng + gridsize, grid_point.lat + gridsize);
                // var pEnd = new BMap.Point(grid_point.lng - gridsize, grid_point.lat - gridsize);
                var polygon = new BMap.Polygon([
                    new BMap.Point(grid_point.leftUpLon, grid_point.leftUpLat),
                    new BMap.Point(grid_point.rightUpLon, grid_point.rightUpLat),
                    new BMap.Point(grid_point.leftDownLon, grid_point.leftDownLat),
                    new BMap.Point(grid_point.rightDownLon, grid_point.rightDownLat)
                ], {
                    strokeColor: 'blue',
                    strokeWeight: 2,
                    strokeOpacity: 0,
                    fillOpacity: 0.5,
                    fillColor: 'blue'
                });
                polygon.type='grid';
                map.addOverlay(polygon);
            }
        }
    },

    destroyMap:function(map) {
        if(!CommonUtil.isNullObj(map)) {
            if(typeof(map.destroy)==="function") {
                map.destroy();
            }
            map=null;
        }
        return map;
    },



    addDrawMarkerTool(map,cbDrawMarker) {
        if(ll.debug) console.log("BmapUtil.addDrawMarkerTool");
        return map;
    },

    addDrawPolygonTool(map,cbDrawPolygon) {
        if(ll.debug) console.log("BmapUtil.addDrawMarkerTool");
        return map;
    },



    showPolygon(map,dataPolygon) {
        if(ll.debug) console.log("BmapUtil.showPolygon");
        return map;
    },

    showPolygonList(map,dataPolygons) {
        if(ll.debug) console.log("BmapUtil.showPolygonList");
        if(ll.debug) console.log(dataPolygons);
        return BmapPolygonUtil.addPolygonList(map,dataPolygons);
    },
    showAdmRegList(map, drawObjList){
        if(ll.debug) console.log("BmapUtil.showAdmRegList");
        if(ll.debug) console.log(drawObjList);
        return BmapPolygonUtil.showAdmRegList(map, drawObjList);
    },
    addMarkerList(map,markerType,dataMarkers) {
        if(ll.debug) console.log("BmapUtil.addMarkerList");
        if(ll.debug) console.log(markerType);
        return BmapMarkerUtil.addMarkerList(map,markerType,dataMarkers);
    },

    clearMarkers(map,markerType) {
        if(ll.debug) console.log("BmapUtil.clearMarkers");
        if(ll.debug) console.log(markerType);
        return BmapMarkerUtil.clearAllMarker(map);
    },
    addMassivePoint(map,type,drawObjList){
        if(ll.debug) console.log("BmapUtil.addMassivePoint");
        //if(ll.debug) console.log(markerType);
        return BmapMarkerUtil.addMassivePoint(map,type,drawObjList);
    },





    drawRectangle(bmap,mapConfig,callBcak){
        var that=this;
        if(ll.debug) console.log("BmapUtil.drawRectangle");
        var mapConfig=that.setDefaultConfig(mapConfig);
        return BmapDrawPolygonUtil.drawRectangle(bmap,mapConfig,callBcak);
    },

    //my
    /**
     *
     * @param bmap
     * @param mapConfig 地图配置-获取绘制线条的样式和绘制工具的配置
     * @param callBcak 回调函数
     * @returns {*}
     */
    drawPolygon(bmap,mapConfig,callBcak){
        var that=this;
        if(ll.debug) console.log("BmapUtil.drawPolygon");
        var mapConfig=that.setDefaultConfig(mapConfig);
        return BmapDrawPolygonUtil.drawPolygon(bmap,mapConfig,callBcak);
    },

    /**
     *
     * @param bmap
     * @param mapConfig 地图配置-获取绘制线条的样式和绘制工具的配置
     * @param callBcak 回调函数
     */
    drawPolygonLine(bmap,mapConfig,callBcak) {
        var that=this;
        if(ll.debug) console.log("BmapUtil.drawPolygonLine");
        var mapConfig=that.setDefaultConfig(mapConfig);
        return BmapDrawPolygonUtil.drawPolygonLine(bmap,mapConfig,callBcak);
    },

    /**
     * 沿路绘制
     * @param bmap
     * @param mapConfig
     * @param callBcak
     */
    drawPolygonAlongRoad(bmap,mapConfig,callBcak){
        var that=this;
        if(ll.debug) console.log("BmapUtil.drawPolygonAlongRoad");
        var mapConfig=that.setDefaultConfig(mapConfig);
        BmapDrawPolygonUtil.drawPolygonAlongRoad(bmap,mapConfig,callBcak);
    },

    /**
     * 沿路绘制完成
     * @param bmap
     * @param mapConfig
     * @param callBcak
     */
    drawPolygonAlongRoadOver(bmap,mapConfig,callBcak){
        var that=this;
        if(ll.debug) console.log("BmapUtil.drawPolygonAlongRoadOver");
        var mapConfig=that.setDefaultConfig(mapConfig);
        BmapDrawPolygonUtil.drawPolygonAlongRoadOver(bmap,mapConfig,callBcak);
    },

    /**
     * 删除资源
     */
    deleteOverlays(map,type){
        var allOverlays=map.getOverlays();
        for (let i = 0; i < allOverlays.length; i++) {
            if (allOverlays[i].type===type){
                map.removeOverlay(allOverlays[i]);
            }
        }
    },












    calculateCenter:function(lnglatArray) {
        var total=lnglatArray.length;
        var X=0,Y=0,Z=0;
        for(var j=0;j<lnglatArray.length;j++) {
            var lng=lnglatArray[j][0]*Math.PI/180;
            var lat=lnglatArray[j][1]*Math.PI/180;
            var x,y,z;
            x=Math.cos(lat)*Math.cos(lng);
            y=Math.cos(lat)*Math.sin(lng);
            z=Math.sin(lat);
            X+=x;
            Y+=y;
            Z+=z;
        }
        X=X/total;
        Y=Y/total;
        Z=Z/total;
        var Lng=Math.atan2(Y,X);
        var Hyp=Math.sqrt(X*X+Y*Y);
        var Lat=Math.atan2(Z,Hyp);
        var reslng=Lng*180/Math.PI;
        var reslat=Lat*180/Math.PI;
        return [reslng,reslat];
    },

    getContextPath:function() {
        var pathName=document.location.pathname;
        var index=pathName.substr(1).indexOf("/");
        var result=pathName.substr(0,index+1);
        return result;
    },

    setDefaultConfig:function(mapConfig) {
        let that=this;
        /** judge null part * */
        mapConfig                            =CommonUtil.setDefaultObj(mapConfig,{});
        // map 对象 对应页面divId
        mapConfig.divId                      =CommonUtil.setDefaultStr(mapConfig.divId,"mapcontainer");
        // 展示省份名称
        mapConfig.provinceName               =CommonUtil.setDefaultStr(mapConfig.provinceName,"青海");
        // 省份地图行政编码
        mapConfig.provinceMapCode            =CommonUtil.setDefaultStr(mapConfig.provinceMapCode,"520000");
        // 展示中心点坐标
        mapConfig.centerPoint                =CommonUtil.setDefaultStr(mapConfig.centerPoint,[106.647217,26.627152]);
        // 放大比例
        mapConfig.zoom                       =CommonUtil.setDefaultObj(mapConfig.zoom,6);
        // 最大放大比例
        mapConfig.minZoom                    =CommonUtil.setDefaultObj(mapConfig.minZoom,2);
        mapConfig.maxZoom                    =CommonUtil.setDefaultObj(mapConfig.maxZoom,20);
        // 是否添加比例尺
        mapConfig.isAddScale                 =CommonUtil.setDefaultObj(mapConfig.isAddScale,false);
        // 是否添加方向盘、定位及标尺
        mapConfig.isAddNavigation            =CommonUtil.setDefaultObj(mapConfig.isAddNavigation,true);
        mapConfig.toolBarOffsetX             =CommonUtil.setDefaultObj(mapConfig.toolBarOffsetX,0);
        mapConfig.toolBarOffsetY             =CommonUtil.setDefaultObj(mapConfig.toolBarOffsetY,-50);
        mapConfig.isShowtoolBarDirection     =CommonUtil.setDefaultObj(mapConfig.isShowtoolBarDirection,false);
        // 是否显示浮动提示框
        mapConfig.isShowTooltip              =CommonUtil.setDefaultObj(mapConfig.isShowTooltip,true);
        mapConfig.tooltipText                =CommonUtil.setDefaultStr(mapConfig.tooltipText,"单击显示看板，双击下钻地图");

        // 点是否可点击
        mapConfig.isMarkerClickable          =CommonUtil.setDefaultObj(mapConfig.isMarkerClickable,true);
        mapConfig.isMarkerTopWhenClick       =CommonUtil.setDefaultObj(mapConfig.isMarkerTopWhenClick,true);



        /** extend resources **/
        mapConfig.iconPathBase               =that.getContextPath()+"/resources/template/images/";
        mapConfig.iconPathEmpty              =that.getContextPath()+"/resources/template/images/empty.png";
        mapConfig.iconPathCM                 =mapConfig.iconPathBase+"map-icon1.png";
        mapConfig.iconPathCT                 =mapConfig.iconPathBase+"map-icon2.png";
        mapConfig.iconPathCU                 =mapConfig.iconPathBase+"map-icon3.png";
        mapConfig.iconPathCUCT               =mapConfig.iconPathBase+"map-icon4.png";


        /** style **/
        mapConfig.styleOverlayPolygonRedEdgedWhiteFilled   ={strokeColor:"red",strokeWeight:3,strokeOpacity:0.8,fillOpacity:0.6,strokeStyle:'solid'};
        mapConfig.styleOverlayPolygonGreenEdged            ={strokeColor:"#00ce6d",strokeWeight:2,strokeOpacity:0.8,fillOpacity:0.1,strokeStyle:'solid'};
        mapConfig.styleOverlayPolygonGreenFilled           ={strokeColor:"#00ce6d",fillColor:"#00ce6d",strokeWeight:2,strokeOpacity:0.8,fillOpacity:0.15,strokeStyle:'solid'};
        mapConfig.styleOverlayLabelBlackBg                 ={color:"white",fontSize:"16px",height:"32px",backgroundColor:'#00ce6d',fontFamily:"微软雅黑",textAlign:"center",padding:"5px 0 0 0",border:"none",fontWeight:"bold"};
        mapConfig.styleOverlayInfoBoxBlackBg               ={color:"white",fontSize:"16px",height:"32px",backgroundColor:'#00ce6d',fontFamily:"微软雅黑",textAlign:"center",padding:"5px 0 0 0",border:"none",fontWeight:"bold"};
        mapConfig.styleOverlayLabelBackgroundBuleGreen     ="linear-gradient(to left,#00ca78 0%,#00a4ec 100%)";

        mapConfig.style                                    =CommonUtil.setDefaultObj(mapConfig.style,{});
        mapConfig.styleOverlayPolygon                      =CommonUtil.setDefaultObj(mapConfig.styleOverlayPolygon,mapConfig.styleOverlayPolygonGreenFilled);
        mapConfig.styleOverlayLabel                        =CommonUtil.setDefaultObj(mapConfig.styleOverlayLabel,{});
        mapConfig.styleOverlayMarkerIcon                   =CommonUtil.setDefaultObj(mapConfig.styleOverlayMarkerIcon,mapConfig.iconPathCM);
        mapConfig.styleOverlayMarkerLabel                  =CommonUtil.setDefaultObj(mapConfig.styleOverlayMarkerLabel,mapConfig.styleOverlayLabelBlackBg);
        mapConfig.styleOverlayMarkerInfoBox                =CommonUtil.setDefaultObj(mapConfig.styleOverlayMarkerInfoBox,mapConfig.styleOverlayInfoBoxBlackBg);

        return mapConfig;
    }
};
