<template>
    <div>
        <div class="h-panel">
            <div class="h-panel-bar">
                <div class="h-panel-title">常用标签</div>
                <div class="h-panel-right"><span class="gray-color">共有</span><i class="h-split"></i><span
                        class="font20 primary-color">{{total}}</span><i class="h-split"></i><span
                        class="gray-color">个常用标签</span></div>
            </div>
            <div class="h-panel-body" style="min-height:351px">
                <el-table
                        :data="commonNetTagList"
                        style="width: 100%"
                        max-height="320"
                        :loading="loading"
                >
                    <el-table-column
                            prop="icon"
                            label="标志"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="tagTitle"
                            label="标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="链接"
                            width="400"
                    >
                        <template slot-scope="scope">
                            <a :href="scope.row.tagPath" target="_blank">{{scope.row.tagPath}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                        :hide-on-single-page="false"
                        :total="total"
                        :page-size="queryParams.pageSize"
                        layout="prev, pager, next"
                        @current-change="handlePageChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCommonNetTag} from "../../../../js/request/netTagReq"

    export default {
        name: "commonNetTag",
        data() {
            return {
                commonNetTagList: [],
                queryParams:{
                    pageNum:1,
                    pageSize:5
                },
                loading:false,
                total:0
            }
        },
        methods:{
            handlePageChange(pageNum){
                this.queryParams.pageNum=pageNum
                this.initCommonNetTagList()
            },
            initCommonNetTagList(){
                let _this=this;
                _this.loading=true
                getCommonNetTag(_this.queryParams).then(res=>{
                    if (res.data.errorCode && res.data.errorCode=='0000'){
                        _this.loading=true
                        let dataBody=res.data.body
                        _this.commonNetTagList=dataBody.list
                        _this.total=dataBody.total
                    }
                })
            }
        },
        mounted() {
            this.initCommonNetTagList();
        }
    }
</script>

<style scoped>

</style>
