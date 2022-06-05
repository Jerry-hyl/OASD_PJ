function settle(){
    let total,rest,address,phone;
    $.ajax({
        url:"../php/getOrderDetail.php",
        type:"GET",
        dataType:"json",
        async:false,
        data:{"id":Number(sessionStorage.getItem("user"))},
        success:function (response){
            console.log(response)
            total=response.total;
            rest=response.account;
            address=response.address;
            phone=response.phone;
        }
    })
    if (total===0){
        alert("购物车为空！");
        return;
    }
    let res=confirm("请确认订单信息：\n"+"Total:$"+total+"\n"+"Rest:$"+rest+"\n"+"Address:"+address+"\n"+"phone:"+phone+"\n");
    if (res){
        alert("正式下单");
        $.ajax({
            url:"../php/giveOrder.php",
            type:"POST",
            dataType:"json",
            data:{
                "id":Number(sessionStorage.getItem("user")),
                "total":total,
                "rest":rest
            },
            success:function (response){
                if (response.msg==="success"){
                    alert("下单成功！");
                    window.location.reload();
                }
                else alert(response.msg)
            },
            error:function (){
                alert("下单失败！")
            }
        })
    }
}
function deleteItem(paintingId){
    let res=confirm("您确定要删除吗？");
    if (res){
        $.ajax({
            url: "../php/deleteCart.php",
            type: "POST",
            dataType: "json",
            data: {
                "PaintingID":Number(paintingId),
                "customer":Number(sessionStorage.getItem("user"))
            },
            success:function (){
                alert('删除成功！');
                window.location.reload();
            }
        })
    }
}
window.onload=function (){
    interceptor();
    footprint();
    canvas()
    $.ajax({
        url:"../php/getCart.php",
        type:"POST",
        dataType:"json",
        data:{
            "id":Number(sessionStorage.getItem("user"))
        },
        success:function (response){
            let total=0;
            for (const obj of response) {
                console.log(obj);
                let changed="(has changed)";
                let exist="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HAS BEEN BOUGHT!!";
                if (obj.changed===0){
                    changed="";
                }
                if (obj.exist===1){
                    exist="";
                }
                total+=Number(obj.Cost);
                if (obj.Description===null)
                    obj.Description="Sorry,there's no description";
                if (obj.FirstName===null)
                    obj.FirstName="";
                $("#cart").append("<li class=\"pic\">\n" +
                    "            <a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\")'><img  src=\"../../img/art_store/works/small/"+obj.ImageFileName+".jpg"+" \" title='"+obj.Title+"' class=\"pic_pic \" alt=\" \"></a>\n" +
                    "            <div class=\"pic_text\">\n" +
                    "                <h1>"+obj.Title+"</h1>\n" +
                    "                <h3 style='color: darkblue'>Author:"+obj.FirstName+" "+obj.LastName+"</h3>\n" +
                    "                <h3 style='color: red'>Visits:"+obj.visit+changed+exist+"</h3><br>\n" +
                    "                <p class=\"text\">\n"+obj.Description+"</p>\n" +
                    "                <br>\n" +
                    "                <button class=\"delete\" onclick=\"deleteItem("+obj.PaintingID+")\">delete</button>\n" +
                    "                <button class=\"price\" onclick=\"alert(this.textContent)\">Price:$"+obj.Cost+"</button>\n" +
                    "            </div>\n" +
                    "        </li>")
            }
            $("#total").text("总共$"+total);
        },
        error:function (){
            alert("读取购物车失败！");
        }
    })
}