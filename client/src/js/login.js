$(function () {
    //表单点击事件
    $(".myform").find(".inp").on("click", function () {
        $(this).children(".val").css("top", "-10px");
        $(this).children("input").css("border-color", "#65ccf6").end().siblings().children("input").css("border-color", "#d8d8d8");
    });
    $(".nav_login>li").each(function (index, ele) {
        $(ele).on("click", function () {
            $(".myform").children().eq(index).show().siblings().hide();
            $(this).children().addClass("b_bottom").end().siblings().children().removeClass("b_bottom");
        });
    });
    $(".toggle_login").on("click", function () {
        $(this).parent().hide();
        $(this).parent().siblings().show();
    })
    $(".reg").on("click", function () {
        window.location.href = "register.html";
    })
});
$(function () {
    //附加规则
    $.validator.addMethod("userCodeType", function (val, ele) {
        var reg = $("#idcode").text();
        return reg==val;
    });
    $("#myform").validate({
        //规则
        onblur: true,
        rules: {
            userName:{
                required:true
            },
            userPwd:{
                required:true
            },
            userTel:{
                required:true
            },
            userCode: {
                required:true,
                userCodeType: true
            }
        },
        //消息提示
        messages: {
            userName:{
                required: "请输入正确的手机号/用户名！"
            },
            userPwd:{
                required: "请输入正确的密码！"
            },
            userTel:{
                required: "请输入正确的手机号码！"
            },
            userCode: {
                required: "请输入验证码！",
                userCodeType: "验证码输入错误！"
            }
        },
        errorPlacement:function (error,element) {
            $(element).parent().next("p").html(error);
        },
        // 提交
        submitHandler: function () {
            var data = $("#myform").serialize();
            console.log(data);
            $.ajax({
                url: "http://127.0.0.1/xiushopping/server/login.php",
                type: "post",
                dataType: "json",
                data: data,
                success: function (res) {
                    console.log(res)
                    if (res.status == 1) {
                        window.sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                        window.location.href="index.html"
                    }else {
                        $("#userPwd").parent().next("p").html("<label class='error'>密码与用户名不匹配，请核对后再次输入！</label>")
                    }
                }
            })
        },
    })
});