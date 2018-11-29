var projectpath = 'http://10.16.31.175:8082/daqWeb/';
//var projectpath = 'https://www.guoanshuju.com/daqWeb/';
//var projectpath = 'http://10.16.31.242/daqWeb/';
//var gasmpath = 'http://10.16.31.242:8888/GASM/';
var gasmpath = 'https://store.guoanshuju.com/GASM/';
//var projectpath = 'https://daqweb.guoanshequ.top/daqWeb/';
//var img_path = 'https://imagedata.guoanshequ.com/file_manager/';
var img_path='https://cdn.guoanshuju.com/daqWeb';
//var img_path = 'http://10.16.42.201:8080/file_manager/';
//var img_path = 'http://10.16.31.242/file_manager/';
//快递订单图片上传
var server = projectpath + 'AppUploaderAction.action?businessType=bidAttachment';
//var file_server = projectpath + 'fileUpload.action';

var file_server = projectpath + 'uploadFileToOss.action';
var filepath = projectpath;
//广告位图片地址
var img_filepath = img_path;

function doManager(managerName, methodName, params, callback, isAsync, errormethod) {
	if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_WIFI &&
		plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_CELL4G) {
		mui.toast('网络异常');
		return;
	}
	if(methodName != "queryActualMothlyTurnover") {
		var wt = plus.nativeUI.showWaiting();
	}

	if(isAsync == null || typeof(isAsync) == 'undefined') {
		isAsync = true;
	}
	var path = projectpath + "dispatcher.action";
	var data = null;
	if(typeof(params) == "string" || typeof(params) == "number") { //单个字符串
		data = new PMSRequestObject(managerName, methodName, [params], null);
	}
	if(params == null) {
		data = new PMSRequestObject(managerName, methodName, null, null);
	} else if(typeof(params) == "object") {
		if(params.length == null) { //对象
			data = new PMSRequestObject(managerName, methodName, [toJSON(params)], null);
		} else { //数组
			var arr = [];
			for(var i = 0; i < params.length; i++) {
				var param = params[i];

				if(typeof(param) == "string") { //数组中是字符串
					arr.push(params[i]);
				} else if(param == null) { //空
					arr.push(params[i]);
				} else { //数组中是对象
					arr.push(toJSON(params[i]));
				}
			}
			data = new PMSRequestObject(managerName, methodName, arr, null);
		}
	}

	try {
		if(mui.os.ios) {
			mui.ajax({
				url: path,
				dataType: "json",
				type: "POST",
				async: isAsync, // Ajax同步
				crossDomain: true, // ios系统必须这样用，否则https无法正确通信
				data: "requestString=" + encodeURIComponent(toJsonString(data)),
				success: function(data, textStatus, XMLHttpRequest) {
					if(methodName != "queryActualMothlyTurnover") {
						wt.close();
					}
					var result = JSON.parse(data.data);
					if(data.code == "999") {
						var btnArray = ['取消', '重试'];
						mui.confirm(data.message, '系统提示', btnArray, function(e) {
							if(e.index == 1) {
								doManager(managerName, methodName, params, callback, isAsync, errormethod);
							}
						});
						return;
					}
					if(data.result) {
						callback(data);
					} else {
						mui.toast(result.message);
					}

				},
				error: function() {
					setTimeout(function() {
						if(methodName != "queryActualMothlyTurnover") {
							wt.close();
						}
						mui.toast("服务器链接异常，请联系管理员");
						if(errormethod == null || typeof(errormethod) == 'undefined') {
							return;
						}
						errormethod();
					}, 100);
				}
			});
		} else {
			mui.ajax({
				url: path,
				dataType: "json",
				type: "POST",
				async: isAsync, // Ajax同步
				data: "requestString=" + encodeURIComponent(toJsonString(data)),
				success: function(data, textStatus, XMLHttpRequest) {
					if(methodName != "queryActualMothlyTurnover") {
						wt.close();
					}
					var result = JSON.parse(data.data);
					if(data.code == "999") {
						var btnArray = ['取消', '重试'];
						mui.confirm(data.message, '系统提示', btnArray, function(e) {
							if(e.index == 1) {
								doManager(managerName, methodName, params, callback, isAsync, errormethod);
							}
						});
						return;
					}
					if(data.result) {
						callback(data);
					} else {
						mui.toast(result.message);
					}
				},
				error: function() {
					setTimeout(function() {
						if(methodName != "queryActualMothlyTurnover") {
							wt.close();
						}
						mui.toast("服务器链接异常，请联系管理员");
						if(errormethod == null || typeof(errormethod) == 'undefined') {
							return;
						}
						errormethod();
					}, 100);
				}
			});

		}

	} catch(e) {
		setTimeout(function() {
			if(methodName != "queryActualMothlyTurnover") {
				wt.close();
			}
			mui.toast("服务器链接异常，请联系管理员");
			if(errormethod == null || typeof(errormethod) == 'undefined') {
				return;
			}
			errormethod();
		}, 100);
	}

}

/**
 * Request Object is the data model used to communicate with server side.
 *
 * @author Zhou Zaiqing
 * @since 2010/11/21
 */
var PMSRequestObject = function(managerName, methodName, parameters, token) {
	this.managerName = managerName;
	this.methodName = methodName;
	this.parameters = parameters;
	this.token = token;
};

//function autoUpdate(){
//	alert(plus.runtime.version);
//	doManager('InterManager','getCurrentVersion',plus.runtime.version,function(data){
//		 alert(JSON.stringify(data));
//		if(data!= null && typeof(data) != 'undefined' && data.result){
//			var lst_data = JSON.parse(data.data);
//			if(lst_data != null){
//				var btnArray = ['否', '是'];
//				mui.confirm('有新版本升级，是否升级？', '检查更新', btnArray, function(e) {
//					if (e.index == 1) {
//						if (mui.os.ios) {
//							plus.runtime.openURL( 'https://data.guoanshequ.com/daqWeb/download/download.html', function onError(error){
//								mui.toast('打开升级页面失败！');
//							});
//						}else{
//							downWgt(true,lst_data);
//						}
//					} 
//				});
//				
//			}
//		}
//	});
//}
// isupdate: 0正常更新 1强制更新2不更新; 
function newAutoUpdate() {
	doManager('InterManager', 'getNewCurrentVersion', plus.runtime.version, function(data) {
		if(data != null && typeof(data) != 'undefined' && data.result) {
			var lst_data = JSON.parse(data.data);
			if(lst_data != null) {
				var file_name = lst_data.appVersion.file_name;
				var isupdate = lst_data.appVersion.isupdate;
				if(file_name != null) {
					update(isupdate, file_name);

				}
			}

		}
	});
}
//tiptype:0没有通知  1全部通知  2只ios提示消息 3只android提示消息
function newMessagepdate() {
	doManager('InterManager', 'getNowCurrentVersion', plus.runtime.version, function(data) {
		if(data != null && typeof(data) != 'undefined' && data.result) {
			var lst_data = JSON.parse(data.data);
			if(lst_data != null) {
				var tiptype = lst_data.appVersion.tiptype;
				var message = lst_data.appVersion.message;
				var mv = localStorage.getItem('message_version');
				var new_message = localStorage.getItem('new_message');
				//				if(message != null){
				var system_version = mui.os.android ? 3 : 2;
				if((tiptype == 1 || tiptype == system_version) && (plus.runtime.version != mv || new_message != message)) {
					var btnArray = ['是'];
					localStorage.setItem('message_version', plus.runtime.version);
					localStorage.setItem('new_message', message);
					mui.confirm(message, '提示', btnArray, function(e) {
						newAutoUpdate();
					});
				} else {
					newAutoUpdate();
				}

				//				}
			} else {
				newAutoUpdate();
			}

		} else {
			newAutoUpdate();
		}
	});
}

function update(isupdate, file_name) {
	var btnArray = null;
	var messagecontext = null;
	if(isupdate == 0) {
		btnArray = ['是', '否'];
		messagecontext = '有新版本升级，是否升级？';
	} else if(isupdate == 1) {
		btnArray = ['是'];
		messagecontext = '有新版本升级，请升级！';
		
	}

	if(btnArray != null) {
		mui.confirm(messagecontext, '检查更新', btnArray, function(e) {
			if(e.index == 0) {
				if(mui.os.ios) {
					plus.runtime.openURL('https://www.guoanshuju.com/daqWeb/download/download.html',
						function onError(error) {
							mui.toast('打开升级页面失败！');
						});
					saveDownLoadLog("IOS");
				} else {
					downWgt(true, file_name);
					saveDownLoadLog("Android");
				}
			}
			
		});
	}
	

}

function downWgt(key, version) {
	var wgtUrl = img_path +"/static/"+ version;
	var w;

	if(key) {
		w = plus.nativeUI.showWaiting("　　 开始下载...　　");
	}
	var options = {
		filename: "_doc/update/"
	};
	var dtask = plus.downloader.createDownload(wgtUrl, options, function(d, status) {
		if(status == 200) {
			console.log("下载wgt成功：" + d.filename);
			setTimeout(installWgt(d.filename, key), 2000); // 安装wgt包
		} else {
			console.log("下载wgt失败！");
			if(key) {
				plus.nativeUI.alert("下载更新资源失败！");
			}
		}
	});
	if(key) {
		dtask.addEventListener("statechanged", function(task, status) {
			switch(task.state) {
				case 1: // 开始
					w.setTitle("　　 开始下载...　　 ");
					break;
				case 2: // 已连接到服务器
					w.setTitle("　　 开始下载...　　 ");
					break;
				case 3:
					var a = task.downloadedSize / task.totalSize * 100;
					console.log(a)
					w.setTitle("　　 已下载" + parseInt(a) + "%　　 ");
					break;
				case 4: // 下载完成
					w.close();
					break;
			}
		});
	}
	dtask.start();

}

function installWgt(path, key) {
	if(key) {
		plus.nativeUI.showWaiting("在线升级，安装资源文件...");
	}
	plus.runtime.install(path, {}, function() {
		if(key) {
			plus.nativeUI.closeWaiting();
			//自动在线升级不重启
			plus.nativeUI.alert("应用资源更新完成！", function() {
				plus.runtime.restart();
			});
		}
		console.log("安装wgt文件成功！");

	}, function(e) {

		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		if(key) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert("在线升级，安装资源文件失败");
		}
	});
}

/**
 * Serial Request Object to Json String.
 *
 * @author Zhou zaiqing
 * @since 2010/11/22
 */
var toJsonString = function(requestObject) {
	return toJSON({
		managerName: requestObject.managerName,
		methodName: requestObject.methodName,
		parameters: requestObject.parameters,
		token: requestObject.token
	});
};

