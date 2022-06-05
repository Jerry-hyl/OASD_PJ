function disabled_change_a(){
    let author=$("#author");
    $("#name").prop("disabled",false);
    author.prop("disabled",true);
    author.val("");
}
function disabled_change_b(){
    let name=$("#name");
    $("#author").prop("disabled",false);
    name.prop("disabled",true);
    name.val("");
}
function direct(number){
    $("#page").val(number);
    search_paintings();
}
function change(num){
    let obj=$("#page");
    let page=Number(obj.val());
    obj.val(String(page+num));
    search_paintings();
}
function search_paintings(){
    let title=$("#name").val();
    let author=$("#author").val();
    $.ajax({
        url:"../php/Search.php",
        type:'POST',
        dataType:'json',
        data:{
            "author":author,
            "title":title,
            "page":Number($("#page").val()),
            "rule":$("#sort option:selected").text()
        },
        success:function (response){
            let result=$("#result");
            result.html("");
            console.log(response);
            let pages=$("#pages");
            if (response.data==null){
                pages.html("/共"+response.pages+"页");
                alert("没有符合条件的艺术品！")
                return;
            }
            for (const object of response.data) {
                let painting=JSON.parse(object);
                result.append("<li class=\"pic \">\n" +
                    "            <a onclick='window.open(\"details.html?PaintingID="+painting.PaintingID+"\")' title=\""+painting.Title+"\"><img src=\"../../img/art_store/works/small/"+painting.ImageFileName+".jpg"+" \" class=\"pic_pic \" alt=\" \"></a>\n" +
                    "            <div class=\"pic_text \">\n" +
                    "                <h1>"+painting.Title+"</h1><h3 style='color: darkblue'>By&nbsp;"+painting.FirstName+" "+painting.LastName+"</h3>\n" +
                    "                <br>\n" +
                    "                <p class=\"text \">\n" +painting.Description+
                    "</p>\n" +
                    "                <br>\n" +
                    "                <button class=\"delete\" onclick='alert(this.textContent)'>Visits:"+String(painting.visit)+"</button>\n" +
                    "                <button class=\"price\" onclick='alert(this.textContent)'>Price:$"+painting.Cost+"</button>\n" +
                    "            </div>\n" +
                    "        </li>")
            }
            pages.html("/共"+response.pages+"页")
        },
        error:function (){
            alert("超出范围！");
            $("#page").val("1");
            search_paintings();
        }
    })
}
function loadSearch(){
    interceptor();
    footprint();
    canvas()
    search_paintings();
}