import CommonUtil from "./CommonUtil"

/** log level **/
var ll={debug:false,info:false,error:true,temp:true};
var mll={debug:false};
var intervalTimer=null;



export default {
  // 添加覆盖物
    addMarkerList(map, type, drawObjList) {
        debugger
        for (var i = drawObjList.length-1; i > 0; i--) {
            var drawObj = drawObjList[i];
            var marker = null;
            if (drawObj.longitude!=undefined && drawObj.latitude!=undefined){
                var drawIcon;
                switch (type) {
                    case "rivalChl":
                        drawIcon = new BMap.Icon("../../images/device-location-icon.png", new BMap.Size(100,100));
                        break;
                    default :
                        break;
                }
                var point = new BMap.Point(drawObj.longitude, drawObj.latitude);
                if (CommonUtil.isNullObj(drawIcon)) {
                    marker = new BMap.Marker(point);
                } else {
                    marker = new BMap.Marker(point, {icon: drawIcon});
                }
                marker.drawObj = drawObj;
                marker.drawObj.drawType = "points";
                marker.type = type
                map.addOverlay(marker);
            }
        }

        //     $(drawObjList).each(function() {
        //         var drawObj=this;
        //         var marker = null;
        //         var point = new BMap.Point(drawObj.longitude, drawObj.latitude);
        //         if (CommonUtil.isNullObj(drawIcon)) {
        //             marker = new BMap.Marker(point);
        //         } else {
        //             marker = new BMap.Marker(point, { icon: drawIcon });
        //         }
        //         marker.drawObj = drawObj;
        //         marker.drawObj.drawType = "points";
        //         map.addOverlay(marker);

        //         // var infoBox = new BMapLib.InfoBox(map, drawObj.labelmsg, {
        //         //     offset: new BMap.Size(0, 58),
        //         //     boxStyle: map.mapConfig.styleOverlayMarkerInfoBox,
        //         //     closeIconUrl: map.mapConfig.iconPathEmpty
        //         // });
        //         // marker.addEventListener("mouseover", function (e) {
        //         //     infoBox.open(marker);
        //         //     $(".infoBox img").remove();
        //         // });
        //         // marker.addEventListener("mouseout", function (e) {
        //         //     $(".infoBox").hide();
        //         // });

        //         if (typeof (drawObj.efclick) == 'function') marker.addEventListener("click", drawObj.efclick);
        //     });
        // },
        // clearAllMarker:function(map) {
        //     if (ll.debug) console.log("clearAllMarker");
        //     var overlays = map.getOverlays();
        //     $(overlays).each(function () {
        //         if (!CommonUtil.isNullObj(this) && !CommonUtil.isNullObj(this.drawObj) &&
        //             this.drawObj.drawType == "points") {
        //             map.removeOverlay(this);
        //         }
        //     });
    },
    clearAllMarker:function(map) {
        if (ll.debug) console.log("clearAllMarker");
        var overlays = map.getOverlays();
        $(overlays).each(function () {
            if (!CommonUtil.isNullObj(this) && !CommonUtil.isNullObj(this.drawObj) &&
                this.drawObj.drawType == "points") {
                map.removeOverlay(this);
            }
        });
    },
    addMassivePoint(map,type,drawObjList){
        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
            var points = [];  // 添加海量点数据
            for (var i = 0; i < drawObjList.length; i++) {
                var drawObj = drawObjList[i];
                points.push(new BMap.Point(drawObj.longitude, drawObj.latitude));
            }
            var options = {
                size: BMAP_POINT_SIZE_SMALL,
                shape: BMAP_POINT_SHAPE_STAR,
                color: '#d340c3'
            }
            var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
            pointCollection.addEventListener('click', function (e) {
                alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
            });
            pointCollection.type = type
            map.addOverlay(pointCollection);  // 添加Overlay
        } else {
            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
        }
    },

}
