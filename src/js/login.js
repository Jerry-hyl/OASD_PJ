function checkName(){
    let name=document.getElementById("name").value;
    if (name===""){
        alert("用户名或邮箱不能为空！");
        return false;
    }
    else return true;
}
function checkPassword(){
    let password=document.getElementById("password").value;
    if (password===""){
        alert("密码不能为空！");
        return false;
    }
    else return true;
}
function update(){
    $("#checkNumberPic").attr("src","../php/checkNumber.php")
}

function login(){

    if (checkName() && checkPassword()){
        let password=document.getElementById("password").value;
        let username=document.getElementById("name").value;
        let checkNumber=document.getElementById("checkNumber").value;
        console.log(username+password+checkNumber);
        $.ajax({
            url:'../php/login.php',
            type:'POST',
            dataType:'json',
            data:{
                'username':username,
                'password':password,
                'checkNumber':checkNumber
            },
            success:function (response){
                if (response.msg==="success"){
                    alert("登录成功！"+"你好"+response.data.username+"\n上次修改的时间是"+response.data.lastModify);
                    console.log(response);
                    window.sessionStorage.setItem("user",response.data.CustomerID);
                    window.sessionStorage.setItem("username",response.data.username);
                    window.location.href="../html/HomePage.html";
                }
                else{
                    alert(response.msg);
                    document.getElementById("checkNumber").value="";
                    update();
                }
            },
            error:function (error){
                alert("登录失败");
                update();
                console.log(error);
            }
        })
    }
}