<style lang='less'>
    .table-basic-vue {
    }
</style>
<template>
    <div class="table-basic-vue frame-page h-panel">
        <div class="h-panel-bar"><span class="h-panel-title">网络标签管理</span></div>
        <div class="h-panel-body">
            <div class="common-filter-bar common-flex-between">
                <div v-width="300">
                    <Search placeholder="查询" v-width="200" v-model="searchParams.title" position="front" trigger-type="input" @search="searchByParams"></Search>
                    <i class="h-split"></i>
                    <button class="h-btn h-btn-green h-btn-m" @click="searchByParams">查询</button>
                </div>
                <div>
                    <div class="buttons">
                        <div class="h-btn-group">
                            <button class="h-btn" @click="handleAdd"><i class="h-icon-plus"></i><span>新增</span></button>
                            <button class="h-btn" @click="handleImportWithExcel"><i class="h-icon-inbox"></i><span>文件导入模板</span></button>
                            <button class="h-btn" @click="handleUploadWithExcel"><i class="h-icon-outbox"></i><span>导入</span></button>
                            <button class="h-btn" @click="handleExportWithExcel"><i class="h-icon-inbox"></i><span>导出</span></button>
                            <button class="h-btn" @click="refreshTable"><i class="h-icon-refresh"></i><span>刷新</span></button>
                            <button class="h-btn" @click="addNetGroup"><i class="el-icon-connection"></i><span>添加分组</span></button>
                            <button class="h-btn" @click="deleteInBatches"><i class="h-icon-trash"></i><span>批量删除</span></button>
<!--                            <button class="h-btn"><i class="h-icon-search"></i><span>高级查询</span></button>-->
                        </div>
                    </div>
                </div>
            </div>
            <Modal v-model="openModal" :closeOnMask="closeOnMask" hasCloseIcon>
                <AddNetTagForm @handleFormClosed="handleFormClosed" :net-info="netTagInfo"></AddNetTagForm>
            </Modal>
            <Table :loading="loading" :datas="datas" :checkbox="checkbox" @select="onTableSelect">
                <TableItem :width="30" title="序号">
                    <template slot-scope="{index}">{{index+1}}</template>
                </TableItem>
                <TableItem :width="50" prop="tagId" title="标签ID"></TableItem>
                <TableItem :width="100" title="标题">
                    <template slot-scope="{data}">
                        <span class="h-tag h-tag-yellow" v-if="data.state=='2'">{{data.tagTitle}}</span>
                        <span v-if="data.state=='1'">{{data.tagTitle}}</span>
                    </template>
                </TableItem>
                <TableItem :width="250" title="路径">
                    <template slot-scope="{data}">
                        <a :href="data.tagPath" target="_blank">{{data.tagPath}}</a>
                    </template>
                </TableItem>
                <TableItem :width="220" prop="tagRemark" title="备注"></TableItem>
                <TableItem :width="80" title="操作">
                    <template slot-scope="{data}">
                        <span class="text-hover h-icon-trash" @click="handleDelete(datas,data)"></span>
                        &nbsp;&nbsp;
                        <span class="text-hover h-icon-edit" @click="handleEdit(datas,data)"></span>
                        &nbsp;&nbsp;
                        <span :class="data.state=='2'?'text-hover h-icon-star-on':'text-hover h-icon-star'" @click="flagAsCommon(datas,data)"></span>
                    </template>
                </TableItem>
            </Table>
            <p></p>
            <Pagination v-if="pagination.total>0" align="right" v-model="pagination" @change="changePage"/>
        </div>
    </div>
