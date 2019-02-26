;(function(){
     /* 倒计时 */
     function time(){
        //1.获取标签
        var $timeBox = $(".time-box");
        //2.自定义将来时间
        var nextDate = new Date('2019/04/07 19:21:35'); 
        //3.开启定时器
        setInterval(function(){
            //4.获取现在时间
            var currentDate = new Date();
            //5.获取时间戳
            var currenTime = currentDate.getTime();     //过去时间戳  现在时间~1970年的毫秒数
            var nextTime = nextDate.getTime();          //将来时间戳  1818年~1970年的毫秒数
            //6.剩下的时间戳
            var allTime = nextTime - currenTime;    //等于将来时间戳 减 过去时间戳     
            //7.毫秒转换为秒
            var allSecond = parseInt(allTime / 1000);
            //8.转化
            // var d = size(parseInt(allSecond / 3600 /24));       //天
            var h = size(parseInt(allSecond / 3600 %24));       //小时
            var m = size(parseInt(allSecond / 60 % 24));        //分钟
            var s = size(parseInt(allSecond % 60));             //秒
            //9.注入
            $timeBox.children().eq(0).text(h);
            $timeBox.children().eq(1).text(m);
            $timeBox.children().eq(2).text(s);
        },1000);
        function size(num){
            return num >= 10 ? num : '0' +num;
        }
    }
    time()
    /* 轮播图 */
    function slideShow(){
        //1. 获取需要的标签 并设置样式
        var $count = 0;
        $(".slideshow-list li").first().show();
        $("ul.paging li").first().addClass("current")
        // 向右点击
        $('.next').click(autoPlay)
        function autoPlay(){
            $count++;
            if($count>$(".slideshow-list li").length-1){
                $count = 0;
            }
            fadeInO($count);
        }
        // 向左点击
        $('.previous').click(function(){
            $count--;
            if($count<0){
                $count = $(".slideshow-list li").length-1;
            }
            fadeInO($count);
        })
        // 圆点绑定
        $('ul.paging li').click(function(){
            $count = $(this).index()
            fadeInO($count);
        })
         //自动播放
         var time = setInterval(autoPlay,2000);
         $(".tomorrow-goods").hover(function(){
             clearInterval(time);
         },function(){
            time = setInterval(autoPlay,2000);
         })

         //提取代码
         function fadeInO(x){
            $('.slideshow-list li').eq(x).fadeIn(1000).siblings().fadeOut(1000);
            $('.tomorrow-goods ul.paging li').eq(x).addClass("current").siblings().removeClass("current")
        }
    }
    slideShow()

})()
   
        
 