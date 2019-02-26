function personalCenter(){
    checkCookie();
    $(".xj-order-statusmenu").hover(
        function(){
            $(this).children(".xj-order-selectmenu").stop(true,true).slideDown(150)
        },
        function(){
            $(this).children(".xj-order-selectmenu").stop(true).slideUp(150)
        }
    )
    

    var user=getCookie("user");
    signin = $(".header .inner-wrap .header-right .login-wrap .small-signin");
    member= $(".header .inner-wrap .header-right .login-wrap .small-member");
    if(user){
        signin.hide();
        member.show();
        $(".userImg .user a").html(user);
        $(".username").text(user);
        $(".member-welcome-tips .xj-welcome-tips p span").html(user);
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
personalCenter();
