$(document).ready(function(){
	loadMyTask(1,3);
	$("#isPersonal").change(function(){
		loadMyTask(1,3);
	});
});


function loadMyTask(pageNum,pageSize)
{
	var isPersonal = $("#isPersonal").val();
		$.ajax({
			url:url_prefix+"workflow/find_tasks.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
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
							
							updateCommonData(result,loadMyTask);
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
		$("#myTasks").append(tr);
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
			
	$(viewDetail).on("click",function(){
		$("#information").load("/OA_client/src/activiti/workflow/"+baseVO.businesstype+".html",function(){
			$("#businesskey").val(baseVO.businesskey);
		});		
	});
	td.append(viewDetail);
	if(baseVO.approver == null || baseVO.approver == "")
	{
		var claim = $("<a href='#'>认领 </a>");
		$(claim).on("click",function(){
			claimTask(baseVO.taskId);
		});
		td.append(claim);
	}else if(baseVO.approver == baseVO.applicationName){
		var toRepeatApply = $("<a href='#'>重新申请<br> </a>");
		$(toRepeatApply).on("click",function(){
			$("#information").load("/OA_client/src/activiti/workflow/"+baseVO.businesstype+".html",function(){
				$("#taskId").val(baseVO.taskId);
				$("#businesskey").val(baseVO.businesskey);			
			});
		});
		td.append(toRepeatApply);
	}else{
		var toComplete = $("<a href='#'>完成<br> </a>");
		$(toComplete).on("click",function(){
			
			$("#information").load("/OA_client/src/activiti/task/taskComplete.html",function(){
				$("#taskId").val(baseVO.taskId);
				$("#businesstype").text(baseVO.businesstype);
				$("#applicationName").text(baseVO.applicationName);
				$("#businessInfo").text(baseVO.businessInfo);
			});
		});
		
		var toDelegate = $("<a href='#'>委托 <br></a>");
		$(toDelegate).on("click",function(){
			$("#information").load("/OA_client/src/activiti/task/taskDetegate.html",function(){
				$("#taskId").val(baseVO.taskId);
				$("#businesstype").text(baseVO.businesstype);
				$("#applicationName").text(baseVO.applicationName);
				$("#businessInfo").text(baseVO.businessInfo);
			});
		});
		
		var toTransfer = $("<a href='#'>转办 </a>");
		$(toTransfer).on("click",function(){
			$("#information").load("/OA_client/src/activiti/task/taskTransfer.html",function(){
				$("#taskId").val(baseVO.taskId);
				$("#businesstype").text(baseVO.businesstype);
				$("#applicationName").text(baseVO.applicationName);
				$("#businessInfo").text(baseVO.businessInfo);
			});
		});
		td.append(toComplete).append(toDelegate).append(toTransfer);
	}
	
	tr.append(td);
	
	return tr;
}

//认领任务
function claimTask(taskId)
{
		$.ajax({
			url:url_prefix+"workflow/claim_task.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"taskId":taskId
				},
				success:function(result){
					if(result.status)
					{		
						$("#information").load("/OA_client/src/activiti/needMeApprove.html");	
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}
