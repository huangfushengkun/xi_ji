 <?php
 include("../inc/dbconn.php")

    $user = $_POST["user"];
    $pw = $_POST["pwd"];

    $sql = "select user,pwd from person from user where user={$user} and pwd={$pw}";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        //用户名存在
        $data['code']=0;
    }else{
        // 用户名不存在
        $data["code"] = 1;
    }
    echo json_encode($data);
?>
