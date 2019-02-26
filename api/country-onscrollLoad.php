<?php
    include("../inc/dbconn.php");
    $page = $_GET["page"];  //1-->0   2-->6    3-->12

    // $start = ($page - 1) * 8;

    $sql = "select * from groupcountry order by id limit 15,28";

    $result = $conn->query($sql);

    if ($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            // 用js的思想来理解$list:
            // [{"id":"04","name":"1111"},{},{}]
            $list[] = $row;  
        }
        // $data={"list":[],"success":1}
        $data["list"] = $list;
        $data["success"] = 1;
    }else{
        // $data= {"success": 0}
        $data["success"] = 0;
    }
    echo json_encode($data);
?>