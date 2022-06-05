<?php
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select ImageFileName,Description,Title,PaintingID,LastName,Cost,release_date from paintings join artists a on paintings.ArtistID = a.ArtistID where CustomerID IS NOT NULL order by release_date desc limit 0,4");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    echo json_encode($arr);
    mysqli_close($connect);
}
