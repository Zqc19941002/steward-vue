<template>
    <div style="padding: 5px">
        <chat-window
                :currentUserId="currentUserId"
                :rooms="rooms"
                :loading-rooms="chatConfig.roomsLoading"
                :rooms-loaded="chatConfig.roomsLoaded"
                :messages-loaded="chatConfig.messagesLoaded"
                :room-message="chatConfig.defaultMessage"
                :messages="messages"
                :height="chatConfig.roomHeight"
                :load-first-room="chatConfig.isLoaingFirstRoom"
                :menu-actions="chatConfig.menuActions"
                :message-actions="chatConfig.messageActions"
                :show-new-messages-divider="chatConfig.showNewMessagesDivider"
                :show-footer="chatConfig.showFooter"
                :text-messages="chatConfig.textMessages"
                :single-room="chatConfig.singleRoom"
                @add-room="addRoom"
                @toggle-rooms-list="toggleRoomList"
                @room-info="roomInfo"
                @fetch-messages="fetchMessage"


                @fetch-room="fetchRoom"
                @fetch-more-rooms="fetchMoreRooms"
                @loading-more-rooms="loadingMoreRoom"
        />
        <!--<SocialChat :attendants="attendants">
            <p slot="header">点击下面我们的代表之一聊天。</p>
            <template v-slot:button="{ open }">
                <span v-show="!open">联系我们</span>
                <span v-show="open">关闭</span>
            </template>
            <small slot="footer">时间：上午8点至下午6点</small>
        </SocialChat>-->


        <!--当天日程列表-->
        <Modal v-model="addRoomInfo.modalIsShow" v-bind="addRoomInfo.addRoomParams">
            <div slot="header">新增分组</div>
            <div :style="{'height': false ? '300px' : 'auto' ,'width':'400px'}"
                 v-loading="addRoomInfo.addNewRoomLoading">
                <Form
                        ref="addRoomForm"
                        labelPosition="left"
                        :labelWidth="80"
                        :model="addRoomInfo.addRoomParams"
                        :rules="addRoomInfo.rules"
                >
                    <FormItem label="分组名称" prop="roomName">
                        <input type="text" v-model="addRoomInfo.addRoomParams.roomName">
                    </FormItem>
                    <FormItem label="类型" prop="isAlways">
                        <Checkbox v-model="addRoomInfo.addRoomParams.isAlways">是否一直生效</Checkbox>
                    </FormItem>
                    <FormItem label="时间" prop="roomTime" v-if="addRoomInfo.addRoomParams.isAlways">
                        <DateRangePicker :value="addRoomInfo.addRoomParams.roomTime"
                                         v-model="addRoomInfo.addRoomParams.roomTime"
                                         :format="format" type="datetime"></DateRangePicker>
                    </FormItem>
                    <FormItem label="分组描述" prop="roomDesc">
                        <textarea v-model="addRoomInfo.addRoomParams.roomDesc"></textarea>
                    </FormItem>
                    <FormItem label="分组头像" prop="roomAvatar">
                        <textarea v-model="addRoomInfo.addRoomParams.roomAvatar"></textarea>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <button class="h-btn" @click="addRoomInfo.modalIsShow=false">取消</button>
                <button class="h-btn h-btn-primary" @click="addRoomInfoConfirm"
                        :disabled="addRoomInfo.addNewRoomLoading">确定
                </button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ChatWindow from 'vue-advanced-chat'

    export default {
        name: "ChatHelper",
        components: ChatWindow,
        data: () => ({
            chatConfig: {
                menuActions: [
                    {
                        name: '邀请',
                        title: '邀请好友'
                    },
                    {
                        name: '移除',
                        title: '移除好友'
                    },
                    {
                        name: '关闭房间',
                        title: '关闭房间'
                    }
                ],
                roomHeight: "750px",
                isLoaingFirstRoom: true,
                roomsLoading: true,
                roomsLoaded: false,
                messagesLoaded: false,
                defaultMessage: "您想说？",
                messageActions: [
                    {
                        name: 'Reply',
                        title: '回复'
                    },
                    {
                        name: 'editMessage',
                        title: '编辑',
                        onlyMe: true
                    },
                    {
                        name: 'deleteMessage',
                        title: '删除消息',
                        onlyMe: true
                    }
                ],
                showNewMessagesDivider: true,
                showFooter: true,
                textMessages: {
                    /*ROOMS_EMPTY: 'Aucune conversation',
                    ROOM_EMPTY: 'Aucune conversation sélectionnée',
                    NEW_MESSAGES: 'Nouveaux messages',
                    MESSAGE_DELETED: 'Ce message a été supprimé',
                    MESSAGES_EMPTY: 'Aucun message',
                    CONVERSATION_STARTED: 'La conversation a commencée le :',
                    TYPE_MESSAGE: 'Tapez votre message',
                    SEARCH: 'Rechercher',
                    IS_ONLINE: 'est en ligne',
                    LAST_SEEN: 'dernière connexion ',
                    IS_TYPING: 'est en train de taper...',*/

                    ROOMS_EMPTY: '没有对话',
                    ROOM_EMPTY: '未选择对话',
                    NEW_MESSAGES: '新邮件',
                    MESSAGE_DELETED: '此邮件已被删除',
                    MESSAGES_EMPTY: '没有消息',
                    CONVERSATION_STARTED: '对话开始于 :',
                    TYPE_MESSAGE: '输入消息',
                    SEARCH: '搜索',
                    IS_ONLINE: '正在连接...',
                    LAST_SEEN: '上次登录时间 ',
                    IS_TYPING: '正在输入...'
                },
                singleRoom: false
            },
            rooms: [],
            messages: [],
            currentUserId: 1234,
            websock: null,

            format: 'YYYY-MM-DD HH:mm:ss',
            addRoomInfo: {
                modalIsShow: false,
                addRoomParams: {
                    roomName: '',
                    isAlways:false,
                    roomDesc: '',
                    roomAvatar: ''
                },
                rules: {required: ['roomName', 'roomTime', 'roomDesc']},
                addNewRoomLoading: false
            }
        }),
        methods: {
            //初始化webSocket
            initWebSocket() {
                try {
                    if (typeof (WebSocket) === "undefined") {
                        alert("您的浏览器不支持socket");
                    }

                    if (typeof MozWebSocket === 'function') {
                        WebSocket = MozWebSocket;
                    }

                    if (this.websock && this.websock.reayState === 1) {
                        this.websock.close();
                    }

                    const wsuri = "ws://localhost:8085/steward/chatRoom/duanhong";//ws地址

                    this.websock = new WebSocket(wsuri);

                    debugger

                    this.websock.onopen = this.websocketonopen;//打开连接

                    this.websock.onerror = this.websocketonerror;//连接失败

                    this.websock.onmessage = this.websocketonmessage; //发送数据

                    this.websock.onclose = this.websocketclose;//关闭连接

                } catch (err) {

                    console.log(err);

                }
            },
            //关闭webSocket链接
            websocketclose() {

            },
            //打开链接
            websocketonopen() {

                debugger

            },
            //链接出错
            websocketonerror() {

            },
            //发送消息  //3、接收后台的响应数据
            websocketonmessage() {

            },
            //4、发送数据
            websocketsend(message) {//数据发送
                this.websock.send(message);
            },
            roomsInit() {
                debugger
                let _this = this
                _this.chatConfig.roomsLoaded = true
                _this.chatConfig.roomsLoading = false

            },
            messageInit() {
                let _this = this;
                _this.chatConfig.messagesLoaded = true
            },


            //事件
            addRoom() {
                let _this = this
                _this.addRoomInfo.modalIsShow = true
            },

            fetchRoom(room) {
                alert(JSON.stringify(room))
            },

            fetchMoreRooms() {

            },

            loadingMoreRoom() {

            },


            toggleRoomList(opened) {
                //alert(opened)
            },

            roomInfo(roomInfo) {
                alert(JSON.stringify(roomInfo))
            },
            fetchMessage(room, options) {

            },

            /**
             * 新增聊天房间提交
             */
            addRoomInfoConfirm() {
                let _this = this;
                let validResult = _this.$refs.addRoomForm.valid();
                if (validResult.result) {

                }
            }
        },
        mounted() {
            this.roomsInit()
            this.messageInit()
        },
        created() {
            this.initWebSocket()
        },
        destroyed() {
            this.websocketclose();
        }
    }
</script>

<style scoped>

</style>