</template>
<script>
    import AddNetTagForm from "../components/steward/nettag/AddNetTagForm";
    import {queryNetTagPage,deleteNetTag,deleteNetTags,flagAsCommonNetTag} from "../js/request/netTagReq"
    import {baseHttpUrl} from "../js/config/http-settings";

    export default {
        name: "NetTag",
        data() {
            return {
                keyword: '',
                searchParams: {
                    title: '',
                    remark: '',
                    theme: '',
                    page:'1',
                    pageSize:'10'
                },
                deleteParams:{
                    tagId:''
                },
                batchesDeleteParams:{
                    selectDataId:[]
                },
                netTagInfo:{},
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                datas: [],
                loading: false,
                openModal: false,
                closeOnMask:false,
                checkbox:true
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.initNetTagTable(true);
            },
            addNetGroup(){

            },
            changePage() {
                this.initNetTagTable(false);
            },
            initNetTagTable(reload = false) {
                if (reload) {
                    this.pagination.page = 1;
                }else{
                    this.searchParams.page=this.pagination.page
                }
                this.loading = true;
                queryNetTagPage(this.searchParams).then(res => {
                    let result=res.data.body.result
                    this.datas = result.list
                    this.pagination.total = result.total;
                    this.loading = false;
                }).catch(res => {
                    this.$Notice["error"]('数据请求异常');
                })
            },
            searchByParams(){
                this.initNetTagTable(true)
            },
            handleDelete(datas, data) {
                let _this=this;
                let netTagTitle = data.netTagTitle
                _this.deleteParams.tagId=data.tagId;
                console.log(_this.deleteParams)
                this.$Confirm('确定删除（' + netTagTitle + '）？', '删除').then(() => {
                    deleteNetTag(_this.deleteParams).then(res=>{
                        if(res.data.errorCode==="0000"){
                            _this.$Notice["success"]('成功删除'+res.data.body+'条网络标签');
                            _this.initNetTagTable()
                        }
                    })
                }).catch(() => {

                });
            },
            handleEdit(datas,data) {
                this.netTagInfo=data;
                this.netTagInfo.isEdit=true
                this.openModal = true;
            },
            flagAsCommon(datas,data){
                let _this=this;
                let params={
                    tagId:data.tagId,
                    state:''
                }
                if (data.state=='1'){
                    params.state='2'
                }else if (data.state=='2'){
                    params.state='1'
                }
                flagAsCommonNetTag(params).then(res=>{
                    if(res.data.errorCode==="0000"){
                        if (data.state=='1'){
                            _this.$Notice["success"]('【'+data.tagTitle+'】被标记为常用标签');
                        }else if (data.state=='2'){
                            _this.$Notice["success"]('【'+data.tagTitle+'】从常用标签中取消');
                        }
                        _this.initNetTagTable()
                    }
                })
            },
            handleAdd() {
                this.netTagInfo.isEdit=false
                this.openModal = true;
            },
            handleImportWithExcel(){
                this.$Confirm('确定下载模板?','下载模板').then(() => {
                    window.location.href=baseHttpUrl+'/netTag/downLoadNetTagTem'
                }).catch(() => {

                });
            },
            handleUploadWithExcel(){

            },
            handleExportWithExcel(){
                this.$Confirm('确定导出标签数据?','导出标签数据').then(() => {
                    alert("确定")
                }).catch(() => {

                });
            },
            refreshTable(){
                this.initNetTagTable()
            },
            handleFormClosed(){
                this.openModal=false;
                this.initNetTagTable()
            },
            onTableSelect(data){
                let selectData=[];
                for (let i=0;i<data.length;i++){
                    selectData.push(data[i].tagId)
                }
                this.batchesDeleteParams.selectDataId=selectData;
            },
            deleteInBatches(){
                let _this=this;
                let selectIds=this.batchesDeleteParams.selectDataId;
                if(selectIds.length==0){
                    this.$Notice["info"]('请先选择要删除的标签');
                    return;
                }
                this.$Confirm('确定删除（' + selectIds.length + '条网络标签)？', '批量删除').then(() => {
                    deleteNetTags(this.batchesDeleteParams).then(res=>{
                        if(res.data.errorCode==="0000"){
                            _this.$Notice["success"]('成功删除'+res.data.body+'条网络标签');
                            _this.initNetTagTable()
                        }
                    })
                }).catch(() => {

                });
            }
        },
        computed: {},
        components: {
            AddNetTagForm
        }
    };
</script>
