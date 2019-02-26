<?php
    require("../inc/dbconn.php");
    // if(isset($_GET['page'])){

        $page=$_POST['page'];
        //  }else{
            // $page=1;
        //  }
    

    $num=($page-1)*20;
    $sql1 = "SELECT * FROM amazing";
    $result1 = mysqli_query($conn,$sql1);
    $fetchNum=mysqli_num_rows($result1);
    // echo $fetchNum;
    $sql = "SELECT * FROM amazing order by Id desc limit $num, 20";
    $result = $conn->query($sql);
    while($row=$result->fetch_assoc()){
        $data[]=$row;
    }
    $array = array('data'=>$data , 'num'=>$fetchNum);
    echo json_encode($array);




