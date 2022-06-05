<?php
$paintingId=$_POST['PaintingID'];
$customer=$_POST['customer'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    mysqli_query($connect,"delete from cart where PaintingID=$paintingId and CustomerID=$customer");
    $result=["msg"=>"success"];
    echo json_encode($result);
    mysqli_close($connect);
}