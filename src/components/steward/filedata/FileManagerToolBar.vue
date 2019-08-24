<template>
    <div>
        <el-dropdown class="drop-menu" @command="handleCommand">
            <span class="el-dropdown-link">文件</span>
            <el-dropdown-menu slot="dropdown" style="padding: 10px 5px">
                <el-dropdown-item command="newFile">新建文件</el-dropdown-item>
                <el-dropdown-item command="newFolder">新建文件夹</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="drop-menu">
            <span class="el-dropdown-link">设置</span>
            <el-dropdown-menu slot="dropdown" style="padding: 10px 5px">
                <div class="menu_item">
                    <span class="item-title-large">编辑文件类型</span>
                    <el-switch
                            style="display: block"
                            v-model="editable"
                            active-color="#13ce66"
                            inactive-color="#EBEBEB"
                            @input="setEditable"
                    >
                    </el-switch>
                </div>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "FileManagerToolBar",
        data() {
            return {
                editable: false
            }
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case "newFile":
                        this.createFile();
                        break;
                    case "newFolder":
                        this.createFolder();
                        break;
                    default :
                        alert("无此操作命令");
                        break;
                }
            },
            createFile() {
                let newFileInfo = {
                    name: "新建文件",
                    size: '0kB',
                    fileNum: 0,
                    remark: "",
                    content: '',
                    type: 'file',
                    status: 1, //0，最近。1，全部
                    typeCode: 'new-file',
                    children: [],
                    all:[]
                }
                this.$emit("createFile", newFileInfo)
            },
            createFolder() {
                alert(23445)
            },
            setEditable(args) {
                this.$emit("setEditable", args)
            }
        }
    }

</script>

<style scoped>
    .drop-menu {
        margin-left: 8px;
    }

    .menu_item {
        border-bottom: 1px solid gainsboro;
        width: 100%;
        height: 40px;
        padding: 2px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .menu_item .item-title {
        width: 80px;
    }

    .menu_item .item-title-middle {
        width: 60px;
    }

    .menu_item .item-title-large {
        width: 100px;
    }

</style>
