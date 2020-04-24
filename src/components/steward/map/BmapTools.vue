<template>
    <div class="map-tool-container">
        <el-row>
            <!--<el-button size="mini" @click="drawPolygon"><i class="iconfont">&#xe6ec;</i>多边形</el-button>
            <el-button size="mini" @click="drawPolygonLine">连线</el-button>
            <el-button size="mini" @click="drawPolygonAlongRoad">沿路绘制</el-button>
            <el-button size="mini" @click="drawPolygonAlongRoadOver">沿路绘制完成</el-button>
            <el-button size="mini" @click="drawPolygonLine">连线</el-button>
            <el-button size="mini" @click="editLineOrPloygon">编辑线、面</el-button>
            <el-button size="mini" @click="show">展示栅格</el-button>-->
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <el-dropdown size="small" trigger="click" @command="handleCommand">
                        <el-button type="primary">
                            绘制工具<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="r">矩形</el-dropdown-item>
                            <el-dropdown-item command="p">多边形</el-dropdown-item>
                            <el-dropdown-item command="l">连线</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <el-dropdown size="small" trigger="click">
                        <el-button type="primary">
                            资源展示<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-checkbox v-model="showView.isShowShange" @change="showShange">栅格</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="showView.isShowRivalChl" @change="showRivalChl">竞争对手</el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "BmapTools.vue",
        data() {
            return {
                showView: {
                    isShowShange: false,
                    isShowRivalChl:false
                }
            }
        },
        methods: {
            handleCommand(command) {
                let that = this;
                switch (command) {
                    case "a":
                        var flag = that.showView.isShowShange
                        this.$emit("showGrid", flag)
                        break;
                    case "p":
                        this.$emit("drawPolygonEvent")
                        break;
                    case "l":
                        this.$emit("drawPolygonLineEvent")
                        break;
                    case "r":
                        this.$emit("drawRectangleEvent")
                        break;
                    default:
                        break
                }
            },

            /**
             * 展示栅格
             * */
            showShange() {
                let that = this;
                var flag = that.showView.isShowShange
                if (!flag) {
                    this.$emit("showGrid", flag)
                    return;
                }
                this.$emit("showGrid", flag)
            },

            /**
             * 展示竞争对手
             * */
            showRivalChl(){
                let that = this;
                var flag = that.showView.isShowRivalChl
                if (!flag) {
                    this.$emit("showRivalChl", flag)
                    return;
                }
                this.$emit("showRivalChl", flag)
            },

            /**
             * 多边形绘制
             */
            drawPolygon() {
                this.$emit("drawPolygonEvent")
            },
            /**
             * 连线绘制
             */
            drawPolygonLine() {
                this.$emit("drawPolygonLineEvent")
            },
            /**
             * 沿路绘制
             */
            drawPolygonAlongRoad() {
                this.$emit("drawPolygonAlongRoadEvent")
            },
            /**
             * 沿路绘制完毕
             */
            drawPolygonAlongRoadOver() {
                this.$emit("drawPolygonAlongRoadOverEvent")
            },
            editLineOrPloygon() {
                this.$emit("editLineOrPloygonEvent")
            }
        }
    }
</script>

<style scoped>
    .map-tool-container {
        padding: 0 5px;
        position: absolute;
        top: 20px;
        right: 50px;
        width: 255px;
    }
</style>
