function getData(){
    let PaintingID=window.location.search;
    console.log(PaintingID);
    if (PaintingID.indexOf("PaintingID")===-1) return;
    $.ajax({
        url:"../php/detail.php"+PaintingID,
        type:'GET',
        dataType:'json',
        success:function (response){
            console.log(response);
            let newFoot={
                "PaintingID":response.PaintingID,
                "Title":response.Title
            };
            let user=sessionStorage.getItem("user");
            if (user!=null){
                if (localStorage.getItem(user)==null){
                    let storage=window.localStorage;
                    storage.setItem(user,JSON.stringify([newFoot]));
                    console.log(localStorage.getItem(user));
                }
                else {
                    let history=JSON.parse(localStorage.getItem(user));
                    history.forEach(function (item,index,arr){
                        if (item.PaintingID===newFoot.PaintingID){
                            arr.splice(index,1);
                        }
                    });
                    if (history.length===5){
                        history.shift();
                    }
                    history.push(newFoot);
                    localStorage.setItem(user,JSON.stringify(history));
                    console.log(localStorage.getItem(user));
                }
                // window.opener.location.reload();
            }
            $("#img").attr("src","../../img/art_store/works/medium/"+response.ImageFileName+".jpg")
            $("#magnifierImg").attr("src","../../img/art_store/works/medium/"+response.ImageFileName+".jpg")
            $("#title").html(response.Title+"&nbsp;<span id=\"author\">by "+response.ArtistName+"</span>");
            $("#Cost").html(response.Cost);
            $("#visit").html(response.visit);
            $("#year").text(response.YearOfWork);
            $("#size").text(response.Width+"*"+response.Height);
            if (response.Description!=null){
                $(".introduction").html("&nbsp;&nbsp;&nbsp;"+response.Description);
            }
            else $(".introduction").html("Sorry,it has no description……");
            $("footer").html("Copyright&#169;"+response.CopyrightText);
            $("#era").text(response.era);
            $("#style").text(response.genre);
            $("#status").text(Number(response.status)===1 ? "FALSE" : "TRUE");
            if (response.CustomerID!=null){
                $("#release_date").text(response.release_date);
                $("#release").text(response.release);
            }
            for (const obj of response.comment) {
                $("#comment_area").append("<article class=\"comment\">\n" +
                    "                    <a class=\"comment-img\">\n" +
                    "                        <img src=\"../../img/filter.jpg\" alt=\"\" width=\"50\" height=\"50\">\n" +
                    "                    </a>\n" +
                    "                    <div class=\"comment-body\">\n" +
                    "                        <div class=\"text\">\n" +
                    "                            <h1 class=\"like\">Like:"+obj.likes+"</h1>\n" +
                    "                            <p>Rateing: "+String(obj.Rating)+"</p>\n" +
                    "                            <p>"+obj.Comment+"</p>\n" +
                    "                        </div>\n" +
                    "                        <p class=\"attribution\">by <a href=\"#non\">Joe Bloggs</a> at "+obj.ReviewDate+"</p>\n" +
                    "                        <button onclick='addLikes("+obj.RatingID+")'>Like&nbsp;+1</button>\n" +
                    "                    </div>\n" +
                    "                </article>")
            }
        },
        error:function (){
            alert("获取数据失败！");
        }
    })
}
function addLikes(id){
    let reviewId=Number(id);
    $.ajax({
        url:"../php/like.php",
        type:"POST",
        dataType:"json",
        data:{
            "reviewId":reviewId
        },
        success:function (response){
            alert(response.msg);
            window.location.reload()
        },
        error:function (){
            alert('点赞失败！');
        }
    })
}
function addToCart(){
    let customer=Number(sessionStorage.getItem("user"));
    if (customer!==0) {
        $.ajax({
            url: "../php/addToCart.php"+window.location.search,
            type: "GET",
            dataType: "json",
            data:{
                "customer":customer
            },
            success:function (response){
                if (response.msg==="success"){
                    alert("添加购物车成功！");
                }
                else alert(response.msg);
            },
            error:function (){
                alert("添加失败！");
            }
        })
    }
    else alert("你没有该权限！");
}
function comment(){
    let rate=$("#rate").val();
    let content=$("#content").val()
    if (rate===''){
        alert('评分不能为空！');
        return;
    }
    $.ajax({
        url:"../php/comment.php"+window.location.search,
        type:"GET",
        dataType:"json",
        data: {
            "rate":Number(rate),
            "content":content
        },
        success:function (response){
            alert(response.msg)
            location.reload()
        },
        error:function (){
            alert("发布失败！")
        }
    })
}