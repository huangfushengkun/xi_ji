<?php
include("../inc/dbconn.php");
$id = $_POST["goodsID"];
$number = $_POST["goodsNum"];
$sql = "update cart set number='$number' where Id = '$id'";
$result = $conn->query($sql);
