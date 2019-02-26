<?php
    include("../inc/dbconn.php");

    $user = $_POST["user"];
    $pwd = $_POST["pwd"];

    $sql = "select * from person where user='$user' and pwd='$pwd'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0){
        // 密码正确
        $data["code"] = 0;
       
    }else{
        // 密码错误
        $data["code"] = 1;
    }
    echo json_encode($data);
?>