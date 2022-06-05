<?php
$connect=mysqli_connect('localhost','root',"","art");
if ($connect){
    $paintingId=$_GET['PaintingID'];
    date_default_timezone_set("Asia/Shanghai");
    $currentTime=date("Y-m-d H:i:s");
    $IpAddress=$_SERVER['REMOTE_ADDR'];
    $query=mysqli_query($connect,"insert into visits (PaintingID, DateViewed, IpAddress, CountryCode) values ($paintingId,'$currentTime','$IpAddress','CN')");
    $query=mysqli_query($connect,"select ArtistID,ImageFileName,CopyrightText,status,Cost,paintings.PaintingID,YearOfWork,CustomerID,release_date,Width,Height,Description,Title,count(VisitID) as visit from paintings left join visits v on paintings.PaintingID = v.PaintingID where paintings.PaintingID={$_GET['PaintingID']}");
    $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
    $customer=$arr["CustomerID"];
    $result=array();
    foreach ($arr as $key => $value){
        $result[$key]=$value;
    }
    if ($customer!=null){
        $query=mysqli_query($connect,"select * from customers where CustomerID=$customer");
        $arr=mysqli_fetch_assoc($query);
        $result["release"]=$arr['username'];
    }
    $query=mysqli_query($connect,"select * from artists where ArtistID={$result['ArtistID']}");
    $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
    $result['ArtistName']=$arr['FirstName']." ".$arr['LastName'];
    $query=mysqli_query($connect,"select * from paintinggenres where PaintingID={$result['PaintingID']}");
    $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
    $genre_id=$arr['GenreID'];
    $query=mysqli_query($connect,"select * from genres where GenreID=$genre_id");
    $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
    $result['genre']=$arr['GenreName'];
    $era_id=$arr['EraID'];
    $query=mysqli_query($connect,"select * from eras where EraID=$era_id");
    $arr=mysqli_fetch_array($query,MYSQLI_ASSOC);
    $result['era']=$arr['EraYears'];
    $query=mysqli_query($connect,"select * from reviews where PaintingID={$result['PaintingID']} order by likes desc");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    foreach ($arr as $key=>$value){
        if ($value['Comment']==null)
            $arr[$key]['Comment']="No comments";
    }
    $result['comment']=$arr;
    echo json_encode($result);
    mysqli_close($connect);
}

