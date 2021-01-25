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

                @send-message="sendMessage"
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
                    <FormItem label="过期时间" prop="expiryTime" v-if="!addRoomInfo.addRoomParams.isAlways">
                        <DatePicker :value="addRoomInfo.addRoomParams.expiryTime"
                                    v-model="addRoomInfo.addRoomParams.expiryTime"
                                    :format="format" type="datetime"></DatePicker>
                    </FormItem>
                    <FormItem label="分组描述" prop="roomDesc">
                        <textarea v-model="addRoomInfo.addRoomParams.roomDesc"></textarea>
                    </FormItem>
                    <FormItem label="分组头像" prop="roomAvatar">
                        <el-upload
                                class="chat-room-avatar"
                                action="http://localhost:8085/steward/qiniu/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="addRoomInfo.roomAvatarUrl" :src="addRoomInfo.roomAvatarUrl" class="avatar">
                            <i v-else class="el-icon-plus chat-room-avatar-icon"></i>
                        </el-upload>
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
    import {addChatRoom, queryChatRoom} from "../js/request/chatHelperReq";
    import {showErrorMessage, showSuccessMessage} from "../js/common/message";
    import {getUserIP} from "../js/common/commonUtil";

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
                roomAvatarUrl: '',
                addRoomParams: {
                    roomName: '',
                    isAlways: false,
                    roomDesc: '',
                    roomAvatar: '',
                    expiryTime: null
                },
                rules: {required: ['roomName', 'expiryTime', 'roomDesc']},
                addNewRoomLoading: false
            },
            currentLoginUser:{
                userName:"duanhong"
            }
        }),
        watch: {
            "addRoomInfo.addRoomParams.isAlways": function (val) {
                let _this = this;
                if (val) {
                    _this.addRoomInfo.rules.required.remove("expiryTime")
                } else {
                    _this.addRoomInfo.rules.required.push("expiryTime")
                }
                window.setTimeout(null, 2000)
            }
        },
        methods: {
            //初始化webSocket
            openWebSocket(roomId,userId) {
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

                    let userIp="";
                   /* getUserIP((ip) => {
                        userIp = ip;
                    })*/

                    const wsuri = "ws://localhost:8085/steward/chatRoom/"+roomId+"/"+userId;//ws地址

                    this.websock = new WebSocket(wsuri);


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
                this.websock.close()
            },
            //链接出错
            websocketonerror() {

            },
            //发送消息  //3、接收后台的响应数据
            websocketonmessage(res) {

                if (res.data=='连接成功:0000'){

                }
                console.log(JSON.stringify(res))
            },
            //4、发送数据
            websocketsend(message) {//数据发送
                this.websock.send(JSON.stringify(message));
            },
            roomsInit() {

                let _this = this
                let queryParams = {
                    userId: 'duanhong'
                }
                queryChatRoom(queryParams).then(res => {
                    if (res && res.data.errorCode == '0000') {
                        let roomList = res.data.body
                        if (roomList.length>0){
                            _this.rooms = roomList
                            let roomId="";
                            if (_this.chatConfig.isLoaingFirstRoom){
                                roomId=roomList[0].roomId
                            }
                            _this.openWebSocket(roomId,_this.currentLoginUser.userName)
                        }
                    }
                }).catch(err => {
                    showErrorMessage("聊天室信息查询失败！")
                })
                _this.chatConfig.roomsLoaded = true
                _this.chatConfig.roomsLoading = false
            },
            messageInit(roomId) {

                let _this = this;
                _this.chatConfig.messagesLoaded = true
                this.messages=[ {
                    _id: 7890,
                    content: 'message 1',
                    sender_id: 1234,
                    username: 'John Doe',
                    date: '13 November',
                    timestamp: '10:20',
                    system: false,
                    saved: true,
                    distributed: true,
                    seen: true,
                    disable_actions: false,
                    disable_reactions: false,
                    file: {
                        name: 'My File',
                        size: 67351,
                        type: 'png',
                        audio: true,
                        duration: 14.4,
                        url: 'https://firebasestorage.googleapis.com/...'
                    },
                    reactions: {
                        wink: [
                            1234, // USER_ID
                            4321
                        ],
                        laughing: [
                            1234
                        ]
                    }
                }]
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

            sendMessage(roomId, content, file, replyMessage ){
               let message={
                   roomId:roomId,
                   content:content,
                   file:file,
                   replyMessage:replyMessage
               }
               this.websocketsend(message);
            },


            toggleRoomList(opened) {
                //alert(opened)
            },

            roomInfo(roomInfo) {
                alert(JSON.stringify(roomInfo))
            },
            fetchMessage(info) {
                if (info.options.reset){
                    this.openWebSocket(info.room.roomId,this.currentLoginUser.userName)
                    this.messageInit(info.room.roomId)
                }
            },

            /**
             * 新增聊天房间提交
             */
            addRoomInfoConfirm() {
                let _this = this;
                let validResult = _this.$refs.addRoomForm.valid();
                if (validResult.result) {
                    alert(JSON.stringify(_this.addRoomInfo.addRoomParams))
                    addChatRoom(_this.addRoomInfo.addRoomParams).then(res => {
                        if (res && res.data.errorCode == '0000') {
                            _this.addRoomInfo.modalIsShow = false
                            _this.roomsInit()
                        }
                    }).catch(err => {

                    })
                }
            },

            /**
             * 上传图片
             * @param res
             */
            handleAvatarSuccess(res) {
                let _this = this;
                if (res !== null && res !== undefined && res.errorCode == '0000') {
                    _this.addRoomInfo.roomAvatarUrl = res.body.fileUrl
                    _this.addRoomInfo.addRoomParams.roomAvatar = res.body.fileKey
                }
            },
            /**
             * 上传图片校验
             * @param file
             * @returns {boolean|boolean}
             */
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                let validResult = this.$refs.addRoomForm.valid()
                if (!validResult.result) {
                    showErrorMessage('请先填写参数其他！')
                    return false
                }
                if (!isJPG) {
                    showErrorMessage('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    showErrorMessage('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M;
            }
        },
        mounted() {
            this.roomsInit()
            //this.messageInit()
        },
        created() {

        },
        destroyed() {
            this.websocketclose();
        }
    }
</script>
<style>
    .chat-room-avatar .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .chat-room-avatar .el-upload:hover {
        border-color: #409EFF;
    }

    .chat-room-avatar-icon {
        font-size: 28px;
        color: #8c939d;
        width: 75px;
        height: 75px;
        line-height: 75px !important;
        text-align: center;
    }

    .avatar {
        width: 75px;
        height: 75px;
        display: block;
    }
</style>
