 	/*
	*  2014-03-26,by led810
	*/
	var jude_window='';
	var ids=new Array();
	
   /*
	*	用户键入选择已创建项目时，自动加载数据
	*	othis,this
	*   toWindow,要显示出来的窗口
	*   url,后台数据操作链接
	*   fieldName,表单名称
	*/
	function showInputWindow(othis,toWindow,url,fieldName){
		  //判断是否同一个窗口，主要用于ids数据操作
		  if(toWindow!=jude_window){  
				jude_window=toWindow; 
				ids=new Array(); 
		  } 	  
		  
		  var top = $(othis).position().top+22;
		  var left = $(othis).position().left; 
		  
		  $(toWindow).css({top:top,left:left});
		  //显示窗口
		  $(toWindow).show(); 
		  //加载中的图标
		  $('.loadIcon').show();
		  UlStr = "";  
		 //Url存在则是向后台读取JSON格式数据
		 if(url){
			 data=[	  
					 {'name':'001','value':'京市'}, 
					 {'name':'002','value':'津市'}, 
					 {'name':'003','value':'海市'}, 
					 {'name':'004','value':'庆市'},  
				  ]; 
		 }else{
			 data=[	 
					 {'name':'6101','value':'北京市'}, 
					 {'name':'6102','value':'天津市'}, 
					 {'name':'6103','value':'上海市'}, 
					 {'name':'6104','value':'重庆市'},   
				  ]; 
		}
		json=eval(data);  
		for ( var i = 0; i < json.length; i++) {  
			UlStr = UlStr + "<li class='DoubleWidthLi' onclick='choiceTagsToInput(this,\""+fieldName+"\")'><input type='hidden' id='c_"+fieldName+"_id' value='"+json[i].name+"'/><span id='c_"+fieldName+"_name'>"+json[i].value+"</span></li>"
		} 
		$(toWindow+" .list> ul").html(UlStr);  
	}
 
	//列表mouseover事件-字体变色效果
	$("div[class='list'] ul li").mouseover(function(){
	  $(this).css("color","red"); 
	});
	//列表mouseout事件
	$("div[class='list'] ul li").mouseout(function(){
	  $(this).css("color","");
	});
	
	//隐藏showInputWindow的窗口
	function remShowInpWin(){
		$("div[class='showInputWindow']").hide();
	}
	
	/*
	 * 用户点击选择内容
	 * othis,this
	 * fieldName,与showInputWindow()相同,都是表单名
	 */
	function choiceTagsToInput(othis,fieldName){ 
	  
		listID='#'+fieldName+'_id';
		listName='#'+fieldName+'_name';
		c_listID='#c_'+fieldName+'_id';
		c_listName='#c_'+fieldName+'_name';
		
		be_value = $(listName).html();	 
		 
		newPname = $(othis).children(c_listName).html();
		id       = $(othis).children(c_listID).val();
		toPname  = '<span class="'+fieldName+'_tags" id="'+id+'">&nbsp;'+newPname+'<a href="javascript:;" onclick="removeTags(this,\'.'+fieldName+'_tags\',\''+listID+'\')" title="删除">x</a></span>';
		
		//给表单填充选择的数据
		$(listName).html(be_value+toPname);  
		
		ids.push(id);
		//给隐藏的ID表达添上数据 
		$(listID).val(ids);
		 
	}
	 
	/*
	 * 用户删除选择的标签
	 * othis,this
	 * oparent,父选择器
	 * fieldID，隐藏表单的Ids
	*/
	function removeTags(othis,oparent,fieldID){ 
		var found = ""; 
	 
		$(othis).parent().remove(); 
		 
		var index = $(othis).parent(oparent).attr("id");
		
		//字符串转数组
		var id_val=$(fieldID).val();  
		var	id_rr = id_val.split(",");
			
		// 从id_rr数组中找出与#id标签相同的值 
		for(i=0;i<id_rr.length;i++){
			if(id_rr[i] == index){
				found = i;
				continue;
			}
		}
		
		//从id_rr中剔除index值
		if(index != " " || index != "undefined")
			id_rr.splice(parseInt(found),1);
		// 更新fieldID表单
		$(fieldID).val(id_rr);  
	}
	 