function fun() {
    // 进入页面验证是否存在cookkie
    checkCookie();
    // 留学轮播图
    function fnA() {
        $('.paging li').eq(0).css({ background: 'purple' });
        $('.slide-item a').eq(0).css({ display: 'block' });
        var $x = 0;
        $('.prev').click(autoPlay)
        function autoPlay() {
            $x++;
            if ($x > $('.slide-item a').length - 1) {
                $x = 0;
            }
            fadeInOut($x);
        }
        $('.next').click(function () {
            $x--;
            if ($x < 0) {
                $x = $('.slide-item a').length - 1;
            }
            fadeInOut($x);
        })
        $('.paging li').click(function () {
            $x = $(this).index();
            fadeInOut($x);
        })
        function fadeInOut($x) {
            $('.slide-item a').eq($x).stop(true, true).fadeIn(500).siblings().fadeOut(500);
            $('.paging li').eq($x).css({ background: 'purple' }).siblings().css({ background: '#999' })
        }
        var time = setInterval(autoPlay, 2000);

        $('#topics-study .topics-slide').mouseover(function () {
            $('.prev').css({ display: 'block' })
            $('.next').css({ display: 'block' })
            clearInterval(time);
        })
        $('#topics-study .topics-slide').mouseout(function () {
            time = setInterval(autoPlay, 2000);
            $('.prev').css({ display: 'none' })
            $('.next').css({ display: 'none' })
        })
    }
    // 留学第二个轮播图
    function fnB(){
        var x = 0;
        $(".rt").click(autoPlay)
        function autoPlay(){
            x++;
            if(x==2){
                $(".main-txt").stop(true,true).animate({marginLeft:-820*x},500,function(){
                    this.style.marginLeft = 0 +"px";
                })
                x=0;
            }else{
                $(".main-txt").stop(true,true).animate({marginLeft:-820*x},500)
            }
        }
        $(".lt").click(autoPlay)
        function autoPlay(){
            if(x==0){
                $(".main-txt").get(0).style.marginLeft = -1640 +"px";

                // $(".main-txt").css({marginLeft:2460})
                $(".main-txt").stop(true,true).animate({marginLeft:-820*(1-x)},500)

                x=2;
            }else{
                $(".main-txt").stop(true,true).animate({marginLeft:0},500)
            }
            x--;
        }
        var time = setInterval(autoPlay, 2000);

        $('.inner-txt').mouseover(function () {
            $('.lt').css({ display: 'block' })
            $('.rt').css({ display: 'block' })
            clearInterval(time);
        })
        $('.inner-txt').mouseout(function () {
            time = setInterval(autoPlay, 2000);
            $('.lt').css({ display: 'none' })
            $('.rt').css({ display: 'none' })
        })
    }

    // 旅游页面轮播图
    function fnC() {
        $('.dot li').eq(0).css({ background: 'purple' });
        $('.Picture-box a').eq(0).css({ display: 'block' });
        var $x = 0;
        $('.right').click(autoPlay)
        function autoPlay() {
            $x++;
            if ($x > $('.Picture-box a').length - 1) {
                $x = 0;
            }
            fadeInOut($x);
        }
        $('.left').click(function () {
            $x--;
            if ($x < 0) {
                $x = $('.Picture-box a').length - 1;
            }
            fadeInOut($x);
        })
        $('.dot li').click(function () {
            $x = $(this).index();
            fadeInOut($x);
        })
        function fadeInOut($x) {
            $('.Picture-box a').eq($x).stop(true, true).fadeIn(500).siblings().fadeOut(500);
            $('.dot li').eq($x).css({ background: 'purple' }).siblings().css({ background: '#999' })
        }
        var time = setInterval(autoPlay, 2000);

        $('#travel .topics-slide').mouseover(function () {
            $('.left').css({ display: 'block' })
            $('.right').css({ display: 'block' })
            clearInterval(time);
        })
        $('#travel .topics-slide').mouseout(function () {
            time = setInterval(autoPlay, 2000);
            $('.left').css({ display: 'none' })
            $('.right').css({ display: 'none' })
        })
    }
    fnA();
    fnB();
    fnC();


    // 旅游页面遮罩层部分
    $(".tit-txt li").hover(function () {
        $(this).children(".txt").stop(true, true).animate({ left: 0 })
        $(this).children(".tit").stop(true, true).animate({ bottom: -45 })
    }, function () {
        $(this).children(".txt").stop(true).animate({ left: -590 });
        $(this).children(".tit").stop(true).animate({ bottom: 0 });
    })


    $(".tit-txt01 li.tit-txt01-box").hover(function () {
        $(this).find(".conceal").stop(true, true).animate({ left: 0 });
        $(this).find(".sit").stop(true, true).animate({ bottom: -45 })
    }, function () {
        $(this).find(".conceal").stop(true).animate({ left: -590 });
        $(this).find(".sit").stop(true).animate({ bottom: 0 });
    })


    $(".tit-txt01 li.tit-txt02").hover(function () {
        $(this).find(".conceal").stop(true, true).animate({ left: 0 });
        $(this).find(".sit").stop(true, true).animate({ bottom: -45 })
    }, function () {
        $(this).find(".conceal").stop(true).animate({ left: -385 });
        $(this).find(".sit").stop(true).animate({ bottom: 0 });
    })

}
fun();