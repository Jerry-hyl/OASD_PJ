function interceptor(){
    let url=window.location.href;
    console.log(url)
    let user=sessionStorage.getItem("user");
    if (url.indexOf("Center.html")!==-1 || url.indexOf("supermarket.html")!==-1 || url.indexOf("Upload.html")!==-1){
        if (user==null){
            alert("你还没有登录！");
            window.location.href="login.html"
        }
    }
    else {
        if (user==null){
            $("#nav").html("<li id=\"logo\">\n" +
                "                <a href=\"HomePage.html\"><img src=\"../../img/logo.png\" alt=\"\"></a>\n" +
                "            </li>\n" +
                "            <li id=\"website\">ART STORE</li>\n" +
                "            <li id=\"slogan\">Welcome to the world of ART!</li>\n" +
                "            <li class=\"this\"><a href=\"HomePage.html\">首页</a></li>\n" +
                "            <li><a href=\"Search.html\">搜索</a></li>\n" +
                "            <li><a>商品详情</a></li>\n" +
                "            <li><a href=\"login.html\">登录</a></li>\n" +
                "            <li><a href=\"register.html\">注册</a></li>")
        }
    }
}
function footprint(){
    let user=sessionStorage.getItem("user");
    $("#username").text(user);
    let foot=JSON.parse(localStorage.getItem(user));
    console.log(foot);
    if (foot==null) return;
    let x=[];
    for (const obj of foot) {
        x.push("<a onclick='window.open(\"details.html?PaintingID="+obj.PaintingID+"\");'>"+obj.Title+"</a>")
    }
    $("#foot_print").html(x.join("→"));
}
function logout(){
    sessionStorage.clear();
}