function brand(){
    // 进入页面验证是否存在cookie
    checkCookie();
    
    $(".menu ul li").eq(4).children().css({color:"#ed5831"})
    // 初始化页面时加载所有数据
    function open(){
        $.ajax({
            type:"post",
            url:"api/brand.php",
            dataType:"json",
            success:function(data){
                request(data);
            }
        })
    }
    open()

    // 点击列表模块时请求数据
    $(".brand-list .cate").click(function(){
        $(".cate").removeClass("ca-active");
        $(this).addClass("ca-active");
        var brandName = $(this).attr("title");
        $.ajax({
            type:"post",
            url:"api/doBrand.php",
            data:"brand="+brandName,
            dataType:"json",
            success:function(data){
                $(".letter-box").html("");
                request(data);
            }
        })
    })

    //提取代码
    function request(data){
        var letterArr=[];
        $.each(data,function(index,val){
            if(letterArr.indexOf(val.type)==-1){
                letterArr.push(val.type)
            }
        })
        $.each(letterArr,function(a,b){
            $letterNode = $("<div class=\"letter-list clearfix\"><h3>"+b+"</h3><ul class=\"letter"+a+"\"></ul></div>");
            $(".letter-box").append($letterNode);
            $.each(data,function(index,val){
                if(val.type == b){
                    $liNode=$("<li><a href=\"#\">"+val.name+"</a></li>");
                    $(".letter"+a).append($liNode);
                }
            })
        })
    }

    // 点击清除筛选时清空列表
    $(".titStyle a").click(function(){
        $(".cate").removeClass("ca-active");
        $.ajax({
            type:"post",
            url:"api/brand.php",
            dataType:"json",
            success:function(data){
                $(".letter-box").html("");
                request(data);
            }
        })
    })

    // 字母列表楼层导航
    var letterScrollT = $(".letter-tit").offset().top;//获取字母列表的offset值
    $(window).scroll(function(){
        var scrollT = $(window).scrollTop();//滚动值
     
        // 遍历letter-list
        $(".letter-list").each(function(){
            var offsetT = $(this).offset().top;
            if(offsetT-scrollT<=100 && offsetT-scrollT>-50){
                $(".tit-block a").eq($(this).index()).addClass("letter-active").siblings().removeClass("letter-active");
            }
        })
        
        if(scrollT>=letterScrollT){//给字母列表固定定位
            $(".tit-block").addClass("tit-active");
        }else{
            $(".tit-block").removeClass("tit-active");
            $(".tit-block a").removeClass("letter-active");
        }
    })
    // 点击字母列表时跳转
    $(".tit-block a").click(function(){
        $(this).addClass("letter-active").siblings().removeClass("letter-active");
        var currentOffset = $(".letter-list").eq($(this).index()-1).offset().top-90;
        $(window).scrollTop(currentOffset);
    })
}
brand()