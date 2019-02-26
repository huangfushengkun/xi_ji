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
  $type=$_POST['type'];

$sql = "SELECT * FROM santou where type=$type ";
$result = $conn->query($sql);
while($row=$result->fetch_assoc()){
    $data3[]=$row;
  }
$sql1 = "SELECT * FROM kaitou where type=$type";
$result1 = $conn->query($sql1);
while($row=$result1->fetch_assoc()){
    $data1[]=$row;
  }

$sql2 = "SELECT * FROM ertou where type=$type ";
$result2 = $conn->query($sql2);
while($row=$result2->fetch_assoc()){
  $data2[]=$row;
}
$array = array('data3'=>$data3 , 'data1'=>$data1, 'data2'=>$data2);
echo json_encode($array);

?>