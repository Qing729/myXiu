$(function () {
    //返回顶部
    $(".top_back").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
    $("#top_back>span").on("click", function () {
        $(this).parent().remove();
    });
    //滚动条事件
    var nav_msg_top = $(".nav_msg").offset().top;
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 720) {
            $("#left_ewm").show();
        } else {
            $("#left_ewm").hide();
        }
        if ($(document).scrollTop() >= nav_msg_top) {
            $(".nav_msg").css({
                "position": "fixed",
                "top": "0px"
            });
        } else {
            $(".nav_msg").css("position", "static");
        }
    });
    //图片选择
    $(".smallbox>li").each(function (index, ele) {
        $(ele).on("mouseenter", function () {
            $(".bigbox>li>img").eq(index).fadeIn().parent().siblings().children("img").fadeOut();
            $(this).addClass("bg_bor").children("a").addClass("no_bor");
            $(this).siblings().removeClass("bg_bor").children("a").removeClass("no_bor");
            $(".largebox").css("background-image", "url(src/images/img_shopping/g" + (index + 1) + "_900_1200.jpg)");
        })
    });
    //放大镜
    var smallImg = $(".bigbox");
    var smallArea = $(".smallArea");
    smallArea.width(smallImg.width() * (smallImg.width() / 900));
    smallArea.height(smallImg.height() * (smallImg.height() / 1200));
    var leftside = smallImg.offset().left;
    var rightside = smallImg.offset().left + smallImg.width();
    var topside = smallImg.offset().top;
    var bottomside = smallImg.offset().top + smallImg.height();
    var scale_x = 900 / smallImg.width();
    var scale_y = 1200 / smallImg.height();
    $(document).on("mousemove", function (evt) {
        var e = evt || window.event;
        if (e.pageX > leftside && e.pageX < rightside && e.pageY > topside && e.pageY < bottomside) {
            smallArea.css("display", "block");
            $(".largebox").css("display", "block");
            var x = e.pageX - smallImg.offset().left - smallArea.width() / 2;
            var y = e.pageY - smallImg.offset().top - smallArea.height() / 2;
            if (x < 0) {
                x = 0;
            } else if (x > smallImg.width() - smallArea.width()) {
                x = smallImg.width() - smallArea.width();
            }
            if (y < 0) {
                y = 0;
            } else if (y > smallImg.height() - smallArea.height()) {
                y = smallImg.height() - smallArea.height()
            }
            smallArea.css({
                left: x,
                top: y
            });
            $(".largebox").css({
                "background-position-x": -x * scale_x,
                "background-position-y": -y * scale_y
            })
        } else {
            smallArea.css("display", "none");
            $(".largebox").css("display", "none");
        }
    })

});
$(function () {
    //通过g_id拿到对应的商品信息 再动态生成商品详情页
    var gid = getUrlById();
    console.log(gid);
    $.getJSON({
        url: "http://127.0.0.1/xiushopping/server/getGoodsById.php",
        data: {"g_id": gid}
    }).done(function (res) {
        for (var index  in res) {
            var data = res[index];
            var sHTML = "<span>" + data.g_name + "</span>";
            $(".location h5").append(sHTML);
            var liHTML = '<li>';
            liHTML += '<img src="' + data.imgs[1] + '" alt="">';
            liHTML += '</li>';
            $(".bigbox").prepend(liHTML);
            var hHTML = "<h4>" + data.g_name + "</h4>";
            $(".buy_right>ul>li").eq(0).prepend(hHTML);
            var pHTML = "<p>走&nbsp;秀&nbsp;价 : <b>￥<span>" + data.g_price + "</span></b></p>";
            $(".buy_right>ul>li").eq(1).prepend(pHTML);
            $(".buy_bag").attr("data-info", JSON.stringify(data));
        }
    });
    addnum();
    //加入购物车
    var flag = true;
    $("body").on("click", ".buy_bag", function () {
        if (flag == true) {
            flag = false;
            var dataInfo = $(this).data("info");//当前点击的信息
            if (IsLogin() == true) {
                //用户已登录 添加到数据库 cookie中的合并到数据库
                var cookieCart = JSON.parse($.cookie("cart") || '[]');
                if (cookieCart.length > 0) {
                    //cookie中有商品
                    for (var i = 0; i < cookieCart.length; i++) {
                        //登录后cookie中添加u_id属性
                        cookieCart[i].u_id = getUserInfo().u_id;
                    }
                    for (var i = 0; i < cookieCart.length; i++) {
                        $.ajax({
                            url: "http://127.0.0.1/xiushopping/server/addCart.php",
                            type: "post",
                            data: cookieCart[i],
                            success: function () {
                                var saveObj = {
                                    g_id: dataInfo.g_id,
                                    u_id: getUserInfo().u_id,
                                    c_name: dataInfo.g_name,
                                    c_price: dataInfo.g_price,
                                    c_path: dataInfo.imgs[2],
                                    c_num: $(".spinnerExample").val()
                                };
                                $.ajax({
                                    url: "http://127.0.0.1/xiushopping/server/addCart.php",
                                    data: saveObj,
                                    type: "post",
                                    dataType: "json"
                                }).done(function (res) {
                                    console.log(res);
                                })
                            }
                        })
                    }
                    //数据添加更新结束后，删除cookie 通过覆盖删除
                    $.cookie("cart", null, {expires: -7});
                } else {
                    var saveObj = {
                        g_id: dataInfo.g_id,
                        u_id: getUserInfo().u_id,
                        c_name: dataInfo.g_name,
                        c_price: dataInfo.g_price,
                        c_path: dataInfo.imgs[2],
                        c_num: $(".spinnerExample").val()
                    };
                    $.ajax({
                        url: "http://127.0.0.1/xiushopping/server/addCart.php",
                        data: saveObj,
                        type: "post",
                        dataType: "json"
                    }).done(function (res) {
                        console.log(res);
                    })
                }
            } else {
                //用户未登录 添加到cookie
                var cookieArr = JSON.parse($.cookie("cart") || '[]');
                var iscookie = true;//默认没有相同的商品
                for (var i = 0; i < cookieArr.length; i++) {
                    //读取cookie中的数据，如果有同一个商品，修改数量后保存
                    if (cookieArr[i].g_id == dataInfo.g_id) {
                        cookieArr[i].c_num = parseInt(cookieArr[i].c_num) + parseInt($(".spinnerExample").val());
                        iscookie = false;
                    }
                }
                if (iscookie == true) {
                    var saveObj = {
                        g_id: dataInfo.g_id,
                        c_name: dataInfo.g_name,
                        c_price: dataInfo.g_price,
                        c_path: dataInfo.imgs[2],
                        c_num: $(".spinnerExample").val()
                    };
                    cookieArr.push(saveObj)
                }
                $.cookie("cart", JSON.stringify(cookieArr), {expires: 7})
            }
            //飞入购物车效果
            $p = $(".buy_bag").parent();
            $p.append("<img src='" + dataInfo.imgs[2] + "'>");
            $p.children("img").css({"position": "absolute", "width": 0, "height": 0, "left": 300, "top": 0});
            $top = $(".shoppingcart").parents("#top_back").offset().top - $p.offset().top + 100;
            $left = $(".shoppingcart").parents("#top_back").offset().left - $p.offset().left;
            console.log($(".shoppingcart").parents("#top_back").offset());
            $p.children("img").animate({"width": "40px", "height": "60px"}, function () {
                $p.children("img").animate({
                    "top": $top,
                    "left": $left,
                    "width": 0,
                    "height": 0
                }, 600, function () {
                    $(".shoppingcart").css("background-position-x", -68);
                    addnum();
                    addgoodsnum();
                    flag = true;
                })
            })
        }
    });
});
//购物袋商品数增加效果
function addnum() {
    if (IsLogin() == true) {
        $.getJSON({
            url: "http://127.0.0.1/xiushopping/server/getCart.php",
            data: {"userName": getUserInfo().userName}
        }).done(function (res) {
            if (res.length > 0) {
                $(".menu_right b").css("display", "block");
                $(".shoppingcart").css("background-position-x", -68)
                var num = 0;
                for (var i = 0; i < res.length; i++) {
                    num += parseInt(res[i].c_num);
                }
                $(".menu_right b").text(num);
            }
        });
    } else {
        var cookieArr = JSON.parse($.cookie("cart") || '[]');
        if (cookieArr.length > 0) {
            $(".menu_right b").css("display", "block");
            $(".shoppingcart").css("background-position-x", -68);
            var num = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                num += parseInt(cookieArr[i].c_num);
            }
            $(".menu_right b").text(num);
        }
    }
}
//头部购物袋商品数增加效果
function addgoodsnum() {
    if (IsLogin() == true) {
        $.getJSON({
            url: "http://127.0.0.1/xiushopping/server/getCart.php",
            data: {"userName": getUserInfo().userName}
        }).done(function (res) {
            if (res.length > 0) {
                var num = 0;
                for (var i = 0; i < res.length; i++) {
                    num += parseInt(res[i].c_num);
                }
                $(".goodsnum").text(num);
                $(".mybuy").text("购物袋内有" + num + "件商品哦！")
            }
        });
    } else {
        var cookieArr = JSON.parse($.cookie("cart") || '[]');
        if (cookieArr.length > 0) {
            var num = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                num += parseInt(cookieArr[i].c_num);
            }
            $(".goodsnum").text(num);
            $(".mybuy").text("购物袋内有" + num + "件商品哦！")
        }
    }
}