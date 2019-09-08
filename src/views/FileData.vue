<template>
    <div class="h-panel frame-page" id="fileData">
        <div class="h-panel-bar">
            <div class="el-row">
                <div class="el-col-6">
                    文件管理-[{{currentFileType}}]
                </div>
                <div class="el-col-18" style="display:flex;justify-content: space-between">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="(crumb,index) in breadcrumb">{{crumb.crumbName}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <FileManagerToolBar @setEditable="setEditable" @createFile="createFileOrFolder"></FileManagerToolBar>
                </div>
            </div>
        </div>
        <div class="h-panel-body">
            <Layout>
                <Sider>
                    <div class="h-panel">
                        <div class="h-panel-body bottom-line">
                            <Search placeholder="查询" v-width="200"></Search>
                            <i class="h-split"></i>
                        </div>
                    </div>
                </Sider>
                <Content>
                    <el-tabs :tab-position="tabPosition" :editable="editable" style="height: 500px;"
                             @tab-click="handleFileTabClick">
                        <el-tab-pane v-for="(item,index) in fileData" :key="index" :label="item.typeLabel">
                            <div class="h-panel-body">
                                <el-tabs v-model="activeName">
                                    <el-tab-pane label="全部展示" name="second">
                                        <AllFile :fileData="item.all" @refreshFileData="refreshFileData"></AllFile>
                                    </el-tab-pane>
                                    <el-tab-pane label="最近查看" name="first">
                                        <RecentFile :fileData="item.recent"></RecentFile>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </Content>
            </Layout>
        </div>
    </div>
</template>
<script>
    import RecentFile from "../components/steward/filedata/RecentFile";
    import AllFile from "../components/steward/filedata/AllFile";
    import FileManagerToolBar from "../components/steward/filedata/FileManagerToolBar";
    import {saveFile,getFileList,getFileTypeList} from '../js/request/fileDataReq.js'
    export default {
        name: "FileData",
        watch: {
            "type": function (vars) {
                alert(vars)
            }
        },
        data() {
            return {
                tabPosition: 'right',
                currentFileType: "",
                editable: false,
                activeName: "second",
                fileData: [],
                breadcrumb:[{
                    crumbName:'文件',
                    crumbId:'',
                }]

            };
        },
        methods: {
            handleFileTabClick(args) {
                this.currentFileType = args.label
                let fileTypeId='';
                let fileData=this.fileData;
                for (let i = 0; i < fileData.length; i++) {
                    if(args.label===fileData[i].typeLabel){
                        fileTypeId=fileData[i].fileTypeId
                        break;
                    }
                }
                this.breadcrumb[1]={
                    crumbName: this.currentFileType,
                    crumbId:fileTypeId
                }
            },
            //初始化文件
            initFileData() {
                let _this=this;
                //获取文件类型
                let typeParams={
                    userId:"duanhong"
                }
                //获取文件类别及其文件，新增或者删除文件或者文件类别时重新加载
                getFileTypeList(typeParams).then(res=>{
                    if (res.data.errorCode==="0000"){
                        _this.fileData=res.data.body
                        //初始化更新面包屑
                        if(_this.fileData.length>0&& _this.breadcrumb.length===1){
                            _this.breadcrumb[1]={
                                crumbName:_this.fileData[0].typeLabel,
                                crumbId:_this.fileData[0].fileTypeId
                            };
                            _this.currentFileType=_this.fileData[0].typeLabel;
                        }
                        for (let i=0;i<_this.fileData.length;i++){
                            let params={
                                fileTypeId:_this.fileData[i].fileTypeId
                            }
                            //根据文件类别加载文件
                            getFileList(params).then(res=>{
                                if(res.data.errorCode==="0000"){
                                    _this.fileData[i].all=res.data.body;
                                }
                            }).catch(function () {
                                _this.$Notice['error'](_this.fileData[i].name+'的文件列表加载失败');
                            })
                        }
                    }
                }).catch(function () {
                    _this.$Notice['error']('文件类目加载失败');
                })
            },
            //设置文件类别编辑开关
            setEditable(args) {
                this.editable = args
            },
            createFileOrFolder(newFileInfo){
                let _this=this;
                let parentId=undefined;
                if (this.breadcrumb.length>2){
                    parentId=this.breadcrumb[this.breadcrumb.length-1].crumbId
                }
                let params={
                    name:newFileInfo.name,
                    fileTypeId:this.breadcrumb[1].crumbId,
                    type:newFileInfo.type,
                    userId:'duanhong',
                    parentId:parentId

                }
                saveFile(params).then(res=>{
                    if(res.data.errorCode==='0000'){
                        _this.$Notice['success']('文件新增成功');
                        _this.initFileData();
                    }else {
                        if(res.data.errorCode==='666666'){
                            _this.$Notice['error']('('+newFileInfo.name+"）的文件已经存在");
                        }
                    }
                }).catch(function () {
                    _this.$Notice['success']('文件新增失败');
                })
            },
            refreshFileData(){
                this.initFileData()
            }

        },
        mounted:function(){
            this.initFileData()
        },
        components: {
            RecentFile,
            AllFile,
            FileManagerToolBar
        }
    };
</script>
<style scoped>
    #fileData .h-panel-bar {
        padding: 10px 10px;
    }

    #fileData .h-panel-body {
        padding: 5px 10px;
    }

    #fileData .el-breadcrumb {
        line-height: normal;
    }
</style>
