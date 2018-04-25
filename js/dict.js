function getDict(click_element_id,value_id,text_id,dict_name){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	var dataArray = [];
	doManager('dictManager','findDictByName',dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData){ 
				var dict = jsonData[index];
				dataArray.push({
					value:dict.dictCode,
					text:dict.dictText
				});
				if(objvalue.value == dict.dictCode){
					objtext.value = dict.dictText;
				}
			}
			picker.setData(dataArray);
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
			});
		}, false);
	}
	
	return dataArray;
}
function getJobDict(click_element_id,value_id,text_id,dict_name,hiden_id){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	var dataArray = [];
	doManager('dictManager','findDictByName',dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData){ 
				var dict = jsonData[index];
				dataArray.push({
					value:dict.dictCode,
					text:dict.dictText
				});
				if(objvalue.value == dict.dictCode){
					objtext.value = dict.dictText;
				}
			}
			picker.setData(dataArray);
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
				if(objtext.value=="其他"){
					$("#"+hiden_id).show();
				}else{
					$("#"+hiden_id).hide();
				}
			});
		}, false);
	}
	
	return dataArray;
}


//[{value:1,text:'信用卡'},{value:0,text:'快递'}]
function initDictFotData(click_element_id,value_id,text_id,data,default_value,hidden_id){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	picker.setData(data);
	var value = objvalue.value;
	if(value == '' || value == null){
		value = default_value;
	}
	for(var index in data){ 
		var dict = data[index];
		if(value == dict.value){
			objvalue.value = dict.value;
			objtext.value = dict.text;
		}
	}

	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
					var express_type_val = $('#'+value_id).val();
					    if(express_type_val==1){
							$('#'+hidden_id).html("");
						}else{
							$('#'+hidden_id).html("*");
				    }	
			});
			
		}, false);
	}
	return data;
}

function getDictForOnlyText(click_element_id,text_id,data){
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			objtext.value = items[0].text;
		});
	}, false);
}

function getNationData(){
	var nationData = [
		{text:'汉族'},
		{text:'状族'},
		{text:'满族'},
		{text:'回族'},
		{text:'苗族'},
		{text:'维吾尔族'},
		{text:'土家族'},
		{text:'彝族'},
		{text:'蒙古族'},
		{text:'藏族'},
		{text:'布衣族'},
		{text:'侗族'},
		{text:'瑶族'},
		{text:'朝鲜族'},
		{text:'白族'},
		{text:'哈尼族'},
		{text:'哈萨克族'},
		{text:'黎族'},
		{text:'傣族'},
		{text:'畲族'},
		{text:'傈僳族'},
		{text:'仡佬族'},
		{text:'东乡族'},
		{text:'高山族'},
		{text:'拉祜族'},
		{text:'水族'},
		{text:'佤族'},
		{text:'纳西族'},
		{text:'羌族'},
		{text:'土族'},
		{text:'仫佬族'},
		{text:'锡伯族'},
		{text:'柯尔克孜族'},
		{text:'达斡尔族'},
		{text:'景颇族'},
		{text:'毛南族'},
		{text:'撒拉族'},
		{text:'塔吉克族'},
		{text:'阿昌族'},
		{text:'普米族'},
		{text:'鄂温克族'},
		{text:'怒族'},
		{text:'京族'},
		{text:'基诺族'},
		{text:'德昂族'},
		{text:'保安族'},
		{text:'俄罗斯族'},
		{text:'裕固族'},
		{text:'乌兹别克族'},
		{text:'门巴族'},
		{text:'鄂伦春族'},
		{text:'独龙族'},
		{text:'塔塔尔族'},
		{text:'赫哲族'},
		{text:'珞巴族'},
		{text:'布朗族'}
	];
	return nationData;
}

