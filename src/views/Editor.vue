<template>
    <div class="h-panel frame-page" id="CodeEditor">
        <div class="h-panel-bar">
            <CodeEditorToolBar @setEditProp="setEditProp" @setEditTheme="setEditTheme" @setEditLanguage="setEditLanguage"
            @setEditReadOnly="setEditReadOnly" @setFontSize="setFontSize"></CodeEditorToolBar>
        </div>
        <div class="h-panel-body">
            <Layout>
                <Sider v-if="isShowFileManager">
                    <FileManager></FileManager>
                </Sider>
                <Content>
                    <CodeEditor v-model="value" :mode="mode" :theme="theme" :readOnly="readOnly" :fontSize="fontSize"/>
                </Content>
            </Layout>
        </div>
    </div>
</template>

<script>
    import CodeEditor from "../components/steward/code-editor/CodeEditor";
    import CodeEditorToolBar from "../components/steward/code-editor/CodeEditorToolBar";
    import FileManager from "../components/steward/code-editor/FileManager";
    export default {
        name: "CodeCollector",
        data() {
            return {
                value: '/**\n' +
                    ' * @author 断鸿\n' +
                    ' * @description 开始你的操作吧\n' +
                    ' * @date 2019/8/16\n' +
                    ' */',
                mode: 'java',
                readOnly:false,
                theme:'dracula',
                fontSize:14,
                isShowFileManager:true
            };
        },
        mounted() {
        },
        methods: {
            change() {
                this.value = {
                    javascript: 'let a = 1;',
                    sql: 'select * from user',
                    markdown: '# title'
                }[this.mode];
            },
            setEditProp(args){
                this.isShowFileManager=args
            },
            setEditTheme(args){
                this.theme=args
            },
            setEditLanguage(args){
                this.mode=args;
            },
            setEditReadOnly(args){
                this.readOnly=Boolean(args)
            },
            setFontSize(args){
                this.fontSize=args
            }
        },
        components:{
            CodeEditor,
            CodeEditorToolBar,
            FileManager
        }
    }
</script>

<style scoped>
    #CodeEditor .h-panel-body{
        padding: 2px!important;
    }
    #CodeEditor .h-panel-bar{
        padding: 5px 2px!important;
    }
</style>
