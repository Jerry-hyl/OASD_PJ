//CharMode函数
//测试某个字符是属于哪一类.
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else
        return 8; //特殊字符
}

//bitTotal函数
//计算出当前密码当中一共有多少种模式
function bitTotal(num) {
    let modes = 0;
    for (let i = 0; i < 4; i++) {
        if (num &1) modes++;
        num >>>= 1;
    }
    return modes;
}

//checkStrong函数
//返回密码的强度级别
function checkStrong(sPW) {
    //密码长度
    if (sPW.length <= 4)
        return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.
        //目前未知|=的意思
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

//pwStrength函数
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色
function pwStrength(pwd) {
    let O_color = "#eeeeee"; //白色
    let L_color = "#FF0000"; //绿色
    let M_color = "#FF9900"; //黄色
    let H_color = "#33CC00"; //红色
    if (pwd == null || pwd === '') {
        //不用var声明变量连=号连接赋值
        Lcolor = Mcolor = Hcolor = O_color;
    } else {
        //检查字符串安全级别返回级别数据进行判断
        S_level = checkStrong(pwd);
        //判断密码级别
        switch (S_level) {
            case 0:
                //给每个变量赋颜色
                Lcolor = Mcolor = Hcolor = O_color;
                break;
            case 1:
                //给每个变量赋颜色
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                //给每个变量赋颜色
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                //给每个变量赋颜色
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    //向每个单元格赋颜色
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;
}

function checkUsername(){
    let check=$("#checkUsername");
    let username=document.getElementById("username");
    let password=document.getElementById("password");
    if (username.value===""){
        check.css("color","red");
        check.text("用户名不能为空！");
        return false;
    }
    if (password.value!=="" && password.value===username.value){
        check.css("color","red");
        check.text("用户名与密码不能相同！");
        username.value="";
        return false;
    }
    let objExp=/^[A-Za-z0-9_\-]+$/;
    if (!objExp.test(username.value)){
        check.css("color","red");
        check.text("用户名只能包含大小写字母、数字、\"_\"、\"-\"");
        return false;
    }
    else{
        check.css("color","green");
        check.text("符合要求");
        return true;
    }
}
function checkPassword() {
   let password=document.getElementById("password");
   let username=document.getElementById("username");
   let check=$("#checkPassword");
   check.css("color","red");
   if (password.value===""){
       check.text("密码不能为空！");
       return false;
   }
   if (username.value!=="" && password.value===username.value){
       check.text("用户名与密码不能相同！");
       password.value="";
       return false;
   }
   let expression=/^\d{6,}$/;
   if (expression.test(password.value) || password.value.length<6){
       check.text("密码长度必须大于等于 6 位，且不得为纯数字");
       return false;
   }
   else {
       check.css("color","green");
       check.text("符合要求")
       return true;
   }
}
function checkAgainPassword(){
    let rePassword=document.getElementById("rePassword").value;
    let password=document.getElementById("password").value;
    let check=$("#checkAgainPassword");
    check.css("color","red");
    if (password!==rePassword){
        check.text("两次输入密码不同！");
        document.getElementById("rePassword").value="";
        return false;
    }
    else{
        if (password!=="" && checkPassword()){
            check.css("color","green");
            check.text("符合要求");
            return true
        }
        else {
            check.text("");
            return false;
        }
    }
}
function checkEmail(){
    let email=document.getElementById("email").value;
    let check=$("#checkEmail");
    check.css("color","red");
    if (email===""){
        check.text("邮箱不能为空！");
        return false;
    }
    let objExp=/^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(.[a-zA-Z0-9_\-])+/
    if (!objExp.test(email)){
        check.text("请输入正确的邮箱地址！");
        return false;
    }
    else {
        check.css("color", "green");
        check.text("符合要求");
        return true;
    }
}

function checkPhoneNumber(){
    let phoneNumber=document.getElementById("phoneNumber").value;
    let check=$("#checkPhoneNumber");
    check.css("color","red");
    if (phoneNumber===""){
        check.text("电话号码不能为空！");
        return false;
    }
    if(!(/^1[3456789]\d{9}$/.test(phoneNumber))){
        check.text("手机号码有误！");
        return false;
    }
    else {
        check.css("color","green");
        check.text("符合要求");
        return true;
    }
}
function checkAddress(){
    let address=document.getElementById("address").value;
    let check=$("#checkAddress")
    check.css("color","red");
    if (address===""){
        check.text("地址不能为空！");
        return false;
    }
    else {
        check.css("color","green");
        check.text("符合要求");
        return true;
    }
}
function register(){
    if (!checkUsername() || !checkPassword() || !checkAgainPassword() || !checkPhoneNumber() || !checkAddress() || !checkEmail()){
        alert("注册消息填写不规范！");
        return;
    }
    $.ajax({
        url:'../php/register.php',
        type:'POST',
        dataType:'json',
        data:{
            "username":$("#username").val(),
            "password":$("#password").val(),
            "email":$("#email").val(),
            "phone":$("#phoneNumber").val(),
            "address":$("#address").val()
        },
        success:function (response){
            console.log(response)
            if (response.msg==="success"){
                alert("注册成功！");
                window.location.href="../html/login.html";
            }
            else {
                alert(response.msg);
            }
        },
        error:function (error){
            console.log(error);
            alert("注册失败！");
        }
    })
}
