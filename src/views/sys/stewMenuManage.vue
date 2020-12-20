<template>
    <div class="table-basic-vue frame-page h-panel">

        <div class="h-panel-bar"><span class="h-panel-title">菜单管理</span></div>
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
                            <button class="h-btn" @click="refreshTable"><i class="h-icon-refresh"></i><span>刷新</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <Table :loading="loading" :datas="menuDatas" :checkbox="checkbox">
                <TableItem :width="50" title="序号">
                    <template slot-scope="{index}">{{index+1}}</template>
                </TableItem>
                <TableItem :width="200" prop="menuName" title="菜单名称" treeOpener></TableItem>
                <TableItem :width="100" prop="id" title="菜单ID"></TableItem>
                <TableItem :width="230" prop="icon" title="菜单图标"></TableItem>
                <TableItem prop="createDate" title="创建时间"></TableItem>
                <TableItem prop="updateDate" title="更新时间"></TableItem>
                <TableItem prop="createBy" title="创建人"></TableItem>
                <TableItem :width="180" prop="menuKey" title="菜单链接"></TableItem>
               <!-- <TableItem :width="100" prop="remarks" title="备注"></TableItem>-->
                <TableItem :width="150" title="操作">
                    <template slot-scope="{data}">
                        <span class="text-hover h-icon-trash" @click="handleDelete(menuDatas,data)"></span>
                        &nbsp;&nbsp;
                        <span class="text-hover h-icon-edit" @click="handleEdit(menuDatas,data)"></span>
                        &nbsp;&nbsp;
                        <span class="text-hover h-icon-plus" @click="addForCurrentMenu(menuDatas,data)"></span>
                    </template>
                </TableItem>
            </Table>
            <Pagination v-if="pagination.total>0" align="right" v-model="pagination" @change="changePage"/>
        </div>

        <Modal v-model="addMenuModal" hasCloseIcon :width="400">
            <AddNewMenu :parentMenuInfo="currParentMenuInfo" @handleFormClosed="handleFormClosed"></AddNewMenu>
        </Modal>

    </div>
</template>

<script>
    import AddNewMenu from "./AddNewMenu";
    import {addNewMenu, querySysMenuNode,deleteMenu} from "../../js/request/sysMenuReq"
    import {deleteNetTag} from "../../js/request/netTagReq";
    export default {
        name: "stewMenuManage",
        components:{
            AddNewMenu:AddNewMenu
        },
        data(){
            return{
                searchParams:{},
                loading:false,
                menuDatas:[],
                checkbox:false,
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                addMenuModal:false,
                closeOnMask:false,
                currParentMenuInfo:{}
            }
        },
        mounted() {
            this.initPage()
        },
        methods:{
            initPage(){
                this.searchByParams()
            },
            searchByParams(){
                //查询菜单节点信息
                let that=this;
                that.loading=true;
                querySysMenuNode(that.searchParams).then(res =>{
                    that.loading=false;
                    if (res.data.resultCode=="0000"){
                        that.menuDatas=res.data.data
                    }

                }).catch(err=>{

                })
            },
            handleAdd(){

            },
            handleImportWithExcel(){

            },
            handleUploadWithExcel(){

            },
            handleExportWithExcel(){

            },
            refreshTable(){
                this.searchByParams();
            },
            /**
             * 删除菜单
             */
            handleDelete(datas,menuInfo){
                let that=this;
                debugger
                let deleteMenuParams={
                    menuId:menuInfo.id
                }
                that.$Confirm('确定删除该菜单？', '删除').then(() => {
                    deleteMenu(deleteMenuParams).then(res=>{
                        debugger
                        if(res.data.resultCode==="0000"){
                            that.$Notice["success"]('成功删除菜单'+menuInfo.menuName);
                            that.searchByParams()
                        }
                    }).catch((err)=>{
                        debugger
                        that.$Notice["error"]('网咯错误');
                    })
                }).catch((err) => {

                });
            },
            handleEdit(){

            },
            addForCurrentMenu(menus,menuInfo){
                debugger
                let that=this;
                that.currParentMenuInfo=menuInfo
                that.addMenuModal=true
            },
            changePage() {
                this.searchByParams();
            },
            handleFormClosed(){
                debugger
                this.addMenuModal=false
                this.searchByParams();
            }

        }
    }
</script>

<style scoped>

</style>
