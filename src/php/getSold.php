<?php
$customerId=$_GET['customer'];
$connect=mysqli_connect("localhost","root","","art");
$result=array();
if ($connect){
    $query=mysqli_query($connect,"select Title,ImageFileName,paintings.PaintingID,Description,OrderTime,Cost,o.CustomerID as buyer from paintings join orderlist o on paintings.PaintingID = o.PaintingID where paintings.CustomerID=$customerId");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    foreach ($arr as $key=>$value){
        $buyer=$value['buyer'];
        $query=mysqli_query($connect,"select username,email,phone,address from customers where CustomerID=$buyer");
        $tmp=mysqli_fetch_assoc($query);
        $value=$value+$tmp;
        $result[]=$value;
    }
    echo json_encode($result);
    mysqli_close($connect);
}
