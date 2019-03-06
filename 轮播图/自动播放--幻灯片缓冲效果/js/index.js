window.onload = function ()
{
	var oBox = document.getElementById("box");
	var oList = oBox.getElementsByTagName("ul")[0];
	var aImg = oBox.getElementsByTagName("img");
	var timer = playTimer = null;
	var index = i = 0;
	var bOrder = true;
	var aTmp = [];
	
	//生成数字按钮
	for (i = 0; i < aImg.length; i++)
	{
		aTmp.push("<li>" + (i + 1) + "</li>")
	}
	
	//插入元素
	var oCount = document.createElement("ul");
	oCount.className = "count"
	oCount.innerHTML = aTmp.join("");
	oBox.appendChild(oCount);
	
	//初始化状态
	var aBtn = oBox.getElementsByTagName("ul")[1].getElementsByTagName("li");
	aBtn[index].className = "current";
	
	//按钮点击切换
	for (i = 0; i < aBtn.length; i++)
	{
		aBtn[i].index = i;
		aBtn[i].onclick = function ()
		{
			index = this.index;
			for (i = 0; i < aBtn.length; i++) aBtn[i].className = "";
			this.className = "current";			
			startMove(-(this.index * aImg[0].offsetHeight))		
		}
	}
	
	//鼠标移入展示区停止自动播放
	oBox.onmouseover = function ()
	{
		clearInterval(playTimer)
	};
	
	//鼠标离开展示区开始自动播放
	oBox.onmouseout = function ()
	{
		autoPlay()
	};
	
	//页面加载即调用自动播放
	oBox.onmouseout();
	
	//自动播放函数
	function autoPlay()
	{
		playTimer = setInterval(function ()
		{
			bOrder ? index++ : index--;			
			index == aBtn.length - 1 && (bOrder = false);
			index == 0 && (bOrder = true);
			aBtn[index].onclick();
			startMove(-(index * aImg[0].offsetHeight))
		}, 3000)
	}
	function startMove(iTarget)
	{
		clearInterval(timer);
		timer = setInterval(function ()
		{
			doMove(iTarget)
		}, 30)	
	}
	function doMove (iTarget)
	{
		var iSpeed = (iTarget - oList.offsetTop) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);		
		oList.offsetTop == iTarget ? clearInterval(timer) : oList.style.top = oList.offsetTop + iSpeed + "px"
	}
};