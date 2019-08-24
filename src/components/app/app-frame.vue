<style lang='less'>
</style>
<template>
    <div>
        <Layout class="app-frame" v-if="!loading" :siderCollapsed="siderCollapsed"
                :siderFixed="layoutConfig.siderFixed">
            <Sider :theme="layoutConfig.siderTheme">
                <appMenu :theme="layoutConfig.siderTheme"></appMenu>
            </Sider>
            <Layout :headerFixed="layoutConfig.headerFixed">
                <HHeader theme="white">
                    <appHead @openSetting="openSetting=true" :layoutConfig="layoutConfig"></appHead>
                </HHeader>
                <SysTabs v-if="layoutConfig.showSystab" homePage="Home"></SysTabs>
                <Content>
                    <div class="app-frame-content">
                        <!-- <keep-alive> -->
                        <router-view></router-view>
                        <!-- </keep-alive> -->
                    </div>
                    <HFooter>
                        <appFooter></appFooter>
                    </HFooter>
                </Content>
            </Layout>
        </Layout>
        <Modal v-model="openSetting" type="drawer-right">
            <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
        </Modal>

    </div>
</template>
<script>
    import appLayoutSetting from './modules/app-layout-setting';
    import appHead from './app-header';
    import appMenu from './app-menu';
    import appFooter from './app-footer';
    import SysTabs from '../common/sys-tabs';
    import store from '../../js/vuex/store';
    import {mapState} from 'vuex';
    import {fullMenuKeys, isAuthPage} from '../../js/config/menu-config';
    import {queryDict,queryAccountInfo} from '../../js/request/dictReq.js'

    export default {
        data() {
            return {
                loading: true,
                openSetting: false,
                layoutConfig: {
                    siderTheme: 'white',
                    showSystab: false,
                    headerFixed: true,
                    siderFixed: true
                }
            };
        },
        mounted() {
            // 如果无后台数据，将此处屏蔽
            this.init();

            // 如果无后台数据，将此处打开
            // this.loading = false;

            const listener = G.addlistener('SYS_MENU_REFRESH', () => {
                this.initMenu();
            });
            this.$once('hook:beforeDestroy', function () {
                G.removelistener(listener);
            });
        },
        methods: {
            init() {
                this.$Loading('加载中');
                queryAccountInfo().then(res=>{
                    if (res.data.errorCode === "0000") {
                        let accountInfo = res.data.body
                        G.set('account', accountInfo);
                        console.log(accountInfo);
                        store.dispatch('updateAccount', accountInfo);
                        this.initDict();
                        this.initMenu();
                    }
                }).catch(res=>{
                    this.$Notice['error']('用户信息加载异常');
                })
            },
            initDict() {
                let _this=this;
                queryDict().then(resp => {
                    if (resp.data.errorCode==="0000") {
                        let dicts = resp.data.body;
                        for (let dict of dicts) {
                            HeyUI.addDict(dict.dictKey, dict.dictValue);
                        }
                    }
                    _this.loading = false;
                    _this.$Loading.close();
                }).catch(res=>{
                    _this.$Notice["error"]('字典数据请求异常');
                });
            },
            updateLayoutConfig({key, value}) {
                this.layoutConfig[key] = value;
            },
            initMenu() {
                // 如果使用权限配置，配合后端获取请求的数据
                // R.Account.menus().then(resp => {
                //   if (resp.ok) {
                //     this.menus = getMenus(resp.body);
                //     this.menuSelect();
                //   }
                // });
                let menus = Utils.getLocal2Json('SYS_CONFIG_MENU') || fullMenuKeys;
                console.log("加载菜单")
                console.log(menus)
                G.set('SYS_MENUS', menus);
                G.trigger('SYS_MENU_UPDATE');
                if (!isAuthPage(this.$route.name)) {
                    this.$router.replace({name: 'PermissionError'});
                }
            },
            getTarget() {
                return document.querySelector('.right-frame');
            }
        },
        computed: {
            ...mapState(['siderCollapsed'])
        },
        components: {
            appHead,
            appMenu,
            SysTabs,
            appFooter,
            appLayoutSetting
        }
    };
</script>
