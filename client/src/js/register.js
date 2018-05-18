$(function () {
    //表单点击事件
    $(".myform").find(".inp").on("click", function () {
        $(this).children(".val").css("top", "-10px");
        $(this).children("input").css("border-color", "#65ccf6").end().siblings().children("input").css("border-color", "#d8d8d8");
    });
    //附加规则
    // $.validator.addMethod("userType", function (val, ele) {
    //     var reg = /^[a-zA-Z0-9_]{3,20}$/;
    //     return reg.test(val);
    // });
    $.validator.addMethod("userTelType", function (val, ele) {
        var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
        return reg.test(val);
    });
    $.validator.addMethod("userCodeType", function (val, ele) {
        var reg = $("#idcode").text();
        return reg==val;
    });
    $("#myform").validate({
        //规则
        onblur: true,
        rules: {
            userName: {
                required:true,
                // userType: true,
                minlength:3,
                maxlength:20,
                remote: {
                    url:"http://127.0.0.1/xiushopping/server/IsExistUserName.php",
                    type:"post"
                }
            },
            userPwd: {
                required:true,
                minlength:6,
                maxlength:20
            },
            isuserPwd: {
                equalTo: "#userPwd"
            },
            userTel: {
                required:true,
                userTelType: true,
                remote: {
                    url:"http://127.0.0.1/xiushopping/server/IsExistUserTel.php",
                    type:"post"
                }
            },
            userCode: {
                required:true,
                userCodeType: true
            }
        },
        //消息提示
        messages: {
            userName: {
                required: "请输入用户名！",
                // userType: "用户名格式错误！",
                minlength: "用户名不能少于3位！",
                maxlength: "用户名不能超过20位！",
                remote:"用户名已存在！"
            },
            userPwd: {
                required: "请输入密码！",
                minlength: "密码不能少于6位！",
                maxlength: "密码不能超过20位！"
            },
            isuserPwd:{
                equalTo:"两次密码不一致！"
            },
            userTel: {
                required: "请输入有效的手机号！",
                userTelType: "手机号码格式错误！",
                remote: "该手机号码已注册！"
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
                url: "http://127.0.0.1/xiushopping/server/register.php",
                type: "post",
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res.status == 1) {
                        if (confirm("恭喜你注册成功了！是否需要现在登录")) {
                            window.location.assign("login.html");
                        }
                    }
                }
            })
        },
    })
});