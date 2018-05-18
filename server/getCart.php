<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/18 0018
 * Time: 下午 3:45
 */
header("Content-type:text/html;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");    //实现跨域

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
    mysqli_query($connect, "set names utf8");
    $sql1 = " SELECT * FROM userInfo WHERE userName= '" . $_REQUEST["userName"] . "'";
    $result1 = $connect->query($sql1);
    $row1 = $result1->fetch_assoc();
    $sql2 = "SELECT * FROM cart WHERE u_id=" . $row1["u_id"];
    $result2 = $connect->query($sql2);
    $resultArr = array();
    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            array_push($resultArr, $row2);
        }
    }
    print_r(json_encode($resultArr));
    //断开连接
    $connect->close();
}