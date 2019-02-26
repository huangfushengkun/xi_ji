<?php
    require("../inc/dbconn.php");
    
        // $pid=$_GET['pid'];
    

    $sql = "SELECT * FROM indexnav where pid=1";
    $result = $conn->query($sql);
    while($row=$result->fetch_assoc()){
        $data[]=$row;
    }
    // print_r($data);
    echo json_encode($data)
?>



