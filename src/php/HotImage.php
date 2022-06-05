<?php
$connect = mysqli_connect("localhost", "root", "", "art");
$query = mysqli_query($connect, "select Title,paintings.PaintingID,FirstName,LastName,Cost,Description,ImageFileName,COUNT(VisitID) as visit from paintings join artists a on paintings.ArtistID = a.ArtistID join visits v on paintings.PaintingID = v.PaintingID group by paintings.PaintingID order by visit desc limit 0,6");
$arr = mysqli_fetch_all($query,MYSQLI_ASSOC);
foreach ($arr as $key=>$value){
    if ($value["Description"] == null)
        $arr[$key]["Description"] = "Sorry...\nThere's no description\nYou can search it on the Internet\n";
    if ($value["FirstName"] == null)
        $arr[$key]["FirstName"] = "";
}
echo json_encode($arr);
mysqli_close($connect);