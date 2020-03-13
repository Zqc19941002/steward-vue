export default {
  isNullObj:function(obj) {
    return obj==null||obj==undefined;
  },
  isNullStr:function(str) {
    return str==null||str==undefined||str==""||str=="null"||str=="undefined";
  },
  isNullArr:function(obj) {
    return obj==null||obj==undefined||obj.length<=0;
  },
  isNaNObj:function(obj) {
    return isNaN(obj);
  },



  setDefaultObj:function(obj,val) {
    var _this=this;
    return _this.isNullObj(obj)?val:obj;
  },
  setDefaultStr:function(str,val) {
    var _this=this;
    return _this.isNullStr(str)?val:str;
  },



  decodeURIStrVl:function(str) {
    if(str==null||str==undefined||str=="") return "";
    return decodeURIComponent(decodeURIComponent(str));
  },



  getToday:function(timestamp) {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    if(month.toString().length==1)month="0"+month;
    if(day.toString().length==1)day="0"+day;
    return year+"-"+month+"-"+day;
  },

  formatDate:function(timestamp) {
    var date=new Date(parseInt(timestamp));
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    if(month.toString().length==1)month="0"+month;
    if(day.toString().length==1)day="0"+day;
    if(hour.toString().length==1)hour="0"+hour;
    if(minute.toString().length==1)minute="0"+minute;
    if(second.toString().length==1)second="0"+second;
    return year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
  },



  serializeObject:function(formId) {
    var o={};
    var a=$("#"+formId).serializeArray();
    $.each(a,function() {
      if(o[this.name]!==undefined) {
        if(!o[this.name].push) {o[this.name]=[o[this.name]];}
        o[this.name].push(this.value||'');
      } else {o[this.name]=this.value||'';}
    });
    return o;
  },





}
