/*!
 * basic-helper.js v1.0.0.0 (http://www.gtwise.com)
 * Copyright 2009-2017 gtwise, Inc.
 * author by gtwise. Hi7t_ .etc _SuD
 */

var ROWSPLIT = "|^"; // 行分隔符
var UNITSPLIT = "$`"; // 列分隔符
var ROWSPLITEX = "@^";
var UNITSPLITEX = "&`";


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};

//参数是否为空判断
var fnIsNull_fob = function (val) {
    return val === undefined || val === null || $.trim(val) === "";
    // return !val || !$.trim(val) || val.length == 0 || $.isEmptyObject(val)
};


/**
 * 对获取到的数据进行判断是否有注入语句
 * （改了改使之适用于自定义条件检验）
 * @param  判断数据
 * @date   2019-01-10
 * */
var fnIsSQLInjection_fob = function (data) {
    //过滤非法SQL字符
    re = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/i;
    if (re.test(data)) {
        return true;
    } else {
        return false;
    }
};
