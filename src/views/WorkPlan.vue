<template>
    <div>
        <div class="table-basic-vue frame-page h-panel">
            <div class="h-panel-bar"><span class="h-panel-title">工作计划安排</span></div>
            <div class="h-panel-body">
               <!-- <Table :loading="loading" :datas="datas" :checkbox="checkbox" @select="onTableSelect">
                    <TableItem :width="30" title="序号">
                        <template slot-scope="{index}">{{index+1}}</template>
                    </TableItem>
                    <TableItem :width="50" prop="tagId" title="标签ID"></TableItem>
                    <TableItem :width="80" prop="tagTitle" title="标题"></TableItem>
                    <TableItem :width="250" title="路径">
                        <template slot-scope="{data}">
                            <a :href="data.tagPath" target="_blank">
                                {{data.tagPath}}
                            </a>
                        </template>
                    </TableItem>
                    <TableItem :width="220" prop="tagRemark" title="备注"></TableItem>
                    <TableItem :width="80" title="操作">
                        <template slot-scope="{data}">
                            <span class="text-hover h-icon-trash" @click="handleDelete(datas,data)"></span>
                            &nbsp;&nbsp;
                            <span class="text-hover h-icon-edit" @click="handleEdit(datas,data)"></span>
                        </template>
                    </TableItem>
                </Table>
                <p></p>
                <Pagination v-if="pagination.total>0" align="right" v-model="pagination" @change="changePage"/>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkPlan"
    }
</script>

<style scoped>

</style>
