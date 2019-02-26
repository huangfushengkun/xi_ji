
// 进入页面验证是否存在cookie
checkCookie();
//客户服务的悬停效果
function topbar(){
    
    
    $(".topbar .service-box").hover(function(){
        $(".topbar .service-menu").stop(true,true).slideDown(150);
    },function(){
        $(".topbar .service-menu").stop(true).slideUp(150);
    })

    // mask蒙版
    // 点击时显示mask蒙版
        $(".mask").hide();
        $(".mask-box").hide();
    $(".topbar .sel-box").click(function(){
        $(".mask").show();
        $(".mask-box").show();
    })
    //2.点击X时隐藏mask
    $(".close-btn").click(function(){
        $(".mask").hide();
        $(".mask-box").hide();
    })

    // 下拉选择国家
    $(".mask-box .options-wrapper").hide();
    $(".mask-box .spl").click(function(){
            $(this).children(".options-wrapper").slideToggle(200);
            $(this).children(".country-down").toggleClass("cd-active");
            $(this).children("span").toggleClass("sp-active");
    })

    
    //购物车的悬停效果
    $(".header .minicart").hover(function(){
        $(".header .minicart-cont").show();
        $(".header .cover-white").show()
        $(".header .minicart a").addClass("h-active");
    },function(){
        $(".header .minicart-cont").hide();
        $(".header .cover-white").hide()
        $(".header .minicart a").removeClass("h-active");
    })

    // 登陆框的js效果
    $(".header .small-signin").hover(function(){
        $(this).parent().stop(true,true).animate({height:167},300);
        $(this).addClass("s-active");
        $(".header .signin-box").show();
    },function(){
        $(this).parent().stop(true).animate({height:35},300,function(){
            $(".header .signin-box").hide();
            $(".header .small-signin").removeClass("s-active");
        });
       
    })

    $(".header .small-member").hover(function(){
        $(this).parent().stop(true,true).animate({height:162},200);
        $(this).addClass("s-active");
        $(".header .member-box").show();
    },function(){
        $(this).parent().stop(true).animate({height:35},200,function(){
            $(".header .member-box").hide();
            $(".header .small-member").removeClass("s-active");
        });
       
    })
    // 搜索框的搜索历史添加以及删除
    // $(".x-input").focus(function(){
    //     if($(".x-input").val() !=null){
    //         $(".search-history").hide()
    //     }else{
    //         $(".search-history").show()
    //     }
        
    // })
    $(".x-input").get(0).oninput=function(){
        // 判断输入框是否有值隐藏搜素历史
        // if($(".x-input").val()){
        //     $(".search-history").hide()
        // }else{
        //     $(".search-history").show()
        // }
        $.ajax({
            url:"https://sug.so.360.cn/suggest",
            type:"get",
            data:"word="+ $(".x-input").val() + "&encodein=utf-8&encodeout=utf-8&pq=",
            dataType:"jsonp",
            success:function(data){
                var count = -1;
                $(".auto-choice").html("");
                //动态添加li标签
                $.each(data.s,function(i,val){
                    var $liNode="<li>"+val+"</li>";
                    $(".auto-choice").append($liNode);
                })
                //当鼠标悬停到每个li标签时，改变字体颜色并改变输入框的内容
                $(".auto-choice li").hover(function(){
                    $(this).css({color:"#ed5831"})
                },function(){
                    $(this).css({color:"#333"})
                })
                //当点击每个li标签时跳转到相应的连接，同时生成历史记录
                $(".auto-choice").on("click","li",function(){
                    var $searchVal = $(this).html();
                    // console.log($searchVal);
                    // setCookie("history",$searchVal,10);
                    // var $searchLi = "<li title="+$searchVal+"><span>"+$searchVal+"</span><a>删除</a></li>";
                    // $(".search-list").prepend($searchLi);
                    // searchSkip($(this).html());
                    searchSkip($searchVal);
                })
            }
        })
    }
}
topbar();



function nav(){
    // 导航列表的悬停效果
    $(".category-list").hover(function(){
        $(this).find(".CFList").css({overflow:"visible"}).stop(true,true).animate({height:390});
        $(this).find(".CFList-tlt").show();
    },function(){
        $(this).find(".CFList").stop(true).delay(300).animate({height:0},function(){
            $(this).find(".CFList-tlt").hide();
        });
        
    })

    $(".CFList-list").hover(function(){
        $(this).addClass("active");
        $(this).find(".sub-box").show();
    },function(){
        $(this).removeClass("active");
        $(this).find(".sub-box").hide();
    })
}
nav();


//返回顶部 开始
(function(){
    $(window).scroll(function(){
        // 获取窗口滚动值
        var scrollT = $(window).scrollTop();
        // console.log(scrollT);
        if(scrollT>200){
            $(".top-link").addClass("top-active");
        }else{
            $(".top-link").removeClass("top-active");
        }
        $(".top-link").click(function(){
            $("body,html").stop(true).animate({
                scrollTop:0
            },500);
            return false;
        })
    })
})()
//返回顶部 结束