$(document).ready(function(){
	loadProcessName();
	
	$("#deploy_PDF").click(doDeployPDF);
	
	$("#deployPDF_zip").click(doDeployPDF_ZIP);
});

function doDeployPDF_ZIP()
{
	var formData = new FormData();
	formData.append('filename', $('input[name=filename]')[0].files[0]);
	 		$.ajax({
                 url: url_prefix+"process/deploy_pdf_by_zip.do",
                 type: 'POST',
                 headers:{
					"Access-Control-Allow-Credentials":"true"
					},
				xhrFields:{
					withCredentials:true
					},
                 data: formData,
                 contentType: false, // 注意这里应设为false
                 processData: false,
                 cache: false,
                 success: function(result) {
                     $("#information").load("/OA_client/src/activiti/allPDF.html");
                 },
                 error: function () {
                     alert("faild");
                 }
             })
}

function doDeployPDF()
{
	
	var processName = $("#processName").val();
	var deploymentName = $("#deploymentName").val();
		$.ajax({
			url:url_prefix+"process/deploy_pdf.do",
				headers:{
					"Access-Control-Allow-Credentials":"true"
				},
				type:"POST",
				xhrFields:{
					withCredentials:true
				},
				dataType:"json",
				data:{
					"processName":processName,
					"deploymentName":deploymentName
				},
				success:function(result){
					if(result.status)
					{		
						$("#information").load("/OA_client/src/activiti/allPDF.html");
					}else{
						alert(result.msg);
					}
				},
				error:function(){
					alert("xxx");
				}
			})
}

function loadProcessName()
{
		$.ajax({
			url:url_prefix+"process/all_pdf_names.do",
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
						var pdf_names = result.data;
						if(pdf_names != null)
						{
							for(var i=0; i<pdf_names.length; i++)
							{
								var pdf_name = pdf_names[i];
								$("#processName").append("<option value='"+pdf_name+"'>"+pdf_name+"</option>");
							}
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
