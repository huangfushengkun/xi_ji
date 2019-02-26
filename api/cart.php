<?php 
include("../inc/dbconn.php");
$sql = "select * from cart";
$result = $conn->query($sql);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $list[]=$row;
    }
    $data = array("success"=>1,"list"=>$list);
}else{
    $data = array("success"=>0);
}
echo json_encode($data);