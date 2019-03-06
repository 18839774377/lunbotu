window.onload = function() {
	bannerEffect();
}


function bannerEffect() {
	var index = 1;
	// 1.0 在图片列表中，前后各添加一张（前面添加最后一张，最后添加的是第一张）
	var banner = document.querySelector(".banner");
	var ulBox = banner.children[0];
	var firstLi = ulBox.children[0];
	var lastLi = ulBox.querySelector("li:last-of-type");
	// 在前面插入最后一张的复制图
	ulBox.insertBefore(lastLi.cloneNode(true), firstLi);
	// 在最后插入一张第一张的复制图
	ulBox.appendChild(firstLi.cloneNode(true))

	// 2.0 修改默认的样式
	var bannerWidth = banner.offsetWidth;
	var count = ulBox.children.length;
	// 2.1 让ul能够装下所有的盒子
	function resize() {
		bannerWidth = banner.offsetWidth;
		// 设置ul的总宽度
		ulBox.style.width = count * bannerWidth + "px";
		for (var i = 0; i < ulBox.children.length; i++) {
			ulBox.children[i].style.width = bannerWidth + "px";
		}
		ulBox.style.left = -(index * bannerWidth) + "px";
	}
	resize()
	// 2.2 当屏幕大小发生改变的时候，重复2.1的操作
	window.onresize = function() {
		resize()
	}
	
	// 3.0 设置图片自动轮播   加加，判断和执行
	setInterval(function() {
		index++;
		// 添加过渡效果，让ulbox发生位移
		ulBox.style.transition = "left .3s ease-in-out";
		ulBox.style.left = -(index * bannerWidth) + "px";
		// 判断，index如果是第count-1的时候，就直接以没有过渡的方式跳回第一张
		if(index == count - 1) {
			setTimeout(function() {
				index = 1;
				ulBox.style.transition = "none";
				ulBox.style.left = -(index * bannerWidth) + "px";
			}, 300)
		}
	}, 1000)
}