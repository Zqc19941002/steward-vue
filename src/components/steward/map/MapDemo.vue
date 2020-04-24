<template>
    <div>
        <div id="allmap"></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <BmapTools @drawPolygonEvent="drawPolygonMapdemo"
                   @drawPolygonLineEvent="drawPolygonLine"
                   @drawPolygonAlongRoadEvent="drawPolygonAlongRoad"
                   @drawPolygonAlongRoadOverEvent="drawPolygonAlongRoadOver"
                   @editLineOrPloygonEvent="editLineOrPloygon"
                   @drawRectangleEvent="drawRectangle"
                   @showGrid="showGrid"
                   @showRivalChl="showRivalChl">
        </BmapTools>
    </div>

</template>

<script>
    import BMap from 'BMap'
    import BmapUtil from '../../../js/mapUtils/BMapUtils'
    import BmapTools from "./BmapTools";
    import BaiduMap from "../../common/baidu-map/baidu-map";
    import {queryGridList,saveGrid,queryRivalList} from "../../../js/request/gridReq.js";

    export default {
        name: "MapDemo.vue",
        components: {BmapTools, BaiduMap},
        data() {
            return {
                map: null,
                mapConfig: {
                    divId: "allmap",
                    enableMapClick: false,
                    zoom: 11,
                    centerName: '西宁',
                    enableScrollWheelZoom: true,
                    styleOverlayPolygon: {
                        strokeColor: "#F1AA59",
                        fillColor: "#F1AA59",
                        strokeWeight: 2,
                        strokeOpacity: 0.8,
                        fillOpacity: 0.15,
                        strokeStyle: 'solid'
                    }
                }
            }
        },
        mounted() {
            window.oncontextmenu = function (e) {
                //取消默认的浏览器自带右键 很重要！！
                e.preventDefault();
            }
            this.initPage();
        },
        methods: {
            initPage() {
                let that = this;
                that.map = null;
                that.map = BmapUtil.showMap(that.map, that.mapConfig);
                console.log("MapDemo.initPage " + that.map)
            },
            showGrid(isShow) {
                let that = this;
                var gridArr=[];
                if (isShow){
                    queryGridList({}).then(res=> {
                        if (res.data.errorCode==='0000'){
                            gridArr=res.data.body
                            BmapUtil.showShange(that.map,gridArr)
                        }

                    }).catch(function () {
                        that.$Notice["error"]('栅格列表获取失败');
                    })
                }else {
                    BmapUtil.deleteOverlays(that.map,"grid");
                }


            },

            showRivalChl(isShow){
                let that=this;
                if (isShow){
                    queryRivalList({}).then(res=>{
                        if (res.data.errorCode==='0000'){
                            var rivalArr=res.data.body
                            debugger
                            BmapUtil.addMarkerList(that.map,"rivalChl",rivalArr)
                        }
                    }).catch(function () {
                        that.$Notice["error"]('竞争对手获取失败');
                    })
                }else {
                    BmapUtil.deleteOverlays(that.map,"rivalChl");
                }
            },
            drawRectangle(){
                var that = this;
                console.log("MapDemo.drawRectangle " + that.map)
                that.map = BmapUtil.drawRectangle(that.map, that.mapConfig, that.drawRectangleComplete)
            },
            /**
             * 多边形绘制
             */
            drawPolygonMapdemo() {
                var that = this;
                console.log("MapDemo.drawPolygonMapdemo " + that.map)
                that.map = BmapUtil.drawPolygon(that.map, that.mapConfig, that.drawPolygonComplete)
            },

            /**
             * 连线绘制
             */
            drawPolygonLine() {
                var that = this;
                console.log("MapDemo.drawPolygonLine " + that.map)
                that.map = BmapUtil.drawPolygonLine(that.map, that.mapConfig, that.drawPolygonLineComplete)
            },

            /**
             *沿路绘制
             */
            drawPolygonAlongRoad() {
                var that = this;
                console.log("MapDemo.drawPolygonAlongRoad " + that.map)
                BmapUtil.drawPolygonAlongRoad(that.map, that.mapConfig, that.drawPolygonAlongRoadComplete)
            },

            /**
             * 沿路绘制完成
             */
            drawPolygonAlongRoadOver() {
                var that = this;
                console.log("MapDemo.drawPolygonAlongRoadOver " + that.map)
                BmapUtil.drawPolygonAlongRoadOver(that.map, that.mapConfig, that.drawPolygonAlongRoadOverComplete)
            },

            editLineOrPloygon() {
                alert("编辑")
            },

            //回调函数

            drawPolygonComplete(e) {
                alert("多边形绘制完成")
                console.log(e)
            },

            drawPolygonLineComplete(e) {
                alert("连线绘制完成")
                console.log(e)
            },
            drawPolygonAlongRoadComplete(e) {
                alert("沿路绘制完成")
                console.log(e)
            },
            drawPolygonAlongRoadOverComplete(e) {
                alert("沿路绘制完成绘制多边形成功")
                console.log(e)
            },
            drawRectangleComplete(pointArr){
                var that=this;
                var params={
                    id:new Date().getTime(),
                    longitudeCenter: '',
                    latitudeCenter: '',
                    leftDownLon: pointArr[2].lng,
                    leftDownLat: pointArr[2].lat,
                    leftUpLon: pointArr[0].lng,
                    leftUpLat: pointArr[0].lat,
                    rightUpLon: pointArr[1].lng,
                    rightUpLat: pointArr[1].lat,
                    rightDownLon: pointArr[3].lng,
                    rightDownLat: pointArr[3].lat
                }

                saveGrid(params).then(res => {
                    if (res.data.errorCode==='0000'){
                        that.$Notice["success"](res.data.errorMessage);
                    }else {
                        that.$Notice["error"](res.data.errorMessage);
                    }
                }).catch(function () {
                    that.$Notice["error"]("网络异常");
                })
            }
        },
        comments: {
            BmapTools
        }
    }
</script>

<style scoped>
    #allmap {
        width: 1296px;
        height: 659.2px;
    }
    .box-card{
        width: 500px;
    }
</style>
