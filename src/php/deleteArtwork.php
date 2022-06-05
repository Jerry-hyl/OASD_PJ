<?php
$paintingId=$_GET['PaintingID'];
$result=array();
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select * from paintings where PaintingID=$paintingId");
    $arr=mysqli_fetch_assoc($query);
    if ($arr['status']==0){
        $result['msg']="已经售出，无法删除！";
    }
    else{
        mysqli_query($connect,"delete from paintings where PaintingID=$paintingId");
        $result['msg']="success";
    }
    echo json_encode($result);
    mysqli_close($connect);
}
