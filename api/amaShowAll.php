<?php
    require("../inc/dbconn.php");
    // header('content-type:text/html;charset=utf-8');
    // mysqli_set_charset($conn,"utf8");
    $type = $_POST["type"];
    $sql = "SELECT * FROM amazing where type='$type' ";
    $result = $conn->query($sql);
    while($row=$result->fetch_assoc()){
        $data[]=$row;
    }
    // print_r($data);
    echo json_encode($data)
?>



