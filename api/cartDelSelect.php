<?php
include("../inc/dbconn.php");
$selectId = $_POST["selectId"];

foreach($selectId as $key=>$val){
    $sql="delete from cart where id='$val'";
    $result = $conn->query($sql);
}