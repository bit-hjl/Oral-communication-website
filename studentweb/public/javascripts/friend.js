function delsend(x){
    var id ="";
    for(var i = 7;i < x.length;i++)
        id += x[i];
    id = 'send' + id;
    var it = document.getElementById(id).innerText.toString();
    let people = "";
    var len = it.length;
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
    var r=confirm("确定撤销该条申请？");
    if(r){
    $.ajax({
        url:"/delsend",
        type:"get",
        crossDomain: true,
        data:{
            'username':name,
            'other':people
        },
        contentType:"application/json;charset=utf-8",
        dataType: "json",
        success:function(data){
            if(data.type == "success") {
                alert('删除成功！');
                window.location.href="/main";
            }
            else {
                alert("删除失败"+ data.message);
                window.location.href="/main";
            }
        },
        error:function (e){
            alert("网站出错了" + e.responseText);
        }
    })
    }
}
function agree(x){
    var id ="";
    for(var i = 5;i < x.length;i++)
        id += x[i];
    id = 'get' + id;
    console.log(id);
    var it = document.getElementById(id).innerText.toString();
    let people = "";
    var len = it.length;
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
    var r=confirm("确定接受TA的申请？");
    if(r){
        $.ajax({
            url:"/agree",
            type:"get",
            crossDomain: true,
            data:{
                'username':name,
                'other':people
            },
            contentType:"application/json;charset=utf-8",
            dataType: "json",
            success:function(data){
                if(data.type == "success") {
                    alert('好友添加成功！');
                    window.location.href="/main";
                }
                else {
                    alert("添加失败"+ data.message);
                    window.location.href="/main";
                }
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    }
}
function disagree(x){
    var id ="";
    for(var i = 8;i < x.length;i++)
        id += x[i];
    id = 'get' + id;
    console.log(id);
    var it = document.getElementById(id).innerText.toString();
    let people = "";
    var len = it.length;
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
    var r=confirm("确定拒绝TA的申请？");
    if(r){
        $.ajax({
            url:"/disagree",
            type:"get",
            crossDomain: true,
            data:{
                'username':name,
                'other':people
            },
            contentType:"application/json;charset=utf-8",
            dataType: "json",
            success:function(data){
                if(data.type == "success") {
                    alert('拒绝成功！');
                    window.location.href="/main";
                }
                else {
                    alert("操作失败"+ data.message);
                    window.location.href="/main";
                }
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    }
}
function delfriend(x){
    var id ="";
    for(var i = 9;i < x.length;i++)
        id += x[i];
    id = 'friend' + id;
    console.log(id);
    var it = document.getElementById(id).innerText.toString();
    let people = "";
    var len = it.length;
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
    var r=confirm("确定删除TA？删除后双方均无法在好友列表看到对方");
    if(r){
        $.ajax({
            url:"/delfriend",
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
                    alert('删除成功！');
                    window.location.href="/main";
                }
                else {
                    alert("删除失败"+ data.message);
                    window.location.href="/main";
                }
            },
            error:function (e){
                alert("网站出错了" + e.responseText);
            }
        })
    }
}