//跳转到搜索页面
function searchSkip(search){
    location.href="https://www.so.com/s?ie=utf-8&fr=none&src=sug-local&q="+search;
}

/*****
 * cookie的访问
 */
//写入cookie
function setCookie(name, value, expires) {
    if(expires){
        var Days = expires; //天数
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }else{
        document.cookie=name+"="+escape(value);
    }
}

//读取cookie
function getCookie(name) {
    var strCookie = document.cookie; // “userId=828; userName=hulk;userId=828; userName=hulk”
    //将多cookie切割为多个名/值对
    var arrCookie = strCookie.split("; ");
    var result;
    //遍历cookie数组，处理每个cookie对
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if (name == arr[0]) {
            result  = arr[1];
            break;
        }else{
            result = null;
        }
    }
    return result;
}

//删除cookie
function delCookie(name){
    //获取当前时间
    var date = new Date();
    //将date设置为过去的时间
    date.setTime(date.getTime() - 10000);
    document.cookie = name +"=;expires=" + date.toGMTString();
}
var XJuser;
//在每个页面验证是否存在cookie
function checkCookie(){
     user=getCookie("user");
    // console.log(user);
    signin = $(".header .inner-wrap .header-right .login-wrap .small-signin");
    member= $(".header .inner-wrap .header-right .login-wrap .small-member");
    if(user){
        signin.hide();
        member.show();
        $(".username").text(user);
        $.ajax({
            type:"post",
            url:"api/cart.php",
            dataType:"json",
            success:function(data){
                if(data.success){
                    var cartNumber=0
                    $.each(data.list,function(index,val){
                        var singleNumber = parseInt(val.number);
                         cartNumber +=singleNumber;
                    })
                    $(".minicart strong").html(cartNumber);
                }else{
                    $(".minicart strong").html(0);
                }
            }
        })
    }
}
// checkCookie();
// $('.delete').click(function(){
//     delCookie(XJuser)

// })
