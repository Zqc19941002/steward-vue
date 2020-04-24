<template>
    <div class="frame-page">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">代码编辑</span>
                <span class="h-panel-right">
                <h-switch v-model="readOnly">编辑</h-switch>
            </span>
            </div>
            <div class="h-panel-body">
                <MarkDownEdit v-model="value" :readonly="readOnly"/>
            </div>
        </div>
    </div>
</template>

<script>
    import MarkDownEdit from "../components/steward/markdown/MarkDownEdit";
    export default {
        name: "MarkDownEditor",
        data(){
            return {
                value:'# 标题 \r## 二级标题 \r### 列表 \r* 一级列表 \r\t* 二级列表 \r\r### 代码 \r``` javascript \rlet a = 1; \r```',
                readOnly:false
            }
        },
        components:{
            MarkDownEdit:MarkDownEdit
        }
    }
</script>

<style scoped>

</style>
