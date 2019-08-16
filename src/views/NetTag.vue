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
                    <Search placeholder="查询" v-width="200"></Search>
                    <i class="h-split"></i>
                    <button class="h-btn h-btn-green h-btn-m">查询</button>
                </div>
                <div>
                    <div class="buttons">
                        <div class="h-btn-group">
                            <button class="h-btn" @click="handleAdd"><i class="h-icon-plus"></i><span>新增</span>
                            </button>
                            <button class="h-btn" @click="refreshTable"><i class="h-icon-refresh"></i><span>刷新</span></button>
                            <button class="h-btn" @click="deleteInBatches"><i class="h-icon-trash"></i><span>批量删除</span></button>
                            <button class="h-btn"><i class="h-icon-search"></i><span>高级查询</span></button>
                        </div>
                    </div>
                </div>


            </div>
            <Modal v-model="openModal" :closeOnMask="closeOnMask" hasCloseIcon>
                <AddNetTagForm @handleFormClosed="handleFormClosed"></AddNetTagForm>
            </Modal>
            <Table :loading="loading" :datas="datas" :checkbox="checkbox" @select="onTableSelect">
                <TableItem :width="30" title="序号">
                    <template slot-scope="{index}">{{index+1}}</template>
                </TableItem>
                <TableItem :width="80" prop="netTagTitle" title="标题"></TableItem>
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
            <Pagination v-if="pagination.total>0" align="right" v-model="pagination" @change="changePage"/>
        </div>
    </div>
</template>
<script>
    import AddNetTagForm from "../components/steward/nettag/AddNetTagForm";
    import {queryNetTagPage,deleteNetTag,deleteNetTags} from "../js/request/netTagReq"

    export default {
        name: "NetTag",
        data() {
            return {
                keyword: '',
                searchParams: {
                    title: '',
                    remark: '',
                    theme: ''
                },
                deleteParams:{
                    tagId:''
                },
                batchesDeleteParams:{
                    selectDataId:[]
                },
                pagination: {
                    page: 1,
                    size: 20,
                    total: 0
                },
                tabs: [
                    {key: 'China', title: 'Malawi'},
                    {key: 'Niger', title: 'Niger'},
                    {key: 'Curaçao', title: 'Curaçao'},
                    {key: 'Korea', title: 'Korea'},
                    {key: 'Malawi', title: 'Malawi'}
                ],
                type: 'China',
                datas: [],
                counts: {},
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
                this.initNetTagTable();
                this.getCounts();
            },
            changePage() {
                this.initNetTagTable(true);
            },
            getCounts() {
                setTimeout(() => {
                    this.counts = {
                        China: 900,
                        Niger: 90,
                        Curaçao: 20,
                        Korea: 30,
                        Malawi: 45
                    };
                }, 1000);
            },
            initNetTagTable(reload = false) {
                if (reload) {
                    this.pagination.page = 1;
                }
                this.loading = true;
                queryNetTagPage(this.searchParams).then(res => {
                    let netTagArr = res.data.body.result;
                    this.datas = netTagArr
                    this.pagination.total = 100;
                    this.loading = false;
                }).catch(res => {
                    alert("数据获取异常")
                })
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
            handleEdit() {

            },
            handleAdd() {
                this.openModal = true;
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
