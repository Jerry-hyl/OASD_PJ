function hotImage(){
    $.ajax({
        url:"../php/HotImage.php",
        type:"GET",
        dataType:"json",
        success:function (response){
            for (const painting of response) {
                $("#hotImage").append("<div class=\"hot_image\">\n" +
                    "                <a onclick='window.open(\"details.html?PaintingID="+painting.PaintingID+"\")'>\n" +
                    "                    <img src=\"../../img/art_store/works/small/"+painting.ImageFileName+".jpg"+"\" title=\""+painting.Title+"\" class=\"show_pic\" alt=\"123123\">\n" +
                    "                </a>\n" +
                    "                <p class=\"image_title\">"+painting.Title+"</p>\n" +
                    "                <p class=\"author\">Author:"+painting.FirstName+" "+painting.LastName+"&nbsp;&nbsp;&nbsp;Price:$"+painting.Cost+"</p>\n" +
                    "                <span class=\"visits\">Visits:"+painting.visit+"</span>\n" +
                    "                <p class=\"image_description\">"+painting.Description+"</p>\n" +
                    "            </div>")
            }
        }
    })
}
function newestRelease(){
    $.ajax({
        url: "../php/getNewestRelease.php",
        type: "GET",
        dataType: "json",
        success:function (response){
            for (const obj of response) {
                $("#new_release").append("<div class=\"hot_image\">\n" +
                    "                <a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\")'>\n" +
                    "                    <img src=\"../../img/art_store/works/small/"+obj.ImageFileName+".jpg\" title=\""+obj.Title+"\" class=\"show_pic\" alt=\"123123\">\n" +
                    "                </a>\n" +
                    "                <p class=\"image_title\">"+obj.Title+"</p>\n" +
                    "                <p class=\"author\">Author:"+obj.LastName+"&nbsp;&nbsp;&nbsp;Price:$"+obj.Cost+"</p>\n" +
                    "                <span class=\"visits\">Release Date:"+obj.release_date+"</span>\n" +
                    "                <p class=\"image_description\">"+obj.Description+"</p>\n" +
                    "            </div>")
            }
        }
    })
}
function load(){
    interceptor();
    canvas();
    hotImage();
    newestRelease();
}