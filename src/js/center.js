function deposit(){
    document.getElementById('pop').style.display="";
}
function hide(id){
    document.getElementById("money").value="";
    document.getElementById(id).style.display="none";
}
function confirmArrive(){
    hide('process');

}
function delete_confirm(paintingId) {
    let response=confirm("你确定要删除该产品吗？");
    if (response){
        $.ajax({
            url:"../php/deleteArtWork.php",
            type:"GET",
            dataType:"json",
            data:{
                "PaintingID":Number(paintingId)
            },
            success:function (response){
                if (response.msg==="success"){
                    alert("删除成功！");
                    window.location.reload();
                }
                else alert(response.msg);
            },
            error:function (){
                alert("删除失败！");
            }
        })
    }
}
function check_bill(){
    document.getElementById('process').style.display=""
}
function check(){
    let check=document.getElementById("money").value;
    let expression=/^\d+$/;
    if (check===""){
        alert("请输入充值金额！");
        return false;
    }
    if (!expression.test(check)){
        alert("请输入正整数！");
        return false;
    }
    else return true;
}
function submit(){
    if (!check()){
        alert("充值失败！");
        return;
    }
    let sum=Number(document.getElementById("money").value);
    console.log(sum);
    $.ajax({
        url:'../php/deposit.php',
        type:'POST',
        dataType:'json',
        data:{'sum':sum,'id':Number(sessionStorage.getItem("user"))},
        success:function (response){
            alert("充值成功！");
            console.log(response);
            hide('pop');
            window.location.reload();
        },
        error:function (error){
            console.log(error);
            alert("充值失败！");
        }
    })
}
//个人信息
function getInformation(){
    $.ajax({
        url: "../php/getInformation.php",
        type: "GET",
        dataType: "json",
        data: {
            'id':Number(sessionStorage.getItem("user"))
        },
        success:function (response){
            $("#username").text(response.username);
            $("#phone").text(response.phone);
            $("#email").text(response.email);
            $("#address").text(response.address);
            $("#balance").text(response.account);
        },
        error:function (){
            alert("个人信息加载失败！")
        }
    })
}
//我发布的艺术品
function getRelease(){
    $.ajax({
        url:"../php/getRelease.php",
        type:"GET",
        dataType:"json",
        data:{
            'customer':Number(sessionStorage.getItem('user'))
        },
        success:function (response){
            console.log(response);
            for (const obj of response) {
                $("#releaseObject").append("<li class=\"pic\">\n" +
                    "            <a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\")'><img src=\"../../img/art_store/works/small/"+obj.ImageFileName+".jpg \" title='"+obj.Title+"' class=\"pic_pic\" alt=\" \"></a>\n" +
                    "            <div class=\"pic_text\">\n" +
                    "                <h1>"+obj.Title+"</h1>\n" +
                    "                <h3 id=\"releaseDate\" style=\"color: red\">ReleaseDate:"+obj.release_date+"</h3>\n" +
                    "                <p class=\"text\">\n"+obj.Description+"</p>\n" +
                    "                <br>\n" +
                    "                <button class=\"delete\" onclick=\"delete_confirm('"+obj.PaintingID+"')\">delete</button>\n" +
                    "                <button class=\"modify\" onclick=\"window.location.href='Upload.html?PaintingID="+obj.PaintingID+"'\">modify</button>\n" +
                    "            </div>\n" +
                    "        </li>")
            }
        },
        error:function (){
            alert("发布艺术品加载失败！")
        }
    })
}
//我的订单
function getPurchased(){
    $.ajax({
        url:"../php/getPurchased.php",
        type:"GET",
        dataType:'json',
        data:{'customer':Number(sessionStorage.getItem('user'))},
        success:function (response){
            for (const obj of response) {
                $("#purchased").append("<tr>\n" +
                    "            <td>订单编号:"+obj.OrderID+"</td>\n" +
                    "            <td>商品名称:<a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\")'>"+obj.Title+"</a></td>\n" +
                    "            <td>订单时间:"+obj.OrderTime+"</td>\n" +
                    "            <td>订单金额:$"+obj.Cost+"</td>\n" +
                    "        </tr>")
            }
        },
        error:function (){
            alert("订单加载失败！")
        }
    })
}
//我卖出的艺术品
function getSold(){
    $.ajax({
        url:"../php/getSold.php",
        type:"GET",
        dataType:'json',
        data:{'customer':Number(sessionStorage.getItem('user'))},
        success:function (response){
            for (const obj of response) {
                $("#sold").append("<li class=\"pic\">\n" +
                    "            <a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\")'><img src=\"../../img/art_store/works/small/"+obj.ImageFileName+".jpg \" title='"+obj.Title+"' class=\"pic_pic \" alt=\" \"></a>\n" +
                    "            <div class=\"pic_text\">\n" +
                    "                <h2>"+obj.Title+"</h2>\n" +
                    "                <h3 style=\"color: red\">Sold Date:"+obj.OrderTime+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cost:$"+obj.Cost+"</h3>\n" +
                    "                <span class=\"buyerInformation\">Buyer:"+obj.username+"</span>\n" +
                    "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" +
                    "                <span class=\"buyerInformation\">Email:"+obj.email+"</span>\n" +
                    "                <br>\n" +
                    "                <span class=\"buyerInformation\">phone:"+obj.phone+"</span>\n" +
                    "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" +
                    "                <span class=\"buyerInformation\">Address:"+obj.address+"</span>\n" +
                    "                <br><br>\n" +
                    "                <p class=\"text\">"+obj.Description+"</p>\n" +
                    "                <br>\n" +
                    "            </div>\n" +
                    "        </li>")
            }
        },
        error:function (){
            alert("卖出的艺术品加载失败！");
        }
    })
}
function load(){
    interceptor();
    getInformation();
    canvas()
    footprint();
    getRelease()
    getPurchased();
    getSold();
}