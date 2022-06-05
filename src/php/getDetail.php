<?php
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $paintingId=$_GET["PaintingID"];
    $query=mysqli_query($connect,"select Title,ImageFileName,FirstName,LastName,YearOfWork,Width,Height,Cost,Description from paintings join artists a on paintings.ArtistID = a.ArtistID where PaintingID=$paintingId");
    $result=mysqli_fetch_assoc($query);
    $result['ArtistName']=$result["FirstName"]." ".$result["LastName"];
    $query=mysqli_query($connect,"select * from genres join paintinggenres p on genres.GenreID = p.GenreID where PaintingID=$paintingId");
    $arr=mysqli_fetch_assoc($query);
    $result["genre"]=$arr["GenreID"];
    echo json_encode($result);
    mysqli_close($connect);
}
