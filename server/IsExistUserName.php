<?php
/**
 * Created by PhpStorm.
 * User: Useker.cn
 * Date: 2017/12/16
 * Time: 10:33
 */
header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");    //实现跨域

//1.创建连接  mysql 3306
$connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
//2.设置字符集
mysqli_query($connect, "set names utf8");
//3.sql语句
$sql = "SELECT*FROM userinfo WHERE userName='" . $_REQUEST["userName"] . "'";
//4.执行
$result = $connect->query($sql);
if ($result->num_rows >= 1) {
    //存在
    print_r("false");
} else {
    //不存在
    print_r("true");
}
//5.关闭连接

