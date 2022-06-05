<?php
$customerId=$_GET['id'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $result=array();
    $result['total']=0;
    $query=mysqli_query($connect,"select p.Cost as cost from cart join paintings p on cart.PaintingID = p.PaintingID where cart.CustomerID=$customerId");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    foreach ($arr as $key=>$value){
        $result['total']+=$value['cost'];
    }
    $query=mysqli_query($connect,"select account,address,phone from customers where CustomerID=$customerId");
    $arr=mysqli_fetch_assoc($query);
    $result=$result+$arr;
    echo json_encode($result);
    mysqli_close($connect);
}
