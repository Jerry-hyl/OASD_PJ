document.getElementById("file0").onchange = function() {
    let objUrl = getObjectURL(document.getElementById("file0").files[0]);
    if (objUrl !== null)
        document.getElementById("img0").setAttribute("src", objUrl)
    document.getElementById("button").innerHTML = "重新上传"
};

function checkLength(id){
    let target=$("#"+id);
    let length=Number(target.val());
    if (length<=0){
        alert("请输入大于0的值！");
        target.val("");
        return false
    }
    if (Math.floor(length)!==length){
        alert("请输入整数！");
        target.val('');
        return false
    }
    return true
}
// 兼容不同浏览器
function getObjectURL(file) {
    let url = null;
    if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
function loadData(){
    interceptor();
    footprint();
    canvas()
    let PaintingID=window.location.search;
    console.log(PaintingID);
    if (PaintingID.indexOf("PaintingID")===-1) return;
    $.ajax({
        url:"../php/getDetail.php"+PaintingID,
        type:"GET",
        dataType:'json',
        success:function (response){
            $("#art_name").val(response.Title);
            $("#img0").prop("src","../../img/art_store/works/medium/"+response.ImageFileName+".jpg");
            $("#button").text("重新上传");
            $("#author").val(response.LastName);
            $("#year").val(response.YearOfWork);
            $("#style").val(response.genre);
            $("#width").val(response.Width);
            $("#length").val(response.Height);
            $("#price").val(response.Cost);
            $("#detail").val(response.Description);
        }
    })
}
function upload(){
    let imgPath=$("#file0").val();
    let title=$("#art_name").val();
    let author=$("#author").val();
    let year=$("#year").val();
    let genre=$("#style").val();
    let width=$("#width").val();
    let height=$("#length").val();
    let cost=$("#price").val();
    let description=$("#detail").val();
    if (imgPath===undefined || title==='' || author==='' || year==='' || genre==='' || width==='' || height==='' || cost==='' || description===''){
        alert("所有输入项不得为空！");
        return;
    }
    if (!checkLength('year') || !checkLength('length') || !checkLength('width') ||!checkLength('price')){
        alert('存在不符合的表单输入项');
        return;
    }
    let imgName=$("#img0").attr('src').slice(-10,-4);
    if (imgPath!==''){
        imgName=imgPath.slice(-10,-4);
    }
    $.ajax({
        url: "../php/upload.php"+window.location.search,
        type: "POST",
        dataType:"json",
        data:{
            "user":Number(sessionStorage.getItem("user")),
            "ImageFileName":imgName,
            "Title":title,
            "Author":author,
            "year":Number(year),
            "genre":Number(genre),
            "Width":Number(width),
            "Height":Number(height),
            "Cost":Number(cost),
            "description":description
        },
        success:function (response){
            alert(response.msg)
        },
        error:function (){
            alert("发布失败");
        }
    })
}