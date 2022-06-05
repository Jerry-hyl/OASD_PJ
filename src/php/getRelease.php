<?php
$customerId=$_GET['customer'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select * from paintings where CustomerID=$customerId");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    echo json_encode($arr);
    mysqli_close($connect);
}