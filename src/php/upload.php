<?php
$customerId=$_POST['user'];
$title=$_POST['Title'];
$author=$_POST['Author'];
$year=$_POST['year'];
$genreId=$_POST['genre'];
$width=$_POST['Width'];
$height=$_POST['Height'];
$Cost=$_POST['Cost'];
$description=$_POST['description'];
$ImageFileName=$_POST['ImageFileName'];
date_default_timezone_set("Asia/Shanghai");
$currentDate=date("Y-m-d");
$result=array();
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    if (isset($_GET['PaintingID'])){
        $paintingId=$_GET['PaintingID'];
        //修改更新艺术品
        $query=mysqli_query($connect,"select * from paintings where PaintingID=$paintingId");
        $arr=mysqli_fetch_assoc($query);
        //检查权限是否符合
        if ($arr['CustomerID']!=$customerId || $arr['status']==0){
            $result['msg']="你没有该权限";
            echo json_encode($result);
            mysqli_close($connect);
            return;
        }
        $artistId=$arr['ArtistID'];
        mysqli_query($connect,"update paintinggenres set GenreID=$genreId where PaintingID=$paintingId");
        mysqli_query($connect,"update artists set LastName='$author' where ArtistID=$artistId");
        mysqli_query($connect,"update paintings set ImageFileName='$ImageFileName',Title='$title',Description='$description',
Cost=$Cost,YearOfWork=$year,Width=$width,Height=$height,release_date='$currentDate' where PaintingID=$paintingId");
        $result['msg']="修改成功";
    }
    else{
        //发布艺术品
        mysqli_query($connect,"insert into artists (LastName) value ('$author')");
        $artistId=mysqli_insert_id($connect);
        mysqli_query($connect,"insert into paintings (ArtistID,ImageFileName,Title,Description,YearOfWork,Width,Height,Cost,release_date,CustomerID) 
values ($artistId,'$ImageFileName','$title','$description',$year,$width,$height,$Cost,'$currentDate',$customerId)");
        $painting=mysqli_insert_id($connect);
        mysqli_query($connect,"insert into paintinggenres (PaintingID, GenreID) VALUES ($painting,$genreId)");
        $result['msg']="发布成功！";
    }
    echo json_encode($result);
    mysqli_close($connect);
}