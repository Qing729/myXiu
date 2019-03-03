$(function () {
    //无缝轮播
    var $banner_ul = $(".banner>ul");
    var ul_li = $banner_ul.children("li").first().clone(true);
    $banner_ul.append(ul_li);
    var $ul_lis = $banner_ul.children();
    for (var i = 0; i < $ul_lis.length - 1; i++) {
        $(".banner>ol").html($(".banner>ol").html() + "<li></li>");
    }
    var $ol_lis = $(".banner>ol").children();
    var n = 1;
    var dot = 1;
    var timer;
    $ol_lis.eq(0).addClass("current");
    getPlayauto();
    $(".banner").on("mouseenter", function () {
        clearInterval(timer);
    });
    $(".banner").on("mouseleave", function () {
        clearInterval(timer);
        getPlayauto();
    });
    $ol_lis.each(function (index, ele) {
        $(ele).on("mouseenter", function () {
            clearInterval(timer);
            $ol_lis.eq(index).addClass("current").siblings().removeClass("current");
            $banner_ul.animate({
                left: -1200 * index
            });
            n = dot = index + 1;
        });
        $(ele).on("mouseleave", function () {
            clearInterval(timer);
            getPlayauto();
        });
    });

    function getPlayauto() {
        timer = setInterval(function () {
            if (n >= $ul_lis.length - 1) {
                dot = 0;
            }
            $ol_lis.eq(dot).addClass("current").siblings().removeClass("current");
            $banner_ul.animate({
                left: -1200 * n
            }, 300, function () {
                if (n >= $ul_lis.length - 1) {
                    $banner_ul.css("left", "0px");
                    n = 1;
                    dot = 1;
                } else {
                    n++;
                    dot++;
                }              
            });     
        }, 3000)
    }

    //页面滚动到指定位置
    $(".goods_recommend").on("click", function () {
        $("html,body").animate({scrollTop: $(".recommend").offset().top}, 1000);
    })
});
$(function () {
    //动态创建商品列表
    //get请求 get getJSON是jquery中的方法
    $.getJSON("http://127.0.0.1/xiushopping/server/getGoodsList.php").done(function (res) {
        for (var index in res) {
            var data = res[index];
            var liHTML = '<li>';
            liHTML += '<a href="goodsInfo.html?g_id=' + data.g_id + '">';
            liHTML += '<img src="' + data.imgs[0] + '" alt="">';
            liHTML += '</a>';
            liHTML += '</li>';
            $(".shopping>ul").append(liHTML);
        }
    })
});