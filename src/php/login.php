<?php
$username=$_POST['username'];
$password=$_POST['password'];
$response=array();
$connect=mysqli_connect("localhost","root","","art");
session_start();
function hash_salt($user,$pass){
    return sha1(sha1($user).$pass);
}
function is_email($username){
    $pattern='/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+([a-z]{2,5})$/ims';
    if (preg_match($pattern,$username))
        return true;
    else return false;
}
if ($connect){
    if (is_email($username)){
        $query=mysqli_query($connect,"select * from customerlogon where Email='$username'");
    }
    else{
        $query=mysqli_query($connect,"select * from customerlogon where UserName='$username'");
    }
    $arr=mysqli_fetch_assoc($query);
    if ($_POST["checkNumber"]!=$_SESSION['checkNumber']){
        $response['data']=null;
        $response['msg']='验证码错误！';
        echo json_encode($response);
        return;
    }
    if ($arr!=null){
        if ($arr['pass']==hash_salt($arr['salt'],$password)){
            $user_id=$arr['CustomerID'];
            $result=array();
            $result['lastModify']=$arr['DateLastModified'];
            date_default_timezone_set("Asia/Shanghai");
            $currentTime=date("Y-m-d H:i:s");
            mysqli_query($connect,"update customerlogon set DateLastModified='$currentTime' where CustomerID=$user_id");
            $query=mysqli_query($connect,"select * from customers where CustomerID=$user_id");
            $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
            foreach ($arr as $key=>$value){
                $result[$key]=$value;
            }
            $response['data']=$result;
            $response['msg']='success';
        }
        else{
            $response['data']=null;
            $response['msg']='密码错误！';
        }
    }
    else{
        $response['data']=null;
        $response['msg']='用户不存在！';
    }
    echo json_encode($response);
}
mysqli_close($connect);