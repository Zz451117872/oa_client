$(document).ready(function(){
	loadMyApplication(1,3);
	
	$("#applicationStatus").change(function(){
		loadMyApplication(1,3);
	});
	$("#isPersonal").change(function(){
		loadMyApplication(1,3);
	})
});

function loadMyApplication(pageNum,pageSize)
{
		var status = $("#applicationStatus").val();
		var isPersonal = $("#isPersonal").val();

		$.ajax({
			url:url_prefix+"workflow/find_applications.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"status":status,
					"isPersonal":isPersonal,
					"pageNum":pageNum,
					"pageSize":pageSize
					
				},
				success:function(result){
					if(result.status)
					{		
						var baseVOs = result.data.list;
						$(".new_add").remove();
						if(baseVOs != null)
						{
							fillBaseVOsToPage(baseVOs);
							
							updateCommonData(result,loadMyApplication);
						}
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}


function fillBaseVOsToPage(baseVOs)
{
	
	for(var i=0; i<baseVOs.length; i++)
	{
		var baseVO = baseVOs[i];
		var tr = fillBaseVOToPage(baseVO);
		$("#applications").append(tr);
	}
}

function fillBaseVOToPage(baseVO)
{
	var tr = $("<tr class='new_add'></tr>");
	var td = $("<td>"+baseVO.taskId+"</td>");
	tr.append(td);
		
	td = $("<td>"+baseVO.applicationName+"</td>");
	tr.append(td);
	
	td = $("<td>"+baseVO.businesstype+"</td>");
	tr.append(td);
	
	td = $("<td>"+baseVO.businesskey+"</td>");
	tr.append(td);
	
	td = $("<td>"+baseVO.status+"</td>");
	tr.append(td);
	
	td = $("<td>"+baseVO.approver+"</td>");
	tr.append(td);
	
	td = $("<td>"+baseVO.businessInfo+"</td>");
	tr.append(td);
	
	td = $("<td></td>");
	var viewDetail = $("<a href='#'>查看详细 <br></a>");
	var cancle = $("<a href='#'>取消 <br></a>");
	var viewDiagram  = $("<a href='#'>查看流程图 </a>");
	
	//绑定 查看业务详细 事件
	$(viewDetail).on("click",function(){
		$("#information").load("/oa_client/src/activiti/workflow/"+baseVO.businesstype+".html",function(){
			$("#businesskey").val(baseVO.businesskey);
		});		
	});
	
	//绑定 取消业务流程 事件
	$(cancle).on("click",function(){
		cancleTask(baseVO.taskId);
	});
	
	//绑定 查看业务流程图 事件
	$(viewDiagram).on("click",function(){
		doViewDiagram(baseVO.processInstanceId);
	});
	
	td.append(viewDetail).append(cancle).append(viewDiagram);
	tr.append(td);
	
	return tr;
}

function cancleTask(taskId)
{
	alert(taskId);
}

function doViewDiagram(executionId)
{
		$.ajax({
			url:url_prefix+"process/getFlowChart.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"executionId":executionId
				},
				success:function(result){
					if(result.status)
					{								
						$("#resource").attr("src","data:image/png;base64,"+result.data);
						ShowDiv('MyDiv','fade');
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}
