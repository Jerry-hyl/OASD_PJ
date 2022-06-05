<?php
$customerId=$_POST['id'];
$total=$_POST['total'];
$rest=$_POST['rest'];
$result=array();
date_default_timezone_set("Asia/Shanghai");
$currentTime=date("Y-m-d H:i:s");
if ($total>$rest){
    $result['msg']="用户余额不足！";
    echo json_encode($result);
    return;
}
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    mysqli_query($connect,"begin;");
    $query=mysqli_query($connect,"select status,p.Cost as cost,p.PaintingID as painting,p.CustomerID as seller from cart join paintings p on cart.PaintingID = p.PaintingID where cart.CustomerID=$customerId");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    foreach ($arr as $key=>$value){
        //判断是否被修改过
        $query=mysqli_query($connect,"select * from cart where PaintingID={$value['painting']} and CustomerID=$customerId");
        $origin=mysqli_fetch_assoc($query);
        $query=mysqli_query($connect,"select * from paintings join artists a on paintings.ArtistID = a.ArtistID join paintinggenres p on paintings.PaintingID = p.PaintingID where paintings.PaintingID={$value['painting']}");
        $now=mysqli_fetch_assoc($query);
        if (!($origin['Cost']==$now['Cost'] && $origin['Description']==$now['Description'] && $origin['Title']==$now['Title'] && $origin['Width']==$now['Width'] && $origin['Height']==$now['Height']
            && $origin['Author']==$now['LastName'] && $origin['GenreID']==$now['GenreID'] && $origin['ImageFileName']==$now['ImageFileName'] && $origin['year']==$now['YearOfWork'])){
            mysqli_query($connect,"rollback");
            $result['msg']="存在艺术品被修改，请重新加入购物车！";
            echo json_encode($result);
            mysqli_close($connect);
            return;
        }
        //判断是否被抢购
        if ($value['status']==1){
            mysqli_query($connect,"insert into orderlist (CustomerID, PaintingID, OrderTime) VALUES ($customerId,{$value['painting']},'$currentTime')");
            if ($value['seller']!=null){
                $tmp1=mysqli_query($connect,"select account from customers where CustomerID={$value['seller']}");
                $tmp2=mysqli_fetch_assoc($tmp1);
                $newAccount=$tmp2['account']+$value['cost'];
                mysqli_query($connect,"update customers set account=$newAccount where CustomerID={$value['seller']}");
            }
        }
        else{
            mysqli_query($connect,"rollback");
            $result['msg']="存在艺术品被抢单了！请从购物车中删除";
            echo json_encode($result);
            mysqli_close($connect);
            return;
        }
    }
    mysqli_query($connect,"commit;");
    $rest=$rest-$total;
    mysqli_query($connect,"update customers set account=$rest where CustomerID=$customerId");
    $result['msg']="success";
    echo json_encode($result);
    mysqli_close($connect);
}
