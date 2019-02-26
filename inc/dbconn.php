<?php
    header('content-type:text/html;charset=utf-8');
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "www.xiji.com";
    //创建mysql 数据库的连接对象实例
    $conn = new mysqli($servername,$username,$password,$dbname);
    //保证查询出来的数据不会出现乱码
    mysqli_set_charset($conn,"utf8");
    //检查连接是否成功
    if($conn->connect_error){
        die("连接失败".$conn->connect_error);
    }

?>