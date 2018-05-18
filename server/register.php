<?php
/**
 * Created by PhpStorm.
 * User: Useker.cn
 * Date: 2017/12/16
 * Time: 10:33
 */
header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");  //实现跨域

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_REQUEST["userName"];
    $userPwd = $_REQUEST["userPwd"];
    $userTel = $_REQUEST["userTel"];
//1.创建连接  mysql 3306
    $connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
//2.设置字符集
    mysqli_query($connect, "set names utf8");
//3.sql语句
    $sql = "INSERT INTO `xiushopping`.`userinfo` (`userName`,`userPwd`,`userTel`)";
    $sql .= "VALUES('" . $userName . "','" . $userPwd . "','" . $userTel . "');";
//4.执行
    $result = $connect->query($sql);
    if ($result == true) {
        //sql执行成功
        $resultArr = array("status" => 1, "msg" => "注册成功");
        print_r(json_encode($resultArr));
    } else {
        //sql执行失败
        $resultArr = array("status" => 0, "msg" => "注册失败");
        print_r(json_encode($resultArr));
    }
//5.关闭连接

}
