
//客户服务的悬停效果
function topbar(){
    // 进入页面验证是否存在cookie
    checkCookie();
    
    $(".topbar .service-box").hover(function(){
        $(".topbar .service-menu").stop(true,true).slideDown(150);
    },function(){
        $(".topbar .service-menu").stop(true).slideUp(150);
    })

    // mask蒙版
    // 点击时显示mask蒙版
      
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
        $(this).parent().stop(true,true).animate({height:167},200);
        $(this).addClass("s-active");
        $(".header .signin-box").show();
    },function(){
        $(this).parent().stop(true).animate({height:35},200,function(){
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
topbar()



function nav(){
    // 导航列表的悬停效果
    $(".CFList-list").hover(function(){
        $(this).addClass("active");
        $(this).find(".sub-box").show();
    },function(){
        $(this).removeClass("active");
        $(this).find(".sub-box").hide();
    })



    // 轮播图特效
    // 初始状态
    $(".banner .slide-item").first().show();
    $(".banner .paging li").first().addClass("l-active");

    $(".banner .next").hover(function(){
        $(this).addClass("n-active");
    },function(){
        $(this).removeClass("n-active");
    })
    $(".banner .prev").hover(function(){
        $(this).addClass("p-active");
    },function(){
        $(this).removeClass("p-active");
    })
    var $count = 0
    // 下一张
    $(".banner .next").click(autoPlay)
    // 自动播放代码
    function autoPlay(){
        $count++;
        if($count>$(".slide-item").length-1){
            $count = 0;
        }
        fadeInOut($count)
    }
    //上一张
    $(".banner .prev").click(function(){
        $count--;
        if($count<0){
            $count = $(".slide-item").length-1;
        }
        fadeInOut($count);
    })

    // 圆点绑定
    $(".paging li").mouseenter(function(){
        $count=$(this).index();
        fadeInOut($count);
    })
       //提取代码
    function fadeInOut(x){
        $(".slide-item").eq(x).fadeIn(1000).siblings().fadeOut(1000);
        $(".paging li").eq(x).addClass("l-active").siblings().removeClass("l-active")
    }
    //自动播放
    var time = setInterval(autoPlay,3000);
    $(".banner-box").hover(function(){
        $(".banner .control").show();
        clearInterval(time);
    },function(){
        $(".banner .control").hide();
        time = setInterval(autoPlay,3000);
    })
}
nav();

//返回顶部 开始
;(function(){
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