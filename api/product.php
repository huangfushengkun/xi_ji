<?php
    require_once ("../inc/dbconn.php");
    $sql="select * from products";
    $res=$conn->query($sql);
    if($res->num_rows>0){
        while($row=mysqli_fetch_assoc($res)){
            $data[]=$row;
        }
    }
    $page=$_GET["page"];
    $callback=$_GET["callback"];
    echo $callback ."(".json_encode($data).")";
?>