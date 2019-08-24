<template>
    <div class="file-container">
        <FileUpLoad v-if="allFile.length==0" :options="options" type="files" v-model="file" dragdrop class="fileUpLoad">
            <div slot="dragdrop">
                <p class="text-center"><i class="h-icon-upload blue-color" v-font="30"></i></p>
                <p class="text-center">暂无文件点击或者拖拽上传</p>
            </div>
        </FileUpLoad>
        <div class="file-item" v-for="(file,index) in allFile" :key="index" @contextmenu.prevent="handleRightKey(index)">
            <div class="file-item-img">
                <el-image v-if="file['children'].length>0" :src="hasFile" fit="contain" @dblclick="doubleClick"></el-image>
                <el-image v-else :src="noFile" fit="contain" @click="click"></el-image>
            </div>
            <div class="file-item-info">
                <input v-if="file.typeCode=='new-file'" :value="file['name']" class="newFile"></input>
                <input v-else :value="file['name']" class="oldFile" disabled="true"></input>
            </div>

        </div>
    </div>
</template>

<script>
    import FileUpLoad from "./FileUpLoad";
    export default {
        name: "AllFile",
        data(){
            return{
                hasFile:require("../../../images/haveFile.png"),
                noFile:require("../../../images/noFile.png"),
                addFile:require("../../../images/addFile.png"),
                allFile: [],
                file:[],
                options: {
                    max_file_size: '1mb'
                },
            }
        },
        methods:{
            doubleClick(){
                alert("双击事件")
            },
            click(){
                alert("单点击事件")
            },
            handleRightKey(index){
                alert("右键激活"+index)
            }
        },
        mounted(){
            this.allFile=this.fileData
        },
        props:['fileData'],
        components:{
            FileUpLoad
        }
    }
</script>

<style scoped>
    .fileUpLoad{
        margin: 0 auto;
        width: 100%;
    }
    .file-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .file-item{
        width: 105px;
        height: 100px;
        padding: 0px 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .file-item:hover{
        background-color: #F2F5F7;
    }
    .file-item-img{
        width: 80px;
        height: 70px;
    }
    .file-item .file-item-info{
        text-align: center;
    }
    .oldFile{
        border: none;
        background-color:transparent;
    }
    .newFile{
        border: none;
        background-color:white;
    }
    .file-item .file-item-info input{
        display: block;
        width: 95px;
        text-align: center;
        outline: none;
        padding: 5px 0px;
    }
</style>
