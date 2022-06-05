<?php
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    date_default_timezone_set("Asia/Shanghai");
    $currentTime=date("Y-m-d H:i:s");
    $rate=$_GET['rate'];
    $content=$_GET['content'];
    $paintingID=$_GET['PaintingID'];
    $query=mysqli_query($connect,"insert into reviews (PaintingID, ReviewDate, Rating, Comment) VALUES ($paintingID,'$currentTime',$rate,'$content')");
    echo json_encode(["msg"=>"发布成功"]);
    mysqli_close($connect);
}
