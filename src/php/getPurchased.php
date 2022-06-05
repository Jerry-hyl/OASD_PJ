<?php
$customerId=$_GET['customer'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select OrderID,OrderTime,Title,Cost,p.PaintingID from orderlist join paintings p on orderlist.PaintingID = p.PaintingID where orderlist.CustomerID=$customerId");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    echo json_encode($arr);
    mysqli_close($connect);
}