//function getProvinceData(click_element_id,value_id,text_id,refresh_method){
//	var objvalue = mui('#'+value_id)[0];
//	var objtext = mui('#'+text_id)[0];
//	var picker = new mui.PopPicker();
//	var dataArray = [];
//	doManager('ProvinceManager','getProvince',null,function(data){
//		if(data.result){
//			var jsonData = JSON.parse(data.data);
//			for(var index in jsonData){ 
//				var dict = jsonData[index];
//				dataArray.push({
//					value:dict.province_id,
//					text:dict.province_name
//				});
//				if(objvalue.value == dict.province_id){
//					objtext.value = dict.province_name;
//				}
//			}
//			picker.setData(dataArray); 
//		}
//	},true);
//	
//	if(mui('#'+click_element_id).length > 0){
//		var objclick = mui('#'+click_element_id)[0];
//	
//		objclick.addEventListener('tap', function(event) {
//			picker.show(function(items) {
//				objtext.value = items[0].text;
//				objvalue.value = items[0].value;
//				refresh_method();
//			});
//		}, false);
//	}
//	
//	return dataArray;
//}
//function getCityData(click_element_id,value_id,text_id,dict_name){
//	var objvalue = mui('#'+value_id)[0];
//	var objtext = mui('#'+text_id)[0];
//	var picker = new mui.PopPicker();
//	var dataArray = [];
//	doManager('CityManager','getCityDataByProvinceID',dict_name,function(data){
//		if(data.result){
//			var jsonData = JSON.parse(data.data);
//			for(var index in jsonData){ 
//				var dict = jsonData[index];
//				dataArray.push({
//					value:dict.city_id,
//					text:dict.city_name
//				});
//				if(objvalue.value == dict.province_id){
//					objtext.value = dict.province_name;
//				}
//			}
//			picker.setData(dataArray);
//		}
//	},true);
//	
//	if(mui('#'+click_element_id).length > 0){
//		var objclick = mui('#'+click_element_id)[0];
//	
//		objclick.addEventListener('tap', function(event) {
//			picker.show(function(items) {
//				objtext.value = items[0].text;
//				objvalue.value = items[0].value;
//			});
//		}, false);
//	}
//	
//	return dataArray;
//}

//function getCountyData(click_element_id,value_id,text_id,dict_name){
//	var objvalue = mui('#'+value_id)[0];
//	var objtext = mui('#'+text_id)[0];
//	var picker = new mui.PopPicker();
//	var dataArray = [];
//	doManager('CountyManager','getCountyDataByCityID',dict_name,function(data){
//		if(data.result){
//			var jsonData = JSON.parse(data.data);
//			for(var index in jsonData){ 
//				var dict = jsonData[index];
//				dataArray.push({
//					value:dict.county_id,
//					text:dict.county_name
//				});
//				if(objvalue.value == dict.province_id){
//					objtext.value = dict.province_name;
//				}
//			}
//			picker.setData(dataArray);
//		}
//	},true);
//	
//	if(mui('#'+click_element_id).length > 0){
//		var objclick = mui('#'+click_element_id)[0];
//	
//		objclick.addEventListener('tap', function(event) {
//			picker.show(function(items) {
//				objtext.value = items[0].text;
//				objvalue.value = items[0].value;
//			});
//		}, false);
//	}
//	
//	return dataArray;
//}

//function getStreetData(click_element_id,value_id,text_id,dict_name){
//	alert(1);
//	var objvalue = mui('#'+value_id)[0];
//	var objtext = mui('#'+text_id)[0];
//	var picker = new mui.PopPicker();
//	var dataArray = [];
//	doManager('VillageManager','getVillageDataByTownId',dict_name,function(data){
//		if(data.result){
//			var jsonData = JSON.parse(data.data);
//			alert(JSON.stringify(jsonData));
//			for(var index in jsonData){ 
//				var dict = jsonData[index];
//				dataArray.push({
//					value:dict.town_id,
//					text:dict.town_name
//				});
//				if(objvalue.value == dict.province_id){
//					objtext.value = dict.province_name;
//				}
//			}
//			picker.setData(dataArray);
//		}
//	},true);
//	
//	if(mui('#'+click_element_id).length > 0){
//		var objclick = mui('#'+click_element_id)[0];
//	
//		objclick.addEventListener('tap', function(event) {
//			picker.show(function(items) {
//
//				if(objvalue.value != items[0].value){
//					objtext.value = items[0].text;
//					objvalue.value = items[0].value;
//					refresh_menthod();
//				}
//			});
//		}, false);
//	}
//	
//	return dataArray;
//}

