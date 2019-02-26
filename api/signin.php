<?php
include("../inc/dbconn.php");
$user=$_POST['user'];
$pwd=$_POST['pwd'];
// echo "10";
$sql="insert into person (user,pwd) values ('$user','$pwd')";
$result=$conn->query($sql);
if($conn->affected_rows > 0){
   //注册成功
   $data['code'] = 0;
}else{
    // 注册失败
    $data["code"] = 1;
}
echo json_encode($data);
?>