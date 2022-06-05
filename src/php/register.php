<?php
$connect=mysqli_connect("localhost","root","","art");
function addSalt($salt,$pass){
    return sha1(sha1($salt).$pass);
}
function createSalt($username){
    return sha1($username);
}
if ($connect){
    $username=$_POST["username"];
    $password=$_POST["password"];
    $email=$_POST["email"];
    $phone=$_POST["phone"];
    $address=$_POST["address"];
    $salt=createSalt($username);
    $password=addSalt($salt,$password);
    date_default_timezone_set("Asia/Shanghai");
    $currentTime=date("Y-m-d H:i:s");
    $result=array();
    $query=mysqli_query($connect,"select * from customerlogon where username='$username'");
    $arr=mysqli_fetch_assoc($query);
    if ($arr!=null){
        $result['code']=0;
        $result['msg']='用户名已经存在！';
        echo json_encode($result);
        mysqli_close($connect);
        return;
    }
    $query=mysqli_query($connect,"select * from customerlogon where email='$email'");
    $arr=mysqli_fetch_assoc($query);
    if ($arr!=null){
        $result['code']=0;
        $result['msg']='邮箱已经存在！';
        echo json_encode($result);
        mysqli_close($connect);
        return;
    }
    mysqli_query($connect,"insert into customerlogon (username, email, pass, salt, DateJoined, DateLastModified) VALUES ('$username','$email','$password','$salt','$currentTime','$currentTime') ");
    $customerId=mysqli_insert_id($connect);
    mysqli_query($connect,"insert into customers (CustomerID, username, phone, email, account, address) VALUES ($customerId,'$username','$phone','$email',0,'$address')");
    $result['msg']="success";
    $result['code']=1;
    echo json_encode($result);
    mysqli_close($connect);
}
