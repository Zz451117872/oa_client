
$(document).ready(function(){	
	refreshHomepage();
	////系统管理区
	//用户信息
	$("#user").on("click",function(){
		$("#information").load("src/system/user/user_list.html")
	});
	//部门信息
	$("#part").on("click",function(){
		$("#information").load("src/system/part/part_list.html")
	});
	//角色信息
	$("#role").on("click",function(){
		$("#information").load("src/system/role/role_list.html")
	});
	//权限信息
	$("#privilege").on("click",function(){
		$("#information").load("src/system/privilege/privilege_list.html")
	});
	
	////论坛管理区
	//版块信息
	$("#forum").on("click",function(){
		$("#information").load("src/forum/forums/forum_list.html")
	});
	
	//主题信息
	$("#topic").on("click",function(){
		$("#information").load("src/forum/topic/topic_list.html")
	});
	
	//回复信息
	$("#reply").on("click",function(){
		$("#information").load("src/forum/reply/reply_list.html")
	});
	
	////业务流程管理区
	//我的申请
	$("#myApplication").on("click",function(){
		$("#information").load("src/activiti/myApplication.html")
	});
	
	//待我审批
	$("#needMeApprove").on("click",function(){
		$("#information").load("src/activiti/needMeApprove.html")
	});
	
	//我的历史
	$("#myHistoryTask").on("click",function(){
		$("#information").load("src/activiti/myHistoryTask.html")
	});
	
	//流程定义管理
	$("#allPDF").on("click",function(){
		$("#information").load("src/activiti/allPDF.html")
	});
			
	//流程定义管理
	$("#userTask").on("click",function(){
		$("#information").load("src/activiti/user_task/user_task.html")
	});
	
	$("#logout").on("click",function(){
		//window.location.reload();
		$.cookie("username","x",{'expires':-10,'path':'/oa_client'});
		logout();		
		refreshHomepage();
	});
});

function logout()
{
		$.ajax({
			url:url_prefix+"user/logout.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"GET",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{},
				success:function(result){
					if(result.status)
					{		
						window.location.reload();				
					}else{
						alert(result.msg);
					}
				}
			})
}

function refreshHomepage()
{
	var username = $.cookie("username");
	if(username != null && username != "")
	{
		$(".logined").show();
		$(".nologin").hide();
		$("#wecomeing").text("欢迎："+unescape(username));
	}else{
		$(".logined").hide();
		$(".nologin").show();
	}
}

