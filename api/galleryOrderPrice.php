<?php
    require("../inc/dbconn.php");

    $page=$_POST['page'];
    $num=($page-1)*24;
    $sql1 = "SELECT * FROM gallery";
    $result1 = mysqli_query($conn,$sql1);
    $fetchNum=mysqli_num_rows($result1);
    // echo $fetchNum;
    $sql = "SELECT * FROM gallery order by price asc limit $num, 24";
    $result = $conn->query($sql);
    while($row=$result->fetch_assoc()){
        $data[]=$row;
    }
    $array = array('data'=>$data , 'num'=>$fetchNum);
    echo json_encode($array);

?>