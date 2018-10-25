/******************************************下为浏览器信息************************************************/
var webList;
var startTime;
var entTime;
var during;
var testNum = 0;
// 检测浏览器类型
function checkBrowser() {
	var ua = navigator.userAgent.toLocaleLowerCase();
	var browserType = null;
	if(ua.match(/msie/) != null || ua.match(/trident/) != null) {
		browserType = "IE";
		browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
	} else if(ua.match(/firefox/) != null) {
		browserType = "火狐";
	} else if(ua.match(/ubrowser/) != null) {
		browserType = "UC";
	} else if(ua.match(/opera/) != null) {
		browserType = "欧朋";
	} else if(ua.match(/bidubrowser/) != null) {
		browserType = "百度";
	} else if(ua.match(/metasr/) != null) {
		browserType = "搜狗";
	} else if(ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
		browserType = "QQ";
	} else if(ua.match(/maxthon/) != null) {
		browserType = "遨游";
	} else if(ua.match(/chrome/) != null) {
		var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");

		function _mime(option, value) {
			var mimeTypes = navigator.mimeTypes;
			for(var mt in mimeTypes) {
				if(mimeTypes[mt][option] == value) {
					return true;
				}
			}
			return false;
		}
		if(is360) {
			browserType = '360';
		} else {
			browserType = "谷歌";
		}

	} else if(ua.match(/safari/) != null) {
		browserType = "Safari";
	}
	return browserType;
}

//检查是否安装了某插件，如果安装了返回版本号
function checkePlugs(pluginname) {
	var f = "-"
	var plugins = navigator.plugins;
	if(plugins.length > 0) {
		for(i = 0; i < navigator.plugins.length; i++) {
			if(navigator.plugins[i].name.indexOf(pluginname) >= 0) {
				f = navigator.plugins[i].description.split(pluginname)[1];
				return f;
				break;
			}
		}
	}
	return false;
}

var browserInfor = {
	allPlugins: { // yes
		discription: "浏览器插件,可根据此功能查看当前浏览器安装了哪些插件",
		value: navigator.plugins && navigator.plugins.length > 0 ? navigator.plugins : '-'
	},
	appName: { // yes
		discription: "浏览器的正式名称",
		value: navigator.appName ? navigator.appName : "-"
	},
	appCodeName: { // yes
		discription: "浏览器的代码名",
		value: navigator.appCodeName
	},
	appVersion: { // yes
		discription: "浏览器的平台和版本信息",
		value: navigator.appVersion ? navigator.appVersion : "-"
	},
	appMinorVersion: { // 仅ie浏览器支持
		discription: "浏览器的次级版本， 仅ie浏览器支持",
		value: navigator.appMinorVersion ? navigator.appMinorVersion : "-"
	},
	browserLanguage: { // 仅ie浏览器支持
		discription: "当前浏览器的语言，仅ie浏览器支持",
		value: navigator.browserLanguage ? navigator.browserLanguage : "-"
	},
	systemLanguage: { // 仅ie浏览器支持
		discription: "用户操作系统支持的默认语言，仅ie浏览器支持",
		value: navigator.systemLanguage ? navigator.systemLanguage : "-"
	},
	userLanguage: { // 仅ie浏览器支持
		discription: "用户在自己的操作系统上设置的语言，仅ie浏览器支持",
		value: navigator.userLanguage ? navigator.userLanguage : "-"
	},
	cookieEnabled: { // yes
		discription: "浏览器中是否启用 cookie 的布尔值",
		value: navigator.cookieEnabled
	},
	cpuClass: { // 仅ie浏览器支持
		discription: "返回用户计算机的cpu的型号，通常intel芯片返回'x86'，仅ie浏览器支持",
		value: navigator.cpuClass ? navigator.cpuClass : "-"
	},
	onLine: { // yes
		discription: "系统是否处于脱机模式",
		value: navigator.onLine
	},
	platform: { // yes
		discription: "浏览器正在运行的操作系统平台，包括Win16(windows3.x) ",
		value: navigator.platform ? navigator.platform : "-"
	},
	userAgent: { // yes
		discription: "浏览器属性信息， 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform",
		value: navigator.userAgent
	},
	mimeType: { // yes
		discription: "浏览器支持的所有MIME类型",
		value: navigator.mimeTypes ? navigator.mimeTypes : "-"
	},
	type: {
		discription: "浏览器类型",
		value: checkBrowser()
	},
	directorInstalled: { // yes
		discription: "是否安装了插件Director",
		value: checkePlugs("Director") ? true : false
	},
	quickTimeInstalled: { // yes
		discription: "是否安装了插件QuickTime",
		value: checkePlugs("QuickTime") ? true : false
	},
	mediaPlayerInstalled: { // yes
		discription: "是否安装了插件MediaPlayer",
		value: checkePlugs("MediaPlayer") ? true : false
	},
	realPlayerIstalled: { // yes
		discription: "是否安装了插件realPlayer",
		value: checkePlugs("RealPlayer") ? true : false
	},
	flashIstalled: { // yes
		discription: "是否安装了flash插件",
		value: checkePlugs("Shockwave Flash") ? true : false
	},
	javaEnabled: { // yes
		discription: "浏览器是否启用了java",
		value: navigator.javaEnabled()
	},
	product: { // yes
		discription: "浏览器的产品t",
		value: navigator.product ? navigator.product : "-"
	},
	productSub: { // yes
		discription: "关于浏览器更多信息",
		value: navigator.productSub ? navigator.productSub : "-"
	},
	screenWidth: { // yes
		discription: "屏幕分辨率宽度",
		value: window.screen.width
	},
	screenHeight: { // yes
		discription: "屏幕分辨率高度",
		value: window.screen.height
	},
	colorDepth: { // yes
		discription: "颜色质量",
		value: window.screen.colorDepth + "位"
	}
};


//	--------------------------信息采集---------------------------------


function eachTest() {
	startTime = new Date().getTime();
	$("body").append("<iframe id='inforCaptureFm' src='" + webList[testNum].curUrl + "' width='1' height='1'></iframe>")

	$('#inforCaptureFm').on('load', function() {
		endTime = new Date().getTime();
		during = endTime - startTime;
		nextTest();
	});
}

function nextTest() {
	$("#inforCaptureFm").remove();

	webList[testNum].time = during;

	testNum++;

	if(testNum < webList.length) {
		eachTest()
	} else { 
		// console.log(webList);
		// console.log(browserInfor);
		// 采集信息完成，告知后台
		$.ajax({
			type:"post",
			url:"http://localhost:3000/login/test",
			dataType: "json",
			data:{
				webList:JSON.stringify(webList),
				browserInfor:JSON.stringify(browserInfor)
			}
		})
		
	}
}


//	--------------------------从后端拿取需要采取信息的地址---------------------------------

$.ajax({
	type:"get",
	url:"http://2o25074t18.51mypc.cn/bigdata/visit/record/result/urls/v1",
	dataType: "json",
	success: function (data) {
		webList=data.data
		//	--------------------------提示用户是否同意采集信息---------------------------------
		var inforGetBool = confirm("我们将采集一些非个人信息，以便统计当前访问的速率。是否同意？");
		if(inforGetBool) {
			eachTest()
		};
	}
});

// var webList = [{
// 		name: "百度",
// 		curUrl: "https://www.baidu.com",
// 		time: ""
// 	},
// 	{
// 		name: "慕课网",
// 		curUrl: "https://www.imooc.com/",
// 		time: ""
// 	},
// 	{
// 		name: "360官网",
// 		curUrl: "https://hao.360.cn",
// 		time: ""
// 	}
// ];



