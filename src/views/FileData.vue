<template>
    <div class="h-panel frame-page" id="fileData">
        <div class="h-panel-bar">
            <div class="el-row">
                <div class="el-col-6">
                    文件管理-[{{currentFileType}}]
                </div>
                <div class="el-col-18" style="display:flex;justify-content: space-between">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>文件</el-breadcrumb-item>
                        <el-breadcrumb-item>笔记</el-breadcrumb-item>
                    </el-breadcrumb>
                    <FileManagerToolBar @setEditable="setEditable" @createFile="createFile"></FileManagerToolBar>
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
                                    <el-tab-pane label="最近查看" name="first">
                                        <RecentFile :fileData="item.recent"></RecentFile>
                                    </el-tab-pane>
                                    <el-tab-pane label="全部展示" name="second">
                                        <AllFile :fileData="item.all"></AllFile>
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
                currentFileType: "笔记",
                editable: false,
                activeName: "second",
                fileData: [{
                    typeLabel: "笔记",
                    typeCode: "file-type-1",
                    recent: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        status: 1,
                        children: []
                    }],
                    all: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }]
                }, {
                    typeLabel: "收藏",
                    typeCode: "file-type-2",
                    recent: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        status: 1,
                        children: []
                    }],
                    all: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }]
                }, {
                    typeLabel: "代码",
                    typeCode: "file-type-3",
                    recent: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        status: 1,
                        children: []
                    }],
                    all: [{
                        name: "java编程",
                        size: '3500kB',
                        fileNum: 12,
                        remark: "java高并发编程",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: [{
                            name: "java编程",
                            size: '3500kB',
                            fileNum: 12,
                            remark: "java高并发编程",
                            content: '',
                            type: 'folder',
                            status: 1, //0，最近。1，全部
                            typeCode: 'file-type-1',
                            children: []
                        }, {
                            name: "常用快捷键",
                            size: '500kB',
                            fileNum: 5,
                            remark: "idea快捷键",
                            content: '',
                            type: 'folder',
                            status: 1, //0，最近。1，全部
                            typeCode: 'file-type-1',
                            status: 1,
                            children: []
                        }]
                    }, {
                        name: "常用快捷键",
                        size: '500kB',
                        fileNum: 5,
                        remark: "idea快捷键",
                        content: '',
                        type: 'folder',
                        status: 1, //0，最近。1，全部
                        typeCode: 'file-type-1',
                        children: []
                    }]
                }, {
                    typeLabel: "随笔",
                    typeCode: "file-type-4",
                    recent: [],
                    all: []
                }],

            };
        },
        methods: {
            handleFileTabClick(args) {
                this.currentFileType = args.label
                this.initFileData()
            },
            initFileData() {
                alert(34)
            },
            setEditable(args) {
                this.editable = args
            },
            createFile(newFileInfo){
                console.log(newFileInfo)
                for (let i=0;i<this.fileData.length;i++){
                    if (this.fileData[i].typeLabel===this.currentFileType){
                        this.fileData[i].all.push(newFileInfo)
                        console.log(this.fileData[i].all)
                    }
                }
            }
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
