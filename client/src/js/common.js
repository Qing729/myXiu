$(function () {
    addgoodsnum();
    if(IsLogin() == true) {
        console.log(1111);
        addcart();
        addgoodsnum();
    };
    //头部鼠标点击事件
    $(".subnav>ul>li").on("mouseenter", function () {
        $(this).children(".submenu").show().end().siblings().children(".submenu").hide();
        $(this).children("a").addClass("setborder").end().siblings().children("a").removeClass("setborder");
    })
    $(".subnav>ul").on("mouseleave", function () {
        $(this).find(".submenu").hide();
        $(this).children().children("a").removeClass("setborder");
    })
    $(".header-left>ul>li").eq(1).children("a").on("mouseenter", function () {
        $(this).parent().children(".mybuy").show();
    })
    $(".header-left>ul>li").eq(1).on("mouseleave", function () {
        $(this).children(".mybuy").hide();
    })
    $(".header-left>ul>li").eq(2).children("a").on("mouseenter", function () {
        $(this).parent().children("ul").show();
    })
    $(".header-left>ul>li").eq(2).on("mouseleave", function () {
        $(this).children("ul").hide();
    })
    //跳转页面
    $(".shoppingcart").on("click",function () {
        window.location.href="shoppingCart.html";
    });
    //登录退出
    if(IsLogin()==true){
        var datauserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(datauserInfo);
        $(".login").text(datauserInfo.userName);
        $(".login").css({"width":"40px","white-space":"nowrap","overflow":"hidden","text-overflow":"ellipsis"});
        $(".login_pare").prepend("<span>您好，</span>");
        $(".login_pare").append("<a href='javascript:void(0)' class='exit'>[退出]</a>");
        $(".login_pare>span").css({"color": "#b7b7b7","float":"left","padding-top":"9px"});
    }
    $("body").on("click",".exit",function () {
        sessionStorage.removeItem("userInfo");
        window.location.reload(true)
    })
});
//登录时cookie中数据添加到数据库，删除cookie
function addcart() {
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
            }).done(function (res) {
                console.log(res);
            })
        }
        //数据添加更新结束后，删除cookie 通过覆盖删除
        $.cookie("cart", null, {expires: -7});
    }
}
//头部购物袋商品数增加效果
function addgoodsnum() {
    if(IsLogin() == true){
        $.getJSON({
            url: "http://127.0.0.1/xiushopping/server/getCart.php",
            data: {"userName": getUserInfo().userName}
        }).done(function (res) {
            if(res.length>0){
                var num=0;
                for(var i=0;i<res.length;i++){
                    num+=parseInt(res[i].c_num);
                }
                $(".goodsnum").text(num);
                $(".mybuy").text("购物袋内有"+num+"件商品哦！")
            }
        });
    }else {
        var cookieArr = JSON.parse($.cookie("cart") || '[]');
        if (cookieArr.length > 0) {
            var num=0;
            for(var i=0;i<cookieArr.length;i++){
                num+=parseInt(cookieArr[i].c_num);
            }
            $(".goodsnum").text(num);
            $(".mybuy").text("购物袋内有"+num+"件商品哦！")
        }
    }
}


