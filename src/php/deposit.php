<?php
$sum=$_POST["sum"];
$customerId=$_POST["id"];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $query=mysqli_query($connect,"select * from customers where CustomerID=$customerId");
    $arr=mysqli_fetch_assoc($query);
    $sum+=$arr['account'];
    mysqli_query($connect,"update customers set account=$sum where CustomerID=$customerId");
    echo json_encode(["response"=>"success"]);
    mysqli_close($connect);
}
