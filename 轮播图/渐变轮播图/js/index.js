$(function() {
	var num = 0;
	// 1.0 当鼠标经过小点的时候，切换对应的图片
	$("ol li").on("mouseenter", function() {
		var index = $(this).index();
		$("ul li").eq(index).fadeIn(500).siblings().fadeOut(500);
		$(this).addClass('active').siblings().removeClass('active');
		num = index;
	})

	// 2.0 点击右键头
	$("#arrRight").on("click", function() {
		autoPlay()
	})
	$("#arrLeft").on("click", function() {
		num--;
		if(num < 0) {
			num = $("ul li").length - 1
		}
		$("ul li").eq(num).fadeIn(500).siblings().fadeOut(500);
		$("ol li").eq(num).addClass('active').siblings().removeClass('active');
	})

	function autoPlay() {
		num++;
		if(num > $("ul li").length - 1) {
			num = 0
		}
		$("ul li").eq(num).fadeIn(500).siblings().fadeOut(500);
		$("ol li").eq(num).addClass('active').siblings().removeClass('active');
	}

	// 3.0 自动轮播
	var timerId = setInterval(autoPlay, 1000)

	// 4.0 鼠标经过banner  停止播放
	$(".container").hover(function() {
		clearInterval(timerId)
	}, function() {
		timerId = setInterval(autoPlay, 1000)
	});
})