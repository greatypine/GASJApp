
/*
* @methodName   : setFormSimpleData
* @methodParam1  : String （JSON字符串）
* @methodParam2  : String （form表单的名字）
* @methodReturn : boolean
* @author       : ruanqingfeng
* @desc         : 加载form数据
* @for example1  : setFormSimpleData("{key1:'11',key2:'22'}");(用JSON字符串对全局范围赋值)
* @for example2  : setFormSimpleData({key1:'11',key2:'22'});（用JSON对象对全局范围赋值)
* @for example3  : setFormSimpleData("{key1:'11',key2:'22'}","formName1");（用JSON字符串对某个form赋值)
* @for example4  : setFormSimpleData({key1:'11',key2:'22'},"formName1");（用JSON对象对某个form赋值)
*/
function setFormSimpleData(json,divName) {
	if(json==null||json==""){
		json = {};	
	}
	if(typeof(json)=="string"){//传过来的是JSON字符串
		json = JSON.parse(json);
	}
	
	for(var key in json){
		var obj = null;
		var value = json[key];
		if(divName!=null&&divName!=""){
			obj = $("div[id=" + divName + "]").find("[name=" + key + "]");	
		}else{
			obj = $("[name=" + key + "]");
		}
		obj.each(function(i){
			var str_type = $(this).attr("type") == null?"":($(this).attr("type")).toUpperCase();
			if(str_type =="RADIO"){
				if($(this).val()==value){
					this.checked = true;
				}
			}else if(str_type =="CHECKBOX"){
				if(("," + value + ",").indexOf("," + $(this).val() + ",")!=-1){
					this.checked = true;
				}
			}else if((this.tagName).toUpperCase()=="SELECT"){
				$(this).attr("value",value);
			}else if((this.tagName).toUpperCase()=="LABEL"){
				$(this).html(value);
			}else if((this.tagName).toUpperCase()=="SPAN"){
				$(this).html(value);
			}else{
				if(obj.attr("format")=="date"){
					if(value!=null&&value!=""){
						value = new Date(parseInt(value)).format("yyyy-MM-dd");	
					}
				}
				if(obj.attr("bidFormat")=="date"){
					if(value!=null&&value!=""){
						value = new Date(parseInt(value)).format("yyyy-MM-dd hh:mm");	
					}
				}
				if(obj.attr("bidFormat")=="dateYMD"){
					if(value!=null&&value!=""){
						value = new Date(parseInt(value)).format("yyyy-MM-dd");	
					}
				}
				obj.val(value);
			}
		})
		
	}
	return true;
}

/*
* @methodName   : getFormSimpleData
* @methodParam2  : String （form表单的名字）
* @methodReturn : []
* @author       : ruanqingfeng
* @desc         : 获取一组规则的form数据，返回[{key1:value1},{key1:value1},{key1:value1}]
* @for example1  : getFormSimpleData("formName");(用JSON字符串对全局范围赋值)
*/
function getFormSimpleData(formName) {
	var formName = formName!=""&formName!=null?"#"+formName+" ":"";
	var arr = $(formName + "input[name]");
	var returnVal = {};
	$.each(arr,function(i,obj){
		if($(obj).attr("type")=="file"){
			return;	
		}
		if($(obj).attr("bidTableFlag")=="true"){
			return;	
		}
		if($(obj).attr("type")=="radio"){
			var arr_name = $(obj).attr("name");
			returnVal[arr_name] = $('input[name="'+arr_name+'"]:checked').val();
			return;
		}
		
		returnVal[($(obj).attr("name"))] = $(obj).val();
	});
	
	arr = $(formName + "select[name]");
	$.each(arr,function(i,obj){
		if($(obj).attr("bidTableFlag")=="true"){
			return;	
		}
		returnVal[($(obj).attr("name"))] = $(obj).val();
	})
	arr = $(formName + "textarea[name]");
	$.each(arr,function(i,obj){
		if($(obj).attr("bidTableFlag")=="true"){
			return;	
		}
		returnVal[($(obj).attr("name"))] = $(obj).text();
	})
	return returnVal;
}