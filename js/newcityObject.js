
cityObject.prototype.click_method = null;
cityObject.prototype.parent_id = null;
cityObject.prototype.click_element_id = null;
cityObject.prototype.value_id = null;
cityObject.prototype.text_id = null;
cityObject.prototype.parent_id = null;
cityObject.prototype.store_id = null;
cityObject.prototype.managerName = null;
cityObject.prototype.methodName = null;
cityObject.prototype.item_id = null; 
cityObject.prototype.item_name = null;
cityObject.prototype.refresh_method = null;
cityObject.prototype.dataArray = [];
cityObject.prototype.showMessage = null;
cityObject.prototype.picker = null;

function newcityObject(click_element_id,value_id,text_id,parent_id,store_id,managerName,methodName,item_id, item_name,refresh_method){
	this.parent_id = parent_id;
	this.click_element_id = click_element_id;
	this.value_id = value_id;
	this.text_id = text_id;
	this.parent_id = parent_id;
	this.store_id=store_id;
	this.managerName = managerName;
	this.methodName = methodName;
	this.item_id = item_id; 
	this.item_name = item_name;
	this.refresh_method = refresh_method;
	this.picker = new mui.PopPicker();
	this.refresh();
}

newcityObject.prototype.refresh = function(){
	var objvalue = mui('#'+this.value_id)[0];
	var objtext = mui('#'+this.text_id)[0];
	var objclick = mui('#'+this.click_element_id)[0];
	var parentValue = $('#'+this.parent_id).val();
	if(parentValue == null || parentValue == ''){
		if(this.click_method != null){
			objclick.removeEventListener('tap', this.click_method);
			this.click_method = null;
		}
		if(this.showMessage == null){
			this.showMessage = function(){
				mui.toast('请先选择上一级内容。');
			}
			objclick.addEventListener('tap',this.showMessage);
		}
		return;
	}else{
		if(this.showMessage != null){
			objclick.removeEventListener('tap',this.showMessage);
			this.showMessage = null;
		}
	}

	var arrays = [];
	var picker = this.picker;
	var item_id = this.item_id;
	var item_name = this.item_name;
	if(this.click_element_id=="county"){
		var cparams = {
			city_id:parentValue,
			store_id:this.store_id
				    
	   };
		
	}else if(this.click_element_id=="street"){
		var cparams = {
			county_id:parentValue,
			store_id:this.store_id
				    
	   };
	}
	
	doManager(this.managerName,this.methodName,cparams,function(data){
		if(data.result){
			var jsonData = JSON.parse(data.data);
			for(var index in jsonData){ 
				var dict = jsonData[index];
				arrays.push({
					value:dict[item_id],
					text:dict[item_name]
				});
				if(objvalue.value == dict[item_id]){
					objtext.value = dict[item_name];
				}
			}
			picker.setData(arrays); 
		}
	},true);
	this.dataArray = arrays;
	
		
	var refresh_method = this.refresh_method;
	if(this.click_method == null){
		this.click_method = function(event) {
			picker.show(function(items) {
				objtext.value = items[0].text;
				objvalue.value = items[0].value;
				refresh_method();
			});
		};
		objclick.addEventListener('tap', this.click_method, false);
	}
	
}
