//返回顶部 开始
var courtyfun = (function () {
    //头部客户服务的悬停效果
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
        $(".topbar .topbar-left").click(function(){
            $(".mask").show();
            $(".mask-box").show();
        })
        //2.点击X时隐藏mask
        $(".close-btn").click(function(){
            $(".mask").hide();
            $(".mask-box").hide();
        })

        // 下拉选择国家
        var flag = true;
        $(".mask-box .options-wrapper").hide();
        $(".mask-box .spl").click(function(){
            if(flag){
                $(this).children(".options-wrapper").slideDown(200);
                $(this).children(".country-down").addClass("cd-active");
                $(this).children("span").addClass("sp-active");
                flag = false;
            }else{
                $(this).children(".options-wrapper").slideUp(200);
                $(this).children(".country-down").removeClass("cd-active")
                $(this).children("span").removeClass("sp-active");

                flag = true;
            }
        
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
                    // $(".auto-choice").on("click","li",function(){
                    //     var $searchVal = $(this).html();
                    //     console.log($searchVal);
                    //     setCookie("history",$searchVal,10);
                    //     // var $searchLi = "<li title="+$searchVal+"><span>"+$searchVal+"</span><a>删除</a></li>";
                    //     // $(".search-list").prepend($searchLi);
                    //     // searchSkip($(this).html());
                    // })
                }
            })
        }
    }
    //头部hover下拉内容
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
    //返回顶部 结束
    function toTop() {
        function $(select) {
            return document.querySelector(select);
        }
        var topLink = $('.xj-right-navslide .top-link');
        window.onscroll = function () {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYoffset;
            if (scroll > 1000) {
                topLink.style.opacity = 1;
            } else {
                topLink.style.opacity = 0;
            }
        }
        topLink.onclick = function () {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYoffset;
            scroll = 0;
            document.body.scrollTop = scroll;
            document.documentElement.scrollTop = scroll;
            window.pageYoffset = scroll;
            topLink.style.background = "#424242";
        }
    }
    // 图片懒加载
    function imgLazy(obj) {
        $(obj).lazyload({
            threshold: 400,
            effect: "fadeIn"
        });
    }
    /**ajax请求*/
    function scrollRequit(){
        function getScrollY(){
            return document.documentElement.scrollTop || document.body.scrolltop || window.pageYOffset;
        }
        var page = 1;
        var flag = true;
        window.onscroll = function(){
            var winH = window.innerHeight; 
            var list = document.querySelector(".content .list-title");
            var ulObj = document.querySelector(".content .list-title span");
            var listTop = list.offsetTop + list.clientHeight; 
            var scrollT = getScrollY(); 
            if (winH + scrollT >= listTop){
                if (flag){
                    flag = false;
                var xhr = new XMLHttpRequest();
                    xhr.open("get","api/country-onscrollLoad.php?page="+ page ,true)
                    xhr.send();
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4 && xhr.status == 200){
                            var data = JSON.parse(xhr.responseText);
                            if (data.success){
                                var listData = data.list,
                                    $goodsImg=$(".goods-img").length;
                                var htmlStr = "";
                                for(var i = 0; i < listData.length; i++){
                                        var dataStr=listData[i].url;
                                        imgstr="<img src='images/group/grey.gif' data-original='images/group/"+dataStr+"' alt='"+listData[i].tit+"' data-Id='"+listData[i].Id+"' data-txt='"+listData[i].txt+"'>",
                                        $price="￥"+listData[i].price;
                                        $(".goods-img a").eq(i).html(imgstr);
                                        $(".tit a").eq(i).text(listData[i].tit);
                                        $(".price").eq(i).text($price); 
                                }
                                flag = true;
                                page++;
                                (function(){
                                $(".country-block img").lazyload({
                                            threshold : 500,
                                            effect : "fadeIn"
                                         });
                                    })();
                            }else{
                                console.log('没有更多数据')
                            }  
                        }
                    }
                } 
            }
        }
    }
    return{
        topbar: topbar,
        nav:nav,
        toTop:toTop,
        imgLazy:imgLazy,
        scrollRequit:scrollRequit
    }
})()
courtyfun.topbar();
courtyfun.nav();
courtyfun.toTop();
courtyfun.imgLazy(".content-log img");
courtyfun.imgLazy(".email-box img");
courtyfun.imgLazy(".foot img");
courtyfun.imgLazy(".xj-right-navslide img");
courtyfun.scrollRequit();   



