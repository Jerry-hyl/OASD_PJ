<?php
$customerId=$_POST['id'];
$connect=mysqli_connect("localhost","root","","art");
if ($connect){
    $temp=mysqli_query($connect,"select PaintingID from cart where CustomerID=$customerId");
    $arr=mysqli_fetch_all($temp,MYSQLI_ASSOC);
    $result=array();
    foreach ($arr as $key=>$value){
        $paintingId=$value['PaintingID'];
        $query=mysqli_query($connect,"select paintings.PaintingID,Title,ImageFileName,Description,FirstName,LastName,Cost,COUNT(VisitID) as visit from paintings join artists a on paintings.ArtistID = a.ArtistID join visits v on paintings.PaintingID = v.PaintingID where paintings.PaintingID=$paintingId group by paintings.PaintingID");
        $painting=mysqli_fetch_assoc($query);
        $query=mysqli_query($connect,"select * from cart where PaintingID=$paintingId and CustomerID=$customerId");
        $tmp1=mysqli_fetch_assoc($query);
        $query=mysqli_query($connect,"select * from paintings join artists a on paintings.ArtistID = a.ArtistID join paintinggenres p on paintings.PaintingID = p.PaintingID where paintings.PaintingID=$paintingId");
        $tmp2=mysqli_fetch_assoc($query);
        if ($tmp1['Cost']==$tmp2['Cost'] && $tmp1['Description']==$tmp2['Description'] && $tmp1['Title']==$tmp2['Title']
         && $tmp1['Author']==$tmp2['LastName'] && $tmp1['GenreID']==$tmp2['GenreID'] && $tmp1['ImageFileName']==$tmp2['ImageFileName']
            && $tmp1['year']==$tmp2['YearOfWork'] && $tmp1['Width']==$tmp2['Width'] && $tmp1['Height']==$tmp2['Height']){
            $painting['changed']=0;
        }
        else $painting['changed']=1;
        if ($tmp2['status']==0){
            $painting['exist']=0;
        }
        else $painting['exist']=1;
        $result[]=$painting;
    }
    echo json_encode($result);
    mysqli_close($connect);
}
