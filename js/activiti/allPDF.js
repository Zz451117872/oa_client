$(document).ready(function(){
	loadAllPDF(1,3);
	
	$("#deployWorkflow").click(function(){
		$("#information").load("/oa_client/src/activiti/deployPDF.html");
	});
	$("#deployAllWorkflow").click(doDeployAllWorkflow);
	$("#deleteAllWorkflow").click(doDeleteAllWorkflow);
	$("#initAllUserTask").click(doInitAllUserTask);
});


function doDeployAllWorkflow()
{
	$.ajax({
			url:url_prefix+"process/deploy_all_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
				},
				success:function(result){
					if(result.status)
					{		
						$("#information").load("/oa_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

function doDeleteAllWorkflow()
{
		$.ajax({
			url:url_prefix+"process/delete_all_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
				},
				success:function(result){
					if(result.status)
					{		
						$("#information").load("/oa_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

function loadAllPDF(pageNum,pageSize)
{
		$.ajax({
			url:url_prefix+"process/all_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"pageNum":pageNum,
					"pageSize":pageSize
				},
				success:function(result){
					if(result.status)
					{		
						if( result.data == null ) return;
						var PDFs = result.data.list;
						if(PDFs != null)
						{
							fillPDFsToPage(PDFs);
							
							updateCommonData(result,loadAllPDF);
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

function fillPDFsToPage(PDFs)
{
	$(".new_add").remove();
	for(var i=0; i<PDFs.length; i++)
	{
		var PDF = PDFs[i];
		var tr = fillPDFToPage(PDF);
		$("#pdf_list").append(tr);
	}
}

function fillPDFToPage(PDF)
{
	var tr = $("<tr class='new_add'></tr>");
	var td = $("<td>"+PDF.id+"</td>");
	tr.append(td);
	
	td = $("<td>"+PDF.name+"</td>");
	tr.append(td);
	
	td = $("<td>"+PDF.key+"</td>");
	tr.append(td);
	
	td = $("<td>"+PDF.version+"</td>");
	tr.append(td);
	
	td = $("<td>"+PDF.deploymentId+"</td>");
	tr.append(td);
		
	td = $("<td>"+PDF.deploymentTime+"</td>");
	tr.append(td);	
	
	td = $("<td>"+PDF.suspended+"</td>");
	tr.append(td);
	
	td = $("<td></td>");
	
	var startWorkflow = $("<a href='#'>开启流程<br></a>");
	var deletes = $("<a href='#'>删除流程<br></a>");
	var viewDiagram = $("<a href='#'>查看流程图<br></a>");
	var initUserTask = $("<a href='#'>初始化用户任务<br></a>");
	var editUserTask = $("<a href='#'>编辑用户任务<br></a>");
	
	
	$(startWorkflow).on("click",function(){
		$("#information").load("/oa_client/src/activiti/workflow/startWorkflow.html",function(){
			$("#processDefinitionKEY").val(PDF.key);
		});
	});
	
	$(deletes).on("click",function(){
		deletePDF(PDF.id);
	});
	
	$(viewDiagram).on("click",function(){
		doViewDiagram(PDF.id);
	});
	
	$(initUserTask).on("click",function(){
		doInitUserTask(PDF.id);
	});
	
	$(editUserTask).on("click",function(){
		$("#information").load("/oa_client/src/activiti/user_task/user_task.html",function(){
			$("#pdf_key").val(PDF.key);		
		});
	});
	
	td.append(startWorkflow).append(deletes).append(viewDiagram).append(initUserTask).append(editUserTask);
	tr.append(td);
	
	return tr;
}

function deletePDF(processDefinitionId)
{
		$.ajax({
			url:url_prefix+"process/delete_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"processDefinitionId":processDefinitionId
				},
				success:function(result){
					if(result.status)
					{		
						$("#information").load("/oa_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

function doViewDiagram(processDefinitionId)
{
			$.ajax({
			url:url_prefix+"process/get_resource_map.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"processDefinitionId":processDefinitionId
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

function doInitUserTask(processDefinitionId)
{
		$.ajax({
			url:url_prefix+"user_task/init_single_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"processDefinitionId":processDefinitionId
				},
				success:function(result){
					if(result.status)
					{								
						$("#information").load("/oa_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

function doInitAllUserTask()
{
			$.ajax({
			url:url_prefix+"user_task/init_all_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
				},
				success:function(result){
					if(result.status)
					{								
						$("#information").load("/oa_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

