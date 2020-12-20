<template>
    <div v-width="500">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">新增菜单</span>
            </div>
            <div class="h-panel-body">
                <Form ref="newMenuInfo" :label-width="100" :model="newMenuInfo" :top="0.2" showErrorTip labelPosition="right" mode="single">
                    <FormItem label="父级菜单" prop="parentMenuName" required>
                        <input type="text" v-model="newMenuInfo.parentMenuName" :disabled="true"/>
                    </FormItem>
                    <FormItem label="父级菜单ID" prop="parentMenuId" required>
                        <input type="text" v-model="newMenuInfo.parentMenuId" :disabled="true"/>
                    </FormItem>
                    <FormItem label="菜单名称" prop="menuName" required>
                        <input type="text" v-model="newMenuInfo.menuName"/>
                    </FormItem>
                    <FormItem label="菜单排序" prop="menuSort">
                        <input type="number" v-model="newMenuInfo.menuSort"/>
                    </FormItem>
                    <FormItem label="菜单链接" prop="menuKey" required>
                        <input type="text" v-model="newMenuInfo.menuKey"/>
                    </FormItem>
                    <FormItem label="菜单图标" prop="menuIcon">
                        <input type="text" v-model="newMenuInfo.menuIcon"/>
                    </FormItem>
                    <FormItem label="菜单备注" :single="true" prop="menuRemarks">
                        <textarea rows="3" v-autosize v-wordcount="50" v-model="newMenuInfo.menuRemarks"></textarea>
                    </FormItem>
                    <FormItem single>
                        <Button color="primary"
                                :loading="isLoading"
                                @click="submitNewMenuInfo">提交
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button>取消</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import {addNewMenu} from "../../js/request/sysMenuReq"

    export default {
        name: "AddNewMenu",
        props:{
            parentMenuInfo:{}
        },
        created() {
            this.newMenuInfo.parentMenuName=this.parentMenuInfo.menuName;
            this.newMenuInfo.parentMenuId=this.parentMenuInfo.id;
        },
        data() {
            return {
                isLoading: false,
                newMenuInfo: {
                    parentMenuName: '',
                    parentMenuId: '',
                    menuName: '',
                    menuSort:'',
                    menuKey:'',
                    menuRemarks:'',
                    menuIcon:''
                },
                rules: {
                    required: ['parentMenuName', 'parentMenuId', 'menuName','menuKey']
                }
            }
        },
        methods:{
            closeMenuFormModal(){
                debugger
                this.$emit("closeOnMask")
            },
            submitNewMenuInfo(){
                let that = this;
                that.isLoading = true;
                debugger
                let result = that.$refs.newMenuInfo.valid();
                if (result){
                    addNewMenu(that.newMenuInfo).then(res => {
                        let result = res.data
                        debugger
                        if (result.resultCode === "0000") {
                            that.$Notice["success"]('菜单新增成功');
                            //that.resetForm();
                            that.$emit('handleFormClosed');
                        }
                    }).catch(res => {
                        debugger
                        that.$Message({
                            type: 'error',
                            text: `请求失败`
                        });
                    })
                }else {
                    /*that.$Message({
                        type: 'error',
                        text: `参数校验失败`
                    });*/
                }
                that.isLoading = false;
            }
        }
    }
</script>

<style scoped>

</style>
