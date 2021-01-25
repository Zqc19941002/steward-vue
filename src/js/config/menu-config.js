const fullMenus = [
    {
        title: '首页',
        key: 'Home',
        icon: 'iconfont stew-shouye',
        count: 1
    },
    {
        title: '小账本',
        key: 'TableSearch',
        icon: 'iconfont stew-zhangben'
    },
    /*{
        title: '地图测试',
        key: 'MapDemo',
        icon: 'icon-paper'
    },
    {
        title: '富文本编辑器',
        key: 'RichEdit',
        icon: 'icon-paper'
    },



    {
        title: 'MarkDown编辑器',
        key: 'MarkDownEditor',
        icon: 'h-icon-menu'
    },
*/
    {
        title: '常用工具',
        key: 'tools',
        icon: 'iconfont stew-changyongshili',
        children:[
            {
                title: '常用标签',
                key: 'NetTag',
                icon: 'iconfont stew-biaoqian'
            },
            {
                title: '工作计划',
                key: 'WorkPlan',
                icon: 'iconfont stew-gongzuojihua'
            },
            {
                title: '文件资料',
                key: 'FileData',
                icon: 'iconfont stew-wenjian'
            },
            {
                title: '笔记',
                key: 'MarkDownEditor',
                icon: 'iconfont stew-biaoqianA01_biji-99'
            },
            {
                title: '代码收集',
                key: 'Editor',
                icon: 'iconfont stew-code'
            },
            {
                title: '聊天助手',
                key: 'ChatHelper',
                icon: 'iconfont stew-liaotian'
            },
        ]

    },
    {
        title: '系统设置',
        key: 'others',
        icon: 'iconfont stew-shezhi',
        children:[
            {
                title: '菜单',
                key: 'stewMenuManage',
                icon: 'h-icon-menu'
            },
            {
                title: '用户',
                key: 'sysUsers',
                icon: 'h-icon-users'
            },
            {
                title: '角色',
                key: 'sysRoles',
                icon: 'h-icon-user'
            },
        ]
    },
    // {
    //   title: 'Icons',
    //   key: 'Icons',
    //   icon: 'icon-menu'
    // },
    // {
    //     title: '表格',
    //     key: 'tablelist',
    //     icon: 'icon-grid-2',
    //     children: [
    //         {
    //             title: '基础表格',
    //             key: 'TableBasic'
    //         },
    //         {
    //             title: '查询列表',
    //             key: 'TableSearch'
    //         }
    //     ]
    // },
    // {
    //     title: '表单应用',
    //     key: 'form-folder',
    //     icon: 'icon-paper',
    //     children: [
    //         {
    //             title: '基础表单',
    //             key: 'Form'
    //         },
    //         {
    //             title: '表单详情',
    //             key: 'FormDetail'
    //         }
    //     ]
    // },
    // {
    //     title: '模糊匹配',
    //     key: 'AutoComplete-folder',
    //     icon: 'icon-disc',
    //     children: [
    //         {
    //             title: '模糊搜索',
    //             key: 'Autocomplete1'
    //         },
    //         {
    //             title: '场景应用',
    //             key: 'Autocomplete2'
    //         },
    //         {
    //             title: '复杂场景',
    //             key: 'Autocomplete3'
    //         }
    //     ]
    // },
    // {
    //     title: '扩展组件',
    //     key: 'Advance-folder',
    //     icon: 'icon-bar-graph-2',
    //     children: [
    //         {
    //             title: '图表',
    //             key: 'Chart'
    //         },
    //         {
    //             title: '富文本编辑器',
    //             key: 'RicktextEditor'
    //         },
    //         {
    //             title: '代码编辑器',
    //             key: 'CodeEditor'
    //         },
    //         {
    //             title: 'Markdown编辑器',
    //             key: 'MarkdownEditor'
    //         }, {
    //             title: '百度地图',
    //             key: 'BaiduMap'
    //         }
    //     ]
    // },
    // {
    //     title: '系统设置',
    //     key: 'SysSetting',
    //     icon: 'icon-cog',
    //     children: [
    //         {
    //             title: '个人中心',
    //             key: 'AccountBasic'
    //         },
    //         {
    //             title: '安全设置',
    //             key: 'SecuritySetting'
    //         },
    //         {
    //             title: '权限设置',
    //             key: 'Authorization'
    //         }
    //         // {
    //         //   title: '用户管理',
    //         //   key: 'Users'
    //         // }
    //     ]
    // }
];

const getMenus = function (menuIdList = []) {
    return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
    let configMenu = [];
    for (let menu of menus) {
        let m = Utils.copy(menu);
        if (menuIdList.indexOf(m.key) > -1) {
            configMenu.push(m);
        }
        if (menu.children && menu.children.length) {
            m.children = getAuthMenu(menu.children, menuIdList);
        }
    }
    return configMenu;
};

const getKeys = function (menus) {
    let keys = [];
    for (let menu of menus) {
        keys.push(menu.key);
        if (menu.children && menu.children.length) {
            keys.push(...getKeys(menu.children));
        }
    }
    return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
    let menus = G.get('SYS_MENUS') || [];
    if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
        return false;
    }
    return true;
};

export {getMenus, fullMenus, fullMenuKeys, isAuthPage};
