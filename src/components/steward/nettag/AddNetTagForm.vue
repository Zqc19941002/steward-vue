<template>
    <div id="netTagFormPanel" v-width="500">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">{{title}}</span>
                <span class="h-panel-right" v-if="isEdit" @click="handleFormEdit"><a>编辑</a></span>
            </div>
            <div class="h-panel-body">
                <Form :label-width="70" :mode="mode" :model="netTagFormData" :rules="netTagFormValidRules" ref="form"
                      :top="0.2" showErrorTip>
                    <FormItem label="标题" prop="tagTitle" required>
                        <input type="text" v-model="netTagFormData.tagTitle" placeholder="限制输入30个字"
                               v-wordlimit='30' :disabled="disabled"/>
                        <template slot="error" slot-scope="props">
                            <!-- *type*: base, combine, async -->
                            <span class="link" v-if="props.type == 'async'" @click="open">标题字数超过30个</span>
                        </template>
                    </FormItem>
                    <!--这里定义的required属性同样适用与验证规则中。-->
                    <FormItem label="路径" prop="tagPath" required>
                        <input type="text" v-model="netTagFormData.tagPath" :disabled="disabled"/>
                    </FormItem>
                    <FormItem label="备注" prop="tagRemark">
                        <textarea type="text" v-model="netTagFormData.tagRemark" :disabled="disabled"/>
                    </FormItem>
                    <FormItem :no-padding="true" single>
                        <Button color="green" :loading="isLoading" @click="submitAsync" v-if="!isEdit">提交</Button>
                        <Button color="green" :loading="updateLoading" @click="handleUpdate" v-if="isEdit">更新</Button>
                        <Button color="red" @click="resetForm" v-tooltip content="重置表单">重置</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import {addNetTag, updateNetTag} from "../../../js/request/netTagReq"

    export default {
        name: "AddNetTagForm",
        data() {
            return {
                mode: 'single',
                netTagFormData: {
                    tagTitle: '',
                    tagPath: '',
                    tagRemark: ''
                },
                netTagFormValidRules: {
                    rules: {
                        tagRemark: {
                            maxLen: 50,
                            minLen: 10
                        }
                    },
                    required: [
                        'tagTitle',
                        'tagPath',
                    ],
                    url: ['tagPath']
                },
                isLoading: false,
                updateLoading:false,
                isInputAsyncError: false,
                disabled: false,
                isEdit:'',
                title:''
            };
        },
        watch:{
            'netTagFormData':function () {
                alert("更改了数据")
            }
        },
        methods: {
            submitAsync() {
                let that = this;
                this.isLoading = true;
                let result = this.$refs.form.valid();
                if (result.result) {
                    addNetTag(that.netTagFormData).then(res => {
                        let result = res.data
                        if (result.errorCode === "0000") {
                            that.$Notice["success"]('成功添加一条网络标签');
                            that.resetForm();
                            this.$emit('handleFormClosed');
                        }
                    }).catch(res => {
                        that.$Message({
                            type: 'error',
                            text: `请求失败`
                        });
                    })
                }
                this.isLoading = false;
            },
            handleUpdate(){
                let that = this;
                this.updateLoading = true;
                let result = this.$refs.form.valid();
                if (result.result) {
                    console.log(that.netTagFormData)
                    updateNetTag(that.netTagFormData).then(res => {
                        let result = res.data
                        if (result.errorCode === "0000") {
                            that.$Notice["success"]('成功更新一条网络标签');
                            // that.resetForm();
                            this.$emit('handleFormClosed');
                        }
                    }).catch(res => {
                        that.$Message({
                            type: 'error',
                            text: `请求失败`
                        });
                    })
                }
                this.updateLoading = false;
            },
            resetForm() {
                if (this.isEdit){
                    this.netTagFormData.netTagTitle = this.netInfo.netTagTitle;
                    this.netTagFormData.tagPath = this.netInfo.tagPath;
                    this.netTagFormData.tagRemark = this.netInfo.tagRemark;
                    this.netTagFormData.tagId=this.netInfo.tagId;
                }else{
                    this.$refs.form.resetValid();
                    this.netTagFormData.tagRemark = ''
                    this.netTagFormData.tagPath = ''
                    this.netTagFormData.netTagTitle = ''
                }
            },
            open() {
                this.$Modal({
                    title: '处理',
                    content: '我要去做特殊的处理'
                });
            },
            initForm() {
                this.isEdit=this.netInfo.isEdit
                if (this.isEdit) {
                    this.disabled = true
                    this.netTagFormData.tagTitle = this.netInfo.tagTitle;
                    this.netTagFormData.tagPath = this.netInfo.tagPath;
                    this.netTagFormData.tagRemark = this.netInfo.tagRemark;
                    this.netTagFormData.tagId=this.netInfo.tagId;
                    this.title="编辑网络标签"

                }else{
                    this.disabled = false
                    // this.netInfo={}
                    this.title="新增网络标签"
                }
            },
            handleFormEdit(){
                this.disabled=false
            }
        },
        mounted() {
            this.initForm();
        },
        props: {
            netInfo: {}
        }
    }
</script>

<style scoped>

</style>