function toJSON(object) {
	if(object === null) return "null";
	if(object === 0) {
		return object.toString();
	}
	if(!object)
		return null;

	var type = typeof object;
	if('object' == type) {
		if(Array == object.constructor)
			type = 'array';
		else if(RegExp == object.constructor)
			type = 'regexp';
		else
			type = 'object';
	}
	switch(type) {
		case 'undefined':
		case 'unknown':
			return;
			break;
		case 'function':
		case 'boolean':
		case 'regexp':
			return object.toString();
			break;
		case 'number':
			return isFinite(object) ? object.toString() : 'null';
			break;
		case 'string':
			return '"' +
				object.replace(/(\\|\")/g, "\\$1").replace(
					/\n|\r|\t/g,
					function() {
						var a = arguments[0];
						return(a == '\n') ? '\\n' :
							(a == '\r') ? '\\r' :
							(a == '\t') ? '\\t' : ""
					}) + '"';
			break;
		case 'object':
			if(object === null)
				return 'null';
			var results = [];
			for(var property in object) {
				var value = JSON.stringify(object[property]);
				if(value !== undefined)
					results.push(JSON.stringify(property) + ':' + value);
			}
			return '{' + results.join(',') + '}';
			break;
		case 'array':
			var results = [];
			for(var i = 0; i < object.length; i++) {
				var value = JSON.stringify(object[i]);
				if(value !== undefined)
					results.push(value);
			}
			return '[' + results.join(',') + ']';
			break;
	}
}

function fromJSON(jStr) {
	return(new Function('return ' + jStr))();
}

function checkValue(value) {
	if(value == null || value.trim() == '') {
		return false;
	}
	return true;
}

function ischeckValue(value) {
	if(value == null || value == '') {
		return false;
	}
	return true;
}

//function jump(_this){
//	var id = _this.getAttribute('id');
//	var href = _this.getAttribute('path');
//	//不使用父子模板方案的页面
//	var webview = plus.webview.getWebviewById(id);
//	if(webview != null){
//		webview.close();
//	}
//	mui.openWindow({
//		id: id,
//		url: href,
//		createNew:true,
//		show: {
//			aniShow: "slide-in-right"
//			},
//			waiting: {
//				autoShow: false
//			}
//	});
//
//}
function jump(_this) {
	var id = _this.getAttribute('id');
	var href = _this.getAttribute('path');
	setAccessLog(id);
	var webview = plus.webview.getWebviewById(id);
	if(webview != null) {
		webview.hide();
		webview.close();
	}
	setTimeout(function() {
		mui.openWindow({
			id: id,
			url: href,
			createNew: true,
			show: {
				aniShow: "none"
			},
			waiting: {
				autoShow: false
			}
		});
	}, 100);

}

function tojump(id, path) {
	setAccessLog(id);
	var webview = plus.webview.getWebviewById(id);
	if(webview != null) {
		//		webview.hide();
		webview.close();
	}
	setTimeout(function() {
		mui.openWindow({
			id: id,
			url: path,
			createNew: true,
			show: {
				aniShow: "none"
			},
			waiting: {
				autoShow: false
			}

		});
	}, 100);

}

function saveDownLoadLog(type) {
	var cname = returnCitySN.cname;
	var ip = returnCitySN.cip;
	doManager("InterManager", "saveDownloadLog", [type, ip, cname], function(data) {
		if(data.result == true) {}
	}, false);
}
//访问日志
function setAccessLog(businesstype) {
	var employee = JSON.parse(localStorage.getItem('employee'));
	var businessType = "";
	if(businesstype == "maps") {
		businessType = "地图";
	} else if(businesstype == "web_message") {
		businessType = "消息";
	} else if(businesstype == "tabbar") {
		businessType = "录入";
	} else if(businesstype == "web_shopkeeper_new" || businesstype == "web_index") {
		businessType = "混片儿";
	} else if(businesstype == "cs_my") {
		businessType = "我";
	} else if(businesstype == "city_main") {
		businessType = "动态";
	}
	var userInfo = {};
	userInfo.citynames = returnCitySN.cname;
	userInfo.loginip = returnCitySN.cip;
	userInfo.token = employee.token;
	userInfo.businessType = businessType;
	userInfo.id = employee.id;
	doManager("InterManager", "saveAppUserAccessLog", userInfo, function(data) {
		if(data.result == true) {
			var jsonStore = JSON.parse(data.data);
		} else {

		}
	});
}

function doManager_GASM(managerName, methodName, params, callback, isAsync, errormethod) {
	if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_WIFI &&
		plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_CELL4G) {
		mui.toast('网络异常');
		return;
	}
	if(methodName != "queryActualMothlyTurnover") {
		var wt = plus.nativeUI.showWaiting();
	}

	if(isAsync == null || typeof(isAsync) == 'undefined') {
		isAsync = true;
	}
	var path = gasmpath + "dispatcher.action";
	var data = null;
	if(typeof(params) == "string" || typeof(params) == "number") { //单个字符串
		data = new PMSRequestObject(managerName, methodName, [params], null);
	}
	if(params == null) {
		data = new PMSRequestObject(managerName, methodName, null, null);
	} else if(typeof(params) == "object") {
		if(params.length == null) { //对象
			data = new PMSRequestObject(managerName, methodName, [toJSON(params)], null);
		} else { //数组
			var arr = [];
			for(var i = 0; i < params.length; i++) {
				var param = params[i];

				if(typeof(param) == "string") { //数组中是字符串
					arr.push(params[i]);
				} else if(param == null) { //空
					arr.push(params[i]);
				} else { //数组中是对象
					arr.push(toJSON(params[i]));
				}
			}
			data = new PMSRequestObject(managerName, methodName, arr, null);
		}
	}

	try {
		if(mui.os.ios) {
			mui.ajax({
				url: path,
				dataType: "json",
				type: "POST",
				async: isAsync, // Ajax同步
				crossDomain: true, // ios系统必须这样用，否则https无法正确通信
				data: "requestString=" + encodeURIComponent(toJsonString(data)),
				success: function(data, textStatus, XMLHttpRequest) {
					if(methodName != "queryActualMothlyTurnover") {
						wt.close();
					}
					var result = JSON.parse(data.data);
					if(data.code == "999") {
						var btnArray = ['取消', '重试'];
						mui.confirm(data.message, '系统提示', btnArray, function(e) {
							if(e.index == 1) {
								doManager(managerName, methodName, params, callback, isAsync, errormethod);
							}
						});
						return;
					}
					if(data.result) {
						callback(data);
					} else {
						mui.toast(result.message);
					}

				},
				error: function() {
					setTimeout(function() {
						if(methodName != "queryActualMothlyTurnover") {
							wt.close();
						}
						mui.toast("服务器链接异常，请联系管理员1");
						if(errormethod == null || typeof(errormethod) == 'undefined') {
							return;
						}
						errormethod();
					}, 100);
				}
			});
		} else {
			mui.ajax({
				url: path,
				dataType: "json",
				type: "POST",
				async: isAsync, // Ajax同步
				data: "requestString=" + encodeURIComponent(toJsonString(data)),
				success: function(data, textStatus, XMLHttpRequest) {
					if(methodName != "queryActualMothlyTurnover") {
						wt.close();
					}
					var result = JSON.parse(data.data);
					if(data.code == "999") {
						var btnArray = ['取消', '重试'];
						mui.confirm(data.message, '系统提示', btnArray, function(e) {
							if(e.index == 1) {
								doManager(managerName, methodName, params, callback, isAsync, errormethod);
							}
						});
						return;
					}
					if(data.result) {
						callback(data);
					} else {
						mui.toast(result.message);
					}
				},
				error: function() {
					setTimeout(function() {
						if(methodName != "queryActualMothlyTurnover") {
							wt.close();
						}
						mui.toast("服务器链接异常，请联系管理员2");
						if(errormethod == null || typeof(errormethod) == 'undefined') {
							return;
						}
						errormethod();
					}, 100);
				}
			});

		}

	} catch(e) {
		setTimeout(function() {
			if(methodName != "queryActualMothlyTurnover") {
				wt.close();
			}
			mui.toast("服务器链接异常，请联系管理员3");
			if(errormethod == null || typeof(errormethod) == 'undefined') {
				return;
			}
			errormethod();
		}, 100);
	}

}
//复制到剪切板
function copyShareUrl(_this){
	mui.plusReady(function(){
//		var id = _this.getAttribute('id');
//		alert(id);
		//复制链接到剪切板
		var copy_content = document.getElementById("mycode").innerText;
		
		//判断是安卓还是ios
		if(mui.os.ios){
			//ios
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
		    var generalPasteboard = UIPasteboard.generalPasteboard();
		    //设置/获取文本内容:
		    generalPasteboard.plusCallMethod({
		        setValue:copy_content,
		        forPasteboardType: "public.utf8-plain-text"
		    });
		    generalPasteboard.plusCallMethod({
		        valueForPasteboardType: "public.utf8-plain-text"
		    });
		    mui.toast("复制成功");
		}else{
			//安卓
			var context = plus.android.importClass("android.content.Context");
		  	var main = plus.android.runtimeMainActivity();
		  	var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
		  	plus.android.invoke(clip,"setText",copy_content);
		  	mui.toast("复制成功");
		}
	});
} 