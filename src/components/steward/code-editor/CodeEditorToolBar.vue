<template>
    <div id="CodeEditorToolBar">
        <DropdownMenu :toggleIcon="false" :datas="fileOptions" class="drop-menu">
            <span>文件</span>
        </DropdownMenu>
        <DropdownMenu :toggleIcon="false" @click="setEditTheme" :datas="themes" class="drop-menu">
            <span>主题</span>
        </DropdownMenu>
        <DropdownMenu :toggleIcon="false" @click="setEditLanguage" :datas="codeModels" class="drop-menu">
            <span>语言</span>
        </DropdownMenu>
        <DropdownCustom :toggleIcon="false" class="h-text-dropdown drop-menu">
            <span>编辑</span>
            <div slot="content" class="drop-menu-body">
                <div class="h-panel-body">
                    <div class="menu_item">
                        <span class="item-title-middle">字体</span>
                        <el-input-number v-width="85" size="small" v-model="fontSize" controls-position="right"
                                         @change="setFontSize" :min="12" :max="30"></el-input-number>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">分隔</span>
                        <el-input-number v-width="85" size="small" v-model="splits" controls-position="right"
                                         @change="setSplits" :min="1" :max="10"></el-input-number>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">自填充</span>
                        <el-switch
                                style="display: block"
                                v-model="enableBasicAutocompletion"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                        >
                        </el-switch>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">语法提示</span>
                        <el-switch
                                style="display: block"
                                v-model="enableLiveAutocompletion"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                        >
                        </el-switch>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">块提示</span>
                        <el-switch
                                style="display: block"
                                v-model="enableSnippets"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                        >
                        </el-switch>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">行高亮</span>
                        <el-switch
                                style="display: block"
                                v-model="highlightActiveLine"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                        >
                        </el-switch>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">只读</span>
                        <el-switch
                                style="display: block"
                                v-model="readOnly"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                                @input="setEditReadOnly"
                        >
                        </el-switch>
                    </div>
                    <div class="menu_item">
                        <span class="item-title-middle">搜索</span>
                        <el-switch
                                style="display: block"
                                v-model="enableSearch"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                        >
                        </el-switch>
                    </div>
                </div>
            </div>
        </DropdownCustom>
        <DropdownCustom :toggleIcon="false" class="h-text-dropdown drop-menu">
            <span>其他设置</span>
            <div slot="content" class="drop-menu-body">
                <div class="h-panel-body">
                    <div class="menu_item">
                        <span class="item-title-middle">展示文件</span>
                        <el-switch
                                style="display: block"
                                v-model="showFiles"
                                active-color="#13ce66"
                                inactive-color="#EBEBEB"
                                @input="handleShowFile"
                        >
                        </el-switch>
                    </div>
                </div>
            </div>
        </DropdownCustom>
        <div class="file-info">
            <span>[{{editFileInfo}}]</span>
        </div>
        <!--        <ButtonGroup>-->
        <!--            <DropdownMenu button @click="trigger" :datas="themes">主题</DropdownMenu>-->
        <!--            <DropdownMenu button @click="trigger" :datas="themes">主题</DropdownMenu>-->
        <!--            <DropdownMenu button @click="trigger" :datas="themes">主题</DropdownMenu>-->
        <!--            <DropdownMenu button @click="trigger" :datas="themes">主题</DropdownMenu>-->
        <!--            <DropdownMenu button @click="trigger" :datas="themes">主题</DropdownMenu>-->
        <!--        </ButtonGroup>-->
        <!--        <ButtonGroup :circle="true" size="s">-->
        <!--            <Button icon="h-icon-inbox" size="xs" :text="true"></Button>-->
        <!--            <Button icon="h-icon-trash" size="xs" :text="true"></Button>-->
        <!--            <Button icon="h-icon-refresh" size="xs" :text="true"></Button>-->
        <!--            <Button icon="h-icon-star" size="xs" :text="true"></Button>-->
        <!--        </ButtonGroup>-->
    </div>

</template>

<script>
    export default {
        name: "CodeEditorToolBar",
        data() {
            return {
                editFileInfo:'代码编辑器',
                fileOptions:['创建文件','导出文件','删除文件'],
                themes: ['ambiance', 'chaos', 'chrome', 'clouds','clouds_midnight','cobalt','crimson_editor','dawn','dracula','dreamweaver','eclipse','github','gob','gruvbox','idle_fingers'],
                codeModels: ['javascript', 'sql', 'markdown','java','c_app','html','python','css','django','json'],
                selectTheme: 'dracula',
                fontSize: 14,
                splits:5,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                highlightActiveLine: true,
                readOnly: false,
                enableSearch: true,
                showFiles: true,
            }
        },
        methods: {
            setFontSize(args) {
                this.$emit("setFontSize",args)
            },
            setSplits(){

            },
            setEditTheme(args) {
                this.$emit("setEditTheme",args)
            },
            handleShowFile(args){
                this.$emit("setEditProp",args)
            },
            setEditLanguage(args){
                this.$emit("setEditLanguage",args)
            },
            setEditReadOnly(args){
                this.$emit("setEditReadOnly",args)
            }
        },
    }
</script>

<style scoped>
    #CodeEditorToolBar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
        width: 50px;
    }

    .menu_item .item-title-middle {
        width: 60px;
    }

    .menu_item .item-title-large {
        width: 100%;
    }

    #CodeEditorToolBar .menu_item .h-numberinput-show .h-numberinput-input {
        min-width: 30px !important;
    }

    #CodeEditorToolBar .drop-menu-body {
        width: 200px;
        padding-bottom: 10px;
    }

    #CodeEditorToolBar .drop-menu {
        margin-left: 8px;
    }

    .drop-menu span:hover {
        color: #3788EE;
        border-bottom: 1px solid gainsboro;
    }
    .file-info{
        position: absolute;
        right: 10px;
    }
</style>
