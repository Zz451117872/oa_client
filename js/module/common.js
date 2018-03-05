
	window.currentPage;
	window.pageSize;
	window.totalPage;
	var func = function(){
		alert("xxxxx");
	}
	
	function upOrDownPage(size)
	{		
		var pageNum = (Number)(currentPage) + parseInt(size);
		if(parseInt(pageNum) <= parseInt(totalPage) && parseInt(pageNum) > 0)
		{
			func(pageNum,pageSize);
		}else{
			func(currentPage,pageSize);
		}
	}

	function selectPage(pageNum)
	{						
		if(parseInt(pageNum) <= parseInt(totalPage) && parseInt(pageNum) > 0)
		{
			func(pageNum,pageSize);
		}else{
			func(currentPage,pageSize);
		}
	}

	function updateCommonData(result,_func)
	{
		window.currentPage = result.data.pageNum;
		window.pageSize = result.data.pageSize;
		window.totalPage = result.data.pages;							
		func = _func;
		
		//完美解决 谷歌浏览器 对 iframe 相关操作不兼容问题
		if( pageIframe.window.document.readyState != "complete"){ //onreadystatechange : loading, loaded, Interactive complete
			document.getElementById("pageIframeId").onload = function(){
				frames[0].init(window.currentPage,window.pageSize,window.totalPage);
			};
		}else{
			frames[0].init(window.currentPage,window.pageSize,window.totalPage);
		}	
	}

