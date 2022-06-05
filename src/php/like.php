<?php
$connect=mysqli_connect("localhost","root","","art");
$reviewId=$_POST['reviewId'];
if ($connect){
    $query=mysqli_query($connect,"select * from reviews where RatingID=$reviewId");
    $arr=mysqli_fetch_assoc($query);
    $likes=$arr['likes'];
    $likes++;
    $query=mysqli_query($connect,"update reviews set likes=$likes where RatingID=$reviewId");
    echo json_encode(["msg"=>"点赞+1"]);
    mysqli_close($connect);
}
