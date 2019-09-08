<template>
    <div class="file-container">
        <!--        <FileUpLoad v-if="allFile.length==0" :options="options" type="files" v-model="file" dragdrop class="fileUpLoad">-->
        <!--            <div slot="dragdrop">-->
        <!--                <p class="text-center"><i class="h-icon-upload blue-color" v-font="30"></i></p>-->
        <!--                <p class="text-center">暂无文件点击或者拖拽上传</p>-->
        <!--            </div>-->
        <!--        </FileUpLoad>-->
        <div class="file-item" v-for="(file,index) in allFile" :key="index">
            <DropdownCustom ref="dropdown" trigger="contextMenu" :toggleIcon="false">
                <div class="file-item">
                    <div v-if="file['type']==='folder'" class="file-item-img">
                        <el-image v-if="file['childrenFileList'].length>0" :src="hasFile" fit="contain"
                                  @dblclick="folderDoubleClick(file)"></el-image>
                        <el-image v-else :src="noFile" fit="contain" @dblclick="folderDoubleClick(file)"></el-image>
                    </div>
                    <div v-else class="file-item-img">
                        <el-image :src="fileImg" fit="contain" @dblclick="doubleClick(index)"></el-image>
                    </div>
                    <div class="file-item-info">
                        <!--                <input v-if="file.fileTypeId==='new-file'||file.typeCode==='new-folder'" v-model="file['name']" class="newFile" @change="handleFileNameChange(file,index)"></input>-->
                        <input v-model="file['name']" class="oldFile"></input>
                    </div>
                </div>
                <div slot="content" v-padding="10" style="width: 150px">
                    <span class="contextMenu-list-title">{{file['name']}}</span>
                    <ul class="contextMenu-list" @click="excuteCommond">
                        <li data-commond="rename" :data-file="file['fileId']" :data-index="index">重命名</li>
                        <li data-commond="delete" :data-file="file['fileId']" :data-index="index">删除</li>
                        <li v-if="file['type']==='file'" data-commond="open" :data-file="file['fileId']" :data-index="index">编辑器打开</li>
                    </ul>
                </div>
            </DropdownCustom>
        </div>
    </div>
</template>

<script>
    import FileUpLoad from "./FileUpLoad";
    import {renameStewFile} from '../../../js/request/fileDataReq.js'

    export default {
        name: "AllFile",
        data() {
            return {
                hasFile: require("../../../images/haveFile.png"),
                noFile: require("../../../images/noFile.png"),
                addFile: require("../../../images/addFile.png"),
                fileImg: require("../../../images/file.png"),
                allFile: [],
                file: [],
                options: {
                    max_file_size: '1mb'
                },
            }
        },
        watch: {
            "fileData": function () {
                this.allFile = this.fileData
            }
        },
        methods: {
            doubleClick(index) {
                this.openFile(index)
            },
            folderDoubleClick(folderInfo){
                alert("打开文件夹")
            },
            excuteCommond(args) {
                let index = args.target.dataset.index;
                let commond = args.target.dataset.commond;
                switch (commond) {
                    case "rename":
                        this.renameFile(index);
                        break;
                    case "delete":
                        this.deleteFile(index);
                        break;
                    case "open":
                        this.openFile(index);
                        break;
                    default:
                        console.log("无此指令")
                        break;
                }
            },
            renameFile(index) {
                let _this = this;
                this.$prompt('请输入文件名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[\u4e00-\u9fa5\w]{1,20}$/,
                    inputErrorMessage: '文件名长度不能超过20'
                }).then(({value}) => {
                    let params = {
                        fileId: this.allFile[index].fileId,
                        name: value
                    }
                    renameStewFile(params).then(res => {
                        if (res.data.errorCode === '0000') {
                            _this.$emit("refreshFileData");
                            _this.$Notice["success"]('文件重命名成功');
                        } else {
                            _this.$Notice["error"]('文件重命名失败');
                        }
                    }).catch(function () {
                        _this.$Notice["error"]('文件重命名失败');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            deleteFile(index) {
                this.$confirm('删除(' + this.allFile[index].name + '), 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            openFile(index) {
                this.$confirm('确定在编辑器中打开(' + this.allFile[index].name + ')?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        mounted() {
            this.allFile = this.fileData
        },
        props: ["fileData"]

    }
</script>

<style scoped>
    .fileUpLoad {
        margin: 0 auto;
        width: 100%;
    }

    .file-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .contextMenu-item {

    }

    .file-item {
        width: 105px;
        height: 100px;
        padding: 0px 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .file-item:hover {
        background-color: #F2F5F7;
    }

    .file-item-img {
        width: 80px;
        height: 70px;
    }

    .file-item .file-item-info {
        text-align: center;
    }

    .oldFile {
        border: none;
        background-color: transparent;
    }

    .newFile {
        border: none;
        background-color: white;
        color: #409EFF;
    }

    .file-item .file-item-info input {
        display: block;
        width: 95px;
        text-align: center;
        outline: none;
        padding: 5px 0px;
    }

    .contextMenu-list-title {
        width: 100%;
        text-align: center;
        font-weight: bold;
    }

    .contextMenu-list {

    }

    .contextMenu-list li {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 5px;
    }

    .contextMenu-list li:hover {
        background-color: #EDF3FF;
        color: #88C1F0;
    }
</style>
