<?php
/**
 * Created by PhpStorm.
 * User: Useker.cn
 * Date: 2017/12/16
 * Time: 11:43
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");    //实现跨域

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $connect = new mysqli("127.0.0.1", "root", "", "xiushopping", 3306);
    mysqli_query($connect, "set names utf8");
    $sql1 = "SELECT * FROM goods";
    $result1 = $connect->query($sql1);
    $resultArr = array();
    if ($result1->num_rows > 0) {
        while ($row1 = $result1->fetch_assoc()) {
            $sql2 = "  SELECT img_path FROM goodsImages WHERE g_id=" . $row1["g_id"];
            $result2 = $connect->query($sql2);
            $arrImgs = array();
            while ($row2 = $result2->fetch_assoc()) {
                array_push($arrImgs, $row2["img_path"]);
            }
            $row1["imgs"] = $arrImgs;
            array_push($resultArr, $row1);
        }

    }
    print_r(json_encode($resultArr));
}