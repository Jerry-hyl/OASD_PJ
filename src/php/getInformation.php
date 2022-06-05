<?php
$customerId=$_GET['id'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select * from customers where CustomerID=$customerId");
    $arr=mysqli_fetch_assoc($query);
    echo json_encode($arr);
    mysqli_close($connect);
}
