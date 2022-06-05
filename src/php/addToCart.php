<?php
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $customer=$_GET['customer'];
    $paintingId=$_GET['PaintingID'];
    $response=array();
    $query=mysqli_query($connect,"select * from cart where CustomerID=$customer and PaintingID=$paintingId");
    $arr=mysqli_fetch_assoc($query);
    if ($arr!=null){
        $response['msg']="您已经添加过了";
        echo json_encode($response);
        mysqli_close($connect);
        return;
    }
    $query=mysqli_query($connect,"select * from paintings join artists a on paintings.ArtistID = a.ArtistID join paintinggenres p on paintings.PaintingID = p.PaintingID where paintings.PaintingID=$paintingId");
    $arr=mysqli_fetch_assoc($query);
    if ($arr['status']!=1){
        $response['msg']="该商品已经售出！";
        mysqli_close($connect);
        return;
    }
    $description=$arr['Description'];
    $cost=$arr['Cost'];
    $title=$arr['Title'];
    $author=$arr['LastName'];
    $genre=$arr['GenreID'];
    $image=$arr['ImageFileName'];
    $width=$arr['Width'];
    $height=$arr['Height'];
    $year=$arr['YearOfWork'];
    mysqli_query($connect,"insert into cart (CustomerID, PaintingID, GenreID, Cost, Description, Title, Author, ImageFileName, Width, Height,year) VALUES ($customer,$paintingId,$genre,$cost,'$description','$title','$author','$image',$width,$height,$year)");
    $response['msg']="success";
    echo json_encode($response);
    mysqli_close($connect);
}
