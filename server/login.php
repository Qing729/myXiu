<?php
/**
 * Created by PhpStorm.
 * User: Useker.cn
 * Date: 2017/12/16
 * Time: 11:43
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");    //实现跨域

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_REQUEST["userName"];
    $userPwd = $_REQUEST["userPwd"];
    $userTel = $_REQUEST["userTel"];
    $connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
    mysqli_query($connect, "set names utf8");

    $sql = "SELECT * FROM userInfo WHERE userName='" . $userName . "' AND userPwd='" . $userPwd
        . "'OR userTel='" . $userName . "' AND userPwd='" . $userPwd
        . "'OR userTel='" . $userTel . "'";

    $result = $connect->query($sql);

    $arr = array("status" => 1, "msg" => "登录成功", "data" => $result->fetch_assoc()); // 默认是返回成功

    if ($result->num_rows <= 0) {
        //登录失败
        $arr["status"] = 0;
        $arr["msg"] = "登录失败";
        $arr["data"] = "";
    }
    print_r(json_encode($arr));
}