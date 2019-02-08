//之前封装的一些方法

/**
 * 获取URL.例如"http://172.24.128.181:8080"
 */
function jsonServer() {
    var str = location.href; //获取本页url地址
    var arr = str.split("/");
    var ipAndPort = arr[2] + "/" + arr[3];
    var url = "http://" + ipAndPort;
    //console.log("URL:"+url);
    return url;
};

/**
 * 使用json向后台发出请求.
 *
 * @param {String}
 *            request    请求参数.
 *            successCallback   请求成功后的回调处理函数.
 *            syncFlag   是否同步.
 *            requestURL 请求地址.
 * 说明 ： 如果syncFlag不填写，默认为true
 *         如果requestURL不填写，默认获取本机服务地址
 */
function jsonRequestByPost(requestData, successCallback, syncFlag, requestURL, errorCallBack, timeout) {
    if (syncFlag == undefined || typeof syncFlag != "boolean") {
        syncFlag = true;
    }

    $.ajax({
        type: "post",
        url: requestURL || jsonServer(),
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        timeout: timeout || 10000,
        success: successCallback,
        async: syncFlag,
        error: errorCallBack || function (data) {
            requestErrorCallBack(data);
        }
    });
};

function jsonRequestByPOSTIMG(requestData, successCallback, syncFlag, requestURL, errorCallBack) {
    if (syncFlag == undefined || typeof syncFlag != "boolean") {
        syncFlag = true;
    }

    $.ajax({
        type: "post",
        url: requestURL,
        dataType: "text",
        contentType: "application/octet-stream",
        data: requestData,
        timeout: 10000,
        success: successCallback,
        async: syncFlag,
        error: errorCallBack || function (data) {
            requestErrorCallBack(data);
        }
    });
};

function jsonRequestByGet(requestdata, successCallback, syncFlag, requestURL, errorCallBack) {
    if (syncFlag == undefined || typeof syncFlag != "boolean") {
        syncFlag = true;
    }
    $.ajax({
        type: "get",
        url: requestURL || jsonServer(),
        dataType: "text",
        //contentType:"application/json",
        data: requestdata,
        timeout: 10000,
        success: successCallback,
        async: syncFlag,
        cache: false,   //清缓存
        error: errorCallBack || function (data) {
            requestErrorCallBack(data);
        }
    });
};

function jsonRequestByGetNoRequest(successCallback, syncFlag, requestURL, errorCallBack, timeout) {
    if (syncFlag == undefined || typeof syncFlag != "boolean") {
        syncFlag = true;
    }
    $.ajax({
        type: "get",
        url: requestURL || jsonServer(),
        dataType: "json",
        timeout: timeout || 10000,
        success: successCallback,
        async: syncFlag,
        cache: false,   //清缓存
        error: errorCallBack || function (data) {
            requestErrorCallBack(data);
        }
    });
};

function requestErrorCallBack(data) {
    if (data.statusText == 'Forbidden') {
        window.top.location.href = jsonServer() + '/page/login.html';
        return;
    }

    var errorhtml = '<div style="text-align: center; margin-top: 10px; min-height: 670px">\
		<div class="error_page">\
			<img src="core/img/bg_404.png" class="img404">\
			<div class="please_fresh">网页出现异常，请刷新</div>\
			<div class="please_call">若仍然无法解决，请咨询锐捷网络技术服务热线：4008-111-000</div>\
			<div class="user_btn_confirm ok" style="margin-top: 40px" onclick="gobackPreviousPage()">刷 新</div>\
		</div>\
	</div>'
    $('#user_content').empty().append(errorhtml);
    // window.top.location.href = jsonServer() + '/page/common/error.html';
    // throw new Error("ajax request exception");
};

function gotoErrorPage() {
    window.top.location.href = jsonServer() + '/page/common/error.html';
};
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

