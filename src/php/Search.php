<?php
$connect=mysqli_connect('localhost','root','','art');
$title=$_POST["title"];
$mark=5*($_POST['page']-1);
$rule='Title';
$author=$_POST['author'];
$pages=0;
if ($_POST['rule']==="艺术品访问量")
    $rule='visit';
if ($_POST['rule']==="价格")
    $rule='Cost';
$query=null;
if ($title!="") {
    $query=mysqli_query($connect,"select * from paintings where UPPER(Title) like UPPER('%$title%')");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    $length=($mark+5>count($arr)) ? count($arr)-$mark : 5;
    $pages= ceil(count($arr)/5);
    $query = mysqli_query($connect, "select paintings.PaintingID,ImageFileName,Title,Description,FirstName,LastName,Cost,COUNT(VisitID) as visit from paintings left join artists a on a.ArtistID=paintings.ArtistID left join visits v on paintings.PaintingID = v.PaintingID where UPPER(Title) like UPPER('%$title%') group by paintings.PaintingID order by $rule limit $mark,$length");
}
if ($author!="") {
    $query=mysqli_query($connect,"select * from paintings join artists a on paintings.ArtistID = a.ArtistID where UPPER(concat(ifnull(FirstName,''),' ',LastName)) like UPPER('%$author%')");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    $length=($mark+5>count($arr)) ? count($arr)-$mark : 5;
    $pages= ceil(count($arr)/5);
    $query = mysqli_query($connect, "select paintings.PaintingID,ImageFileName,Title,Description,FirstName,LastName,Cost,COUNT(VisitID) as visit from paintings left join artists a on paintings.ArtistID = a.ArtistID left join visits v on paintings.PaintingID = v.PaintingID where UPPER(concat(ifnull(FirstName,''),' ',LastName)) like UPPER('%$author%') group by paintings.PaintingID order by $rule limit $mark,$length");
}
if ($title=="" && $author=="") {
    $query=mysqli_query($connect,"select * from paintings");
    $arr=mysqli_fetch_all($query,MYSQLI_ASSOC);
    $length=($mark+5>count($arr)) ? count($arr)-$mark : 5;
    $pages=ceil(count($arr)/5);
    $query = mysqli_query($connect, "select paintings.PaintingID,ImageFileName,Title,Description,FirstName,LastName,Cost,COUNT(VisitID) as visit from paintings left join artists a on paintings.ArtistID = a.ArtistID left join visits v on paintings.PaintingID = v.PaintingID group by paintings.PaintingID order by $rule limit $mark,$length");
}
$arr=mysqli_fetch_assoc($query);
$result=array();
while ($arr!=null) {
    if ($arr["Description"] == null)
        $arr["Description"] = "Sorry...\nThere's no description\nYou can search it on the Internet\n";
    if ($arr["FirstName"] == null)
        $arr["FirstName"] = "";
    $result['data'][] = json_encode($arr);
    $arr = mysqli_fetch_assoc($query);
}
$result['pages']=$pages;
echo json_encode($result);
mysqli_close($connect);