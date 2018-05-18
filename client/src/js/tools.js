//u_name=abc123&u_pwd=123123&u_pwd2=123123&u_realyName=&u_telPhone=
function myPara(str){
    var obj = {};
    var arr1 = str.split("&");//  u_name=abc123   u_pwd=123123
    for(var i = 0; i < arr1.length; i++){
        var arr2 = arr1[i].split("=");
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

//判断是否登录
function IsLogin(){
    if(window.sessionStorage.getItem("userInfo") == null){
        return false;
    } else {
        return true;
    }
}

//登录了,就把当前登录者的信息返回出去
function getUserInfo(){
    if(IsLogin()){
        return JSON.parse(sessionStorage.getItem("userInfo"))
    }
    return {};
}

//获取 url上的 id
function getUrlById(){
    if(window.location.href.indexOf("?") != -1 && window.location.href.indexOf("=") != -1){
        var str = window.location.search; // ?g_id=1
        return str.split('?')[1].split("=")[1]   //  ["","g_id=1"]   [g_id,1]
    }
    return "";
}