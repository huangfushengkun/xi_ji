<?php
include("../inc/dbconn.php");
$sql = "select * from brand";
$result = $conn->query($sql);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $data[]=$row;
    }
}
echo json_encode($data);