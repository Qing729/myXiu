$(function () {
    //添加购物车
    if (IsLogin() == true) {
        //登录时
        addCart();
        $("body").on("click",":checkbox",function () {
            getTotal_log()
        });
        $("body").on("click",$(".spinner button"),function(){
			getTotal_log()
	    })
    } else {
        //未登录时
        addCartcookie();
        $("body").on("click",$(".spinner button"),function(){
			getTotal();
		})
        $("body").on("click",":checkbox",function () {
            getTotal()
        });
    }
    //全选反选
    $(".ckb").on("click", function () {
        $(":checkbox").prop("checked",$(this).prop("checked"));
    });
    $("body").on("click",":checkbox[name='cbx']",function () {
        var cbxs=$(":checkbox[name='cbx']").length;
        // console.log(cbxs);
        var cbxchecked=$("tbody :checked").length;
        // console.log(cbxchecked);
        $(".ckb").prop("checked",cbxs==cbxchecked)
    });
    //登录退出
    if(IsLogin()==true){
        var datauserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(datauserInfo);
        $(".login").text(datauserInfo.userName);
        $(".login").css({"width":"40px","white-space":"nowrap","overflow":"hidden","text-overflow":"ellipsis"});
        $(".login_pare").append("<a href='javascript:void(0)' class='exit'>[退出]</a>");
    }
    $("body").on("click",".exit",function () {
        sessionStorage.removeItem("userInfo");
        window.location.reload(true)
    });
    //删除商品
    $("body").on("click",".del",function () {
        del($(this));
        console.log($(this))
        window.location.reload(true)
    });
    $("body").on("click",".alldel",function () {
        $(":checkbox[name='cbx']").each(function (index, ele) {
            if ($(ele).prop("checked") == true) {
                del($(this).parent().parent().find(".del"))
            }
        })
        window.location.reload(true)
    })
});

//添加购物车 登录时
function addCart() {
    $.getJSON({
        url: "http://127.0.0.1/xiushopping/server/getCart.php",
        data: {"userName": getUserInfo().userName}
    }).done(function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            var data=res[i];
            var trHTML = "<tr>";
            trHTML += "<td><input type='checkbox' name='cbx' checked></td>";
            trHTML += "<td><img src='" + res[i].c_path + "'></td>";
            trHTML += "<td><span>Morphy Richards</span><br><a href='#'>" + res[i].c_name + "</a><br><span>颜色 : 黄色 尺码 : 均码</span></td>";
            trHTML += "<td><s><i>￥</i>" + res[i].c_price + "</s><br><b><i>￥</i>" + res[i].c_price + "</b></td>";
            trHTML += "<td><input type='text' class='spinnerExample' value='" + res[i].c_num + "'></td>";
            trHTML += "<td><a href='#'>移至收藏夹</a><br><a href='javascript:void(0)' data-info='"+JSON.stringify(data)+"' class='del'>删除</a></td>";
            trHTML += "</tr>";
            $("table>tbody").append(trHTML);
        }
        var k= $('.spinnerExample').spinner({
            value:1,
            min : 1
        });
        for(var j = 0;j<k.length;j++){
            k[j].value = k[j].defaultValue;
        };
        $("#btn").click(function(){
            var num = $(".spinnerExample").val();
            console.log(num);
        });
        console.log(res.length);
        if(res.length==0){
            $(".nogoods").css("display","block");
            $(".goods").css("display","none")
        }
        getTotal_log();
    });
}
//添加购物车 未登录时
function addCartcookie() {
    var cookieCart = JSON.parse($.cookie("cart") || '[]');
    console.log(cookieCart);
    for (var i = 0; i < cookieCart.length; i++) {
        console.log(parseInt(cookieCart[i].c_price));
        var trHTML = "<tr>";
        trHTML += "<td><input type='checkbox' name='cbx' checked></td>";
        trHTML += "<td><img src='" + cookieCart[i].c_path + "'></td>";
        trHTML += "<td><span>Morphy Richards</span><br><a href='#'>" + cookieCart[i].c_name + "</a><br><span>颜色 : 黄色 尺码 : 均码</span></td>";
        trHTML += "<td><s>" + cookieCart[i].c_price + "</s><br><b>" + cookieCart[i].c_price + "</b></td>";
        trHTML += "<td><input type='text' class='spinnerExample' value='" + cookieCart[i].c_num + "'/></td>";
        trHTML += "<td><a href='#'>移至收藏夹</a><br><a href='javascript:void(0)' class='del'>删除</a></td>";
        trHTML += "</tr>";
        $("table>tbody").append(trHTML);
    }
    var k= $('.spinnerExample').spinner({
        value:1,
        min : 1
    });
    for(var j = 0;j<k.length;j++){
        k[j].value = k[j].defaultValue;
    };
    $("#btn").click(function(){
        var num = $(".spinnerExample").val();
        console.log(num);
    });
    if(cookieCart.length==0){
        $(".nogoods").css("display","block");
        $(".goods").css("display","none")
    }
    getTotal();
}
//删除购物车
function del(obj) {
    //未登录时，删cookie
    var cookieCart = JSON.parse($.cookie("cart") || '[]');
    if(cookieCart.length>0){
        $(obj).parent().parent().remove();
        var tr=$(obj).parent().parent();
        var c_name=tr.children().eq(2).children("a").text();
        console.log(c_name);
        for(var i=0;i<cookieCart.length;i++){
            if(cookieCart[i].c_name==c_name){
                cookieCart.splice(i,1);
            }
        }
        console.log(cookieCart);
        $.cookie("cart",JSON.stringify(cookieCart), {expires: 7});
    }
    //登录时，删数据库
    if(IsLogin() == true){
        var dataInfo = obj.data("info");
        console.log(dataInfo);
        $.ajax({
            url:"http://127.0.0.1/xiushopping/server/removeCart.php",
            type:"post",
            datatype:"json",
            data:{
                g_id:dataInfo.g_id,
                u_id:dataInfo.u_id
            },
            success:function (res) {
                console.log(res)
            }
        })
    }
}
//未登录时商品总价
function getTotal() {
    var cookieCart = JSON.parse($.cookie("cart") || '[]');
    var total=0;
    var num=0;
       $(":checkbox[name='cbx']").each(function (index, ele) {
           if($(ele).prop("checked")==true){
               console.log(cookieCart[index]);
               num += parseInt($(this).parents("tr").find(".spinnerExample").val());
               total += parseInt(cookieCart[index].c_price)*num;
           }
       });
       $(".buying_menu .num").text(" "+num+" ");
       $(".buying_menu .total").text(total);

}
//登录时商品总价
function getTotal_log() {
    var total=0;
    var num=0;
    $.getJSON({
        url: "http://127.0.0.1/xiushopping/server/getCart.php",
        data: {"userName": getUserInfo().userName}
    }).done(function (res) {
        $(":checkbox[name='cbx']").each(function (index, ele) {
            if($(ele).prop("checked")==true){
                num += parseInt($(this).parents("tr").find(".spinnerExample").val());
                total += parseInt(res[index].c_price)*num;
            }
        });
        $(".buying_menu .num").text(" "+num+" ");
        $(".buying_menu .total").text(total);
    });
}