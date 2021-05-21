

function look(x) {
    var id ="";
    console.log(x);
    for(var i = 4;i < x.length;i++)
        id += x[i];
    var all = document.getElementsByName("main-part");
    var len = all.length;
    for(var i = 0;i < len;i++)
        all[i].style.display="none";
    id = "user" + id;
    console.log(id);
    document.getElementById("friend-part").style.display="";
    document.getElementById(id).style.display = "";
}
function back() {
    var all = document.getElementsByName("main-part");
    var len = all.length;
    for(var i = 0;i < len;i++)
        all[i].style.display="none";
    document.getElementById("friend-part").style.display = "";
}
function make(x)
{
    var id = "";
    for(var i = 4;i < x.length;i++)
        id += x[i];
    id = 'username' + id;
    var it = document.getElementById(id).innerText.toString();
    let len = it.length;
    let people = "";
    for(var i = 0;i < len;i++) {
        if(it[i] == '：'){
            i++;
            while(i < len) {
                people = people + it[i];
                i++;
            }
        }
    }
    var name = unescape(document.cookie.split("userName=")[1].split(";")[0]);
    $.ajax({
        url:"/call",
        type:"get",
        crossDomain: true,
        data:{
            'username':name,
            'friend':people
        },
        contentType:"application/json;charset=utf-8",
        dataType: "json",
        success:function(data){
            if(data.type == "success") {
                alert("申请成功！请耐心等待对方回复。");
                window.location.href="/main";
            }
                else alert("申请失败！"+ data.message);
            },
        error:function (e){
            alert("网站出错了" + e.responseText);
        }
    })
}

$(function () {
    $("#recreate").click(function (e)
    {
        var name = unescape(document.cookie.split("userName=")[1].split(";")[0]);
        $.ajax({
            url:"/change",
            type:"get",
            crossDomain: true,
            //async:false,
            data:{
                "username":document.getElementById("username").value,
                "password":document.getElementById("password").value,
                "newpassword":document.getElementById('repassword').value,
                "mothertongue":document.getElementById('mothertongue').value,
                "want":document.getElementById('want').value,
                'power':document.getElementById('power').value,
                'hobby':document.getElementById('hobby').value,
                'WX':document.getElementById('WX').value,
                'name':name
            },
            contentType:"application/json;charset=utf-8",
            dataType: "json",
            success:function(data){
                if(data.type == "success")
                {
                    alert("修改成功！");
                    window.location.href="/";
                }
                else alert("修改失败！"+ data.message);
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    })
    $("#del").click(function (e)
    {
        var r=confirm("账号一旦注销无法复原，确定注销？");
        if(r == true){
            var name = unescape(document.cookie.split("userName=")[1].split(";")[0]);
            $.ajax({
                url:"/del",
                type:"get",
                crossDomain: true,
                //async:false,
                data:{
                    'name':name
                },
                contentType:"application/json;charset=utf-8",
                dataType: "json",
                success:function(data){
                    if(data.type == "success")
                    {
                        alert("注销成功！");
                        window.location.href="/";
                    }
                    else alert("注销失败！"+ data.message);
                },
                error:function (e){
                    alert("网站出错了" + e.responseText);
                }
        })}
    })
})