function getData(click_element_id,value_id,text_id,dict_name,managerName,methodName,item_id, item_name,refresh_method,picker){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var dataArray = [];
	doManager(managerName,methodName,dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData){ 
				var dict = jsonData[index];
				dataArray.push({
					value:dict[item_id],
					text:dict[item_name]
				});
				if(objvalue.value == dict[item_id]){
					objtext.value = dict[item_name];
				}
			}
			picker.setData(dataArray); 
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				if(objvalue.value != items[0].value){
					objtext.value = items[0].text;
					objvalue.value = items[0].value;
					refresh_method();
				}
			});
		}, false);
	}
	
	return dataArray;
}
function getWhetherDict(click_element_id,text_id,data){
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	picker.pickers[0].setSelectedValue('no',2000);
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			objtext.value = items[0].text;
		});
	}, false);
}
function getBuildinglevelDict(click_element_id,text_id,data){
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			objtext.value = items[0].text;
		});
	}, false);
}
function getMoareInformation(click_element_id,text_id,data){
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			objtext.value = items[0].text;
		});
	}, false);
}
function getOriginCity(click_element_id,city_text,province_text,data){
	var city_text = mui('#'+city_text)[0];
	var province_text = mui('#'+province_text)[0];
	var picker = new mui.PopPicker({
						layer: 2
					});
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			city_text.value = items[0].text;
			province_text.value =items[1].text;
			
			
		});
	}, false);
}
function getOriginPro(click_element_id,city_text,province_text,data){
	var city_text = mui('#'+city_text)[0];
	var province_text = mui('#'+province_text)[0];
	var picker = new mui.PopPicker({
						layer: 2
					});
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			province_text.value =items[0].text;
			city_text.value = items[1].text;
			
			
			
		});
	}, false);
}
function getStreetDict(click_element_id,value_id,text_id,dict_name){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	var dataArray = [];
	doManager('StoreManager','getStoreCityInfoById',dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData.townData){ 
				var dict = jsonData.townData[index];
				dataArray.push({
					value:dict.id,
					text:dict.name
				});
				if(objvalue.value == dict.id){
					objtext.value = dict.name;
				}
			}
			picker.setData(dataArray);
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
			});
		}, false);
	}
	
	return dataArray;
}
function getStreetData(click_element_id,value_id,text_id,dict_name,managerName,methodName,item_id, item_name,refresh_method,picker){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var dataArray = [];
	doManager(managerName,methodName,dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData.townData){ 
				var dict = jsonData.townData[index];
				dataArray.push({
					value:dict[item_id],
					text:dict[item_name]
				});
				if(objvalue.value == dict[item_id]){
					objtext.value = dict[item_name];
				}
			}
			picker.setData(dataArray); 
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				if(objvalue.value != items[0].value){
					objtext.value = items[0].text;
					objvalue.value = items[0].value;
					refresh_method();
				}
			});
		}, false);
	}
	
	return dataArray;
}

function getNationalityDict(click_element_id,value_id,text_id,dict_name){
	var objvalue = mui('#'+value_id)[0];
	var objtext = mui('#'+text_id)[0];
	var picker = new mui.PopPicker();
	var dataArray = [];
	doManager('dictManager','findDictByName',dict_name,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData){ 
				var dict = jsonData[index];
				dataArray.push({
					value:dict.dictCode,
					text:dict.dictText
				});
				if(objvalue.value == dict.dictCode){
					objtext.value = dict.dictText;
				}
			}
			picker.setData(dataArray);
		}
	},true);
	
	if(mui('#'+click_element_id).length > 0){
		var objclick = mui('#'+click_element_id)[0];
	
		objclick.addEventListener('tap', function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
			});
		}, false);
	}
	
	return dataArray;
}
function getBuildingDict(click_element_id,text_id,hidden_id,data){
	var objtext = mui('#'+text_id)[0];
	var hidden_context = mui('#'+hidden_id)[0];
	var picker = new mui.PopPicker();
	
	picker.setData(data);
	var objclick = mui('#'+click_element_id)[0];
	objclick.addEventListener('tap', function(event) {
		picker.show(function(items) {
			objtext.value = items[0].text;
			hidden_context.value=items[0].value;
		});
	}, false);
}