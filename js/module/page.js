$(document).ready(function(){
	
	$("#upPage").click(function(){		
		window.parent.upOrDownPage(-1);				
	});
	
		
	$("#downPage").click(function(){
		window.parent.upOrDownPage(1);	
	});
	
	
	$("#jumpPage").click(function(){
		var pageNum = $("#jumpPageNum").val();
		window.parent.selectPage(pageNum);
	});

});

function init(currentPage,pageSize,totalPage)
{	
//	alert(currentPage+":"+pageSize+":"+totalPage);
	$(".selectPage").remove();
	if(totalPage <= 5)
	{
		for(var i=totalPage ; i>0; i--)
		{
			var but = $("<button class='selectPage'>"+i+"</button>");
			$(but).on("click",function(){
				var pageNum = $(this).text();
				window.parent.selectPage(pageNum);
			});
			if(parseInt(i) == parseInt(currentPage))
			{
				$(but).css("background-color","red");
			}
			$("#upPage").after(but);
		}
	}else{
		var minPage = (Number)(currentPage) - 2;
		var maxPage = (Number)(currentPage) + 2;
		if(minPage < 1)
		{
			minPage = 1;
		}
		if(parseInt(maxPage) > parseInt(totalPage))
		{
			maxPage = totalPage;
		}
		for(var i=maxPage; i>= minPage; i--)
		{
			var but = $("<button class='selectPage'>"+i+"</button>");
			$(but).on("click",function(){
				var pageNum = $(this).text();
				window.parent.selectPage(pageNum);
			});
			if(parseInt(i) == parseInt(currentPage))
			{
				$(but).css("background-color","red");
			}
			$("#upPage").after(but);
		}
	}
}
