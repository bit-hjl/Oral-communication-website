var users = [];
function back()
{
    if(user == "null") {
        alert("请先登陆！")
        window.location.href="/";
    }
    else return;
}

$(function () {
    $("#login").click(function (e) {
        e.preventDefault();
        var user = document.getElementById("username").value;
        console.log("完成");
        $.ajax({
            url:"/login",
            type:"get",
            crossDomain: true,
            //async:false,
            data:{
               "username":document.getElementById("username").value,
                "password":document.getElementById("password").value
            },
            contentType:"application/json;charset=utf-8",
            dataType: "json",
            success:function(data){
                if(data.type == "success")
                {
                    document.cookie="userName="+escape(user);
                    window.location.href="/main";
                }
                else alert(data.message);
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    })
    $("#goto").click(function (e)
    {
        window.location.href="/goto";
    })
    $("#create").click(function (e) {
        var user = document.getElementById("username").value;
        e.preventDefault();
        $.ajax({
            url:"/create",
            type:"get",
            crossDomain: true,
            //async:false,
            data:{
                "username":document.getElementById("username").value,
                "password":document.getElementById("password").value,
                "repassword":document.getElementById('repassword').value,
                "mothertongue":document.getElementById('mothertongue').value,
                "want":document.getElementById('want').value,
                'power':document.getElementById('power').value,
                'hobby':document.getElementById('hobby').value,
                'WX':document.getElementById('WX').value,
                'name':document.getElementById('name').value,
                'studentid':document.getElementById('studentid').value
            },
            contentType:"application/json;charset=utf-8",
            dataType: "json",
            success:function(data){
                if(data.type == "success")
                {
                    alert("注册成功！");
                    document.cookie="userName="+escape(user);
                    window.location.href="/main";
                }
                else alert("注册失败！"+ data.message);
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    })
    $("#friend").click(function (e)
    {
        var all = document.getElementsByName("main-part");
        var len = all.length;
        for(var i = 0;i < len;i++)
            all[i].style.display="none";
        document.getElementById("friend-part").style.display="";
    })
    $("#chat").click(function (e)
    {
        window.location.href="/chat";
    })
    $("#my").click(function (e)
    {
        var all = document.getElementsByName("main-part");
        var len = all.length;
        for(var i = 0;i < len;i++)
            all[i].style.display="none";
        document.getElementById("my-part").style.display="";
    })
    $("#get-send").click(function (e)
    {
        var all = document.getElementsByName("main-part");
        var len = all.length;
        for(var i = 0;i < len;i++)
            all[i].style.display="none";
        document.getElementById("get-send-part").style.display="";
    })
    $("#change").click(function (e)
    {
        var all = document.getElementsByName("main-part");
        var len = all.length;
        for(var i = 0;i < len;i++)
            all[i].style.display="none";
        document.getElementById("change-part").style.display="";
    })
    $("#myfriend").click(function (e)
    {
        var all = document.getElementsByName("main-part");
        var len = all.length;
        for(var i = 0;i < len;i++)
            all[i].style.display="none";
        document.getElementById("myfriend-part").style.display="";
    })
})
