<template>
    <div id="netTagFormPanel" v-width="500">
        <div class="h-panel">
            <div class="h-panel-bar">
                <span class="h-panel-title">新增网络标签</span>
            </div>
            <div class="h-panel-body">
                <Form :label-width="70" :mode="mode" :model="netTagFormData" :rules="netTagFormValidRules" ref="form"
                      :top="0.2" showErrorTip>
                    <FormItem label="标题" prop="netTagTitle" required>
                        <input type="text" v-model="netTagFormData.netTagTitle" placeholder="限制输入30个字"
                               v-wordlimit='30'/>
                        <template slot="error" slot-scope="props">
                            <!-- *type*: base, combine, async -->
                            <span class="link" v-if="props.type == 'async'" @click="open">标题字数超过30个</span>
                        </template>
                    </FormItem>
                    <!--
                        这里定义的required属性同样适用与验证规则中。
                       -->
                    <FormItem label="路径" prop="tagPath" required>
                        <input type="text" v-model="netTagFormData.tagPath"/>
                    </FormItem>
                    <FormItem label="备注" prop="tagRemark">
                        <textarea type="text" v-model="netTagFormData.tagRemark"/>
                    </FormItem>
                    <FormItem :no-padding="true" single>
                        <Button color="green" :loading="isLoading" @click="submitAsync">提交</Button>
                        <Button color="red"  @click="resetForm" v-tooltip content="重置表单">重置</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import {addNetTag} from "../../../js/request/netTagReq"
    export default {
        name: "AddNetTagForm",
        data() {
            return {
                mode: 'single',
                netTagFormData: {
                    netTagTitle: '',
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
                        'netTagTitle',
                        'tagPath',
                    ],
                    url: ['tagPath']
                },
                isLoading: false,
                isInputAsyncError: false,
            };
        },
        methods: {
            submitAsync() {
                let that=this;
                this.isLoading = true;
                let result = this.$refs.form.valid();
                if (result.result) {
                    addNetTag(that.netTagFormData).then(res=>{
                        let result=res.data
                        if (result.errorCode==="0000"){
                            that.$Notice["success"]('成功添加一条网络标签');
                            that.resetForm();
                            this.$emit('handleFormClosed');
                        }
                    }).catch(res=>{
                        that.$Message({
                            type:'error',
                            text: `请求失败`
                        });
                    })
                }
                this.isLoading = false;
            },
            resetForm(){
                this.$refs.form.resetValid();
                this.netTagFormData.tagRemark=''
                this.netTagFormData.tagPath=''
                this.netTagFormData.netTagTitle=''
            },
            open() {
                this.$Modal({
                    title: '处理',
                    content: '我要去做特殊的处理'
                });
            },
        }
    }
</script>

<style scoped>

</style>
