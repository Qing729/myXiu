<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/18 0018
 * Time: 下午 9:20
 */
header("Content-type:text/html;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");    //实现跨域

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
    mysqli_query($connect, "set names utf8");

    $sql = " DELETE FROM cart WHERE g_id= '" . $_REQUEST["g_id"] . "'AND u_id='" . $_REQUEST["u_id"] . "'";
    $result = $connect->query($sql);

    if ($result) {
        $resultArr = array("status" => 1, "msg" => "删除成功");
    } else {
        $resultArr = array("status" => 0, "msg" => "删除失败");
    }
    print_r(json_encode($resultArr));
    //断开连接
    $connect->close();
}