<template>
    <div>
        <div class="table-basic-vue frame-page h-panel" v-loading="allLoading">
            <div class="h-panel-bar"><span class="h-panel-title">工作计划安排</span></div>
            <div class="h-panel-body">
                <FullCalendar
                        :config="config"
                        :events="events"
                        ref="calendar"
                ></FullCalendar>
            </div>
        </div>

        <!--新增日程弹窗-->
        <Modal v-model="addPlanModalFlag" v-bind="addPlanModalParams">
            <div slot="header">添加日程：{{addPlanModalParams.currSelectDate}}</div>
            <div :style="{'height': height ? '800px' : 'auto','width':'400px'}" v-loading="addNewWorkPlanLoading">
                <Form
                        ref="dayEventForm"
                        labelPosition="left"
                        :labelWidth="80"
                        :model="dayEventFormInfo"
                        :rules="dayEventFormInfo.rules"
                >
                    <FormItem label="日程名称" prop="name">
                        <input type="text" v-model="dayEventFormInfo.name">
                    </FormItem>
                    <FormItem label="时间" prop="dateTime">
                        <DateRangePicker :value="dayEventFormInfo.dateTime" v-model="dayEventFormInfo.dateTime"
                                         :format="format" type="datetime"></DateRangePicker>
                    </FormItem>
                    <FormItem label="日程内容" prop="content">
                        <textarea v-model="dayEventFormInfo.content"></textarea>
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <textarea v-model="dayEventFormInfo.remark"></textarea>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <button class="h-btn" @click="close">取消</button>
                <button class="h-btn h-btn-primary" @click="confirm" :disabled="addNewWorkPlanLoading">确定</button>
            </div>
        </Modal>

        <!--当天日程列表-->
        <Modal v-model="showDayEventsModalParams.openFlag" v-bind="showDayEventsModalParams">
            <div slot="header">当天日程安排表：{{showDayEventsModalParams.currSelectDate}}</div>
            <div :style="{'height': false ? '300px' : 'auto','width':'400px'}" v-loading="addNewWorkPlanLoading">
                <el-timeline>
                    <el-timeline-item :timestamp="item.start" placement="top" v-for="(item,index) in dayEventList" :key="index" :color="item.color">
                        <el-card>
                            <h4>{{item.title}}</h4>
                            <p>{{item.content}}</p>
                            <p>{{item.start}}&nbsp;&nbsp;{{item.end}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {FullCalendar} from 'vue-full-calendar';
    import {addNewWorkPlan, queryWorkPlanList} from "../js/request/workPlanReq";
    import "../js/common/message";
    import {showErrorMessage, showSuccessMessage} from "../js/common/message";
    import moment from 'moment';
    export default {
        name: "WorkPlan",
        components: {
            FullCalendar: FullCalendar
        },
        data() {
            return {
                allLoading:false,
                addPlanModalFlag: false,
                addPlanModalParams: {
                    closeOnMask: true,
                    fullScreen: false,
                    middle: true,
                    hasMask: true,
                    hasDivider: false,
                    hasCloseIcon: true,
                    draggable: true,
                    currSelectDate: ''
                },
                showDayEventsModalParams:{
                    closeOnMask: true,
                    fullScreen: false,
                    middle: true,
                    hasMask: true,
                    hasDivider: false,
                    hasCloseIcon: true,
                    draggable: false,
                    openFlag: false,
                    currSelectDate:''
                },
                dayEventList:[],
                height: false,
                format: 'YYYY-MM-DD HH:mm:ss',
                dayEventFormInfo: {
                    name: '',
                    content: '',
                    dateTime: null,
                    remark: '',
                    rules: {required: ['name', 'content']}
                },
                addNewWorkPlanLoading: false,
                selectDate: '',//日期选择器选中的月份
                events: [],
                config: {
                    firstDay: '1',//以周日为每周的第一天
                    buttonText: {today: "今天", month: "月", week: "周", day: "日"},
                    header: {left: 'today', center: 'prev, title, next'},
                    theme: false,//是否允许使用jquery的ui主题
                    height: 'auto',
                    slotLabelFormat: 'H:mm', // axisFormat 'H(:mm)'
                    //slotLabelInterval:1,
                    views: {
                        month: {
                            titleFormat: 'YYYY年MMM'
                        },
                        day: {
                            titleFormat: 'YYYY年MMMDD日 dddd'
                        }
                    },
                    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    slotDuration: '00:30:00',
                    minTime: '00:00',
                    maxTime: '24:00',
                    locale: "zh-cn",
                    editable: false, //是否允许修改事件
                    selectable: true,//是否允许用户单击或者拖拽日历中的天和时间隙
                    eventLimit: true, // 限制一天中显示的事件数，默认false
                    allDaySlot: true, //是否显示allDay
                    displayEventEnd: true,//是否显示结束时间
                    allDayText: '全天',
                    navLinks: true, //允许天/周名称是否可点击
                    defaultView: "month", //显示默认视图month,agendaWeek,agendaDay,list
                    eventClick: this.eventClick, //点击事件
                    dayClick: this.dayClick, //点击日程表上面某一天
                    eventRender: this.eventRender

                },
                queryWorkPlanParams:{
                    period:'m',
                    day:'',
                    week:'',
                    month:''
                }
            }
        },
        mounted() {
            this.allLoading=true;
            this.getWorkPlan('m')
        },
        methods: {
            changeDate() {
                this.$refs.calendar.fireMethod('gotoDate', this.selectDate)
            },
            // 点击事件
            eventClick(event, jsEvent, pos) {
                //alert('eventClick', event, jsEvent, pos)
                let _this=this
                _this.showDayEventsModalParams.openFlag=true
                _this.showDayEventsModalParams.currSelectDate=moment(event.start).format('YYYY-MM-DD')
                _this.queryWorkPlanParams.period='d'
                _this.queryWorkPlanParams.day=moment(event.start).format('DD')
                queryWorkPlanList(_this.queryWorkPlanParams).then(res => {
                    if (res.data.errorCode == '0000') {
                        let dayEventList = res.data.body
                        _this.dayEventList=dayEventList
                    } else {
                        showErrorMessage("工作计划查询失败")
                    }
                }).catch(err => {
                    showErrorMessage("工作计划查询失败")
                })


            },
            // 点击当天
            dayClick(day, jsEvent) {
                //alert('dayClick', day, jsEvent)
                let currentDate = day.format()
                this.addPlanModalParams.currSelectDate = currentDate
                this.addPlanModalFlag = true
            },
            eventRender: function (event, element) {
                element.find('.fc-title').attr('title', event.title)
            },


            /**
             * 当前事件控制
             */
            close() {
                this.addPlanModalFlag = false
            },
            confirm() {
                let _this = this;
                let validResult = _this.$refs.dayEventForm.valid();
                if (validResult.result) {
                    let addNewWorkPlanParams = {
                        planName: _this.dayEventFormInfo.name,
                        planContent: _this.dayEventFormInfo.content,
                        startTime: null,
                        endTime: null,
                        remark: _this.dayEventFormInfo.remark
                    }
                    let dateTimeRange = _this.dayEventFormInfo.dateTime
                    if (dateTimeRange !== '' && dateTimeRange !== undefined && dateTimeRange !== null) {
                        addNewWorkPlanParams.startTime = dateTimeRange.start
                        addNewWorkPlanParams.endTime = dateTimeRange.end
                    } else {
                        let currentDate = new Date(_this.addPlanModalParams.currSelectDate);
                        addNewWorkPlanParams.startTime = currentDate
                        addNewWorkPlanParams.endTime = currentDate
                    }
                    _this.addNewWorkPlanLoading = true;
                    addNewWorkPlan(addNewWorkPlanParams).then(res => {
                        _this.addNewWorkPlanLoading = false;
                        if (res && res.data.errorCode == '0000') {
                            _this.addPlanModalFlag = false
                            showSuccessMessage('在' + _this.addPlanModalParams.currSelectDate + '新增一条日程【' + _this.dayEventFormInfo.name + '],即将收到邮件或者短信提示！')
                            _this.allLoading=true
                            _this.getWorkPlan('m')
                        }
                    }).catch(err => {
                        _this.addNewWorkPlanLoading = false;
                        _this.addPlanModalFlag = false
                        showErrorMessage('新增日程错误!')
                    })
                } else {
                    showErrorMessage('新增日程错误!')
                }
            },

            getWorkPlan(period) {
                let _this = this
                _this.queryWorkPlanParams.period=period
                queryWorkPlanList(_this.queryWorkPlanParams).then(res => {
                    _this.allLoading=false;
                    if (res.data.errorCode == '0000') {
                        let workPlanList = res.data.body
                        _this.events = workPlanList
                    } else {
                        showErrorMessage("工作计划查询失败")
                    }
                }).catch(err => {
                    _this.allLoading=false;
                    showErrorMessage("工作计划查询失败")
                })
            }
        }
    }
</script>

<style scoped>

</style>
