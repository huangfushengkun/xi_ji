var fun = (function(){
    // 进入页面验证是否存在cookie
    // checkCookie();
    // 点击立即选购出现弹框 
    function shop(){
        $('.popup-product').hide();
        $(".popup-buy-view").click(function () {
            $('.popup-product').show();
            $('.mask1').show();
        })
        // 弹框隐藏
        $('.popup-product .close').click(function () {
            $('.popup-product').hide();
            $('.mask1').hide();
        })
        
    };
    // 选购弹框中的tab切换
    function tab(){
        $('.thumbnail-list .popup-box').first().show();
        $('.thumb .thumb-img').hover(
            function(){
                $('.thumb .thumb-img').eq($(this).index()).addClass('ate').show().siblings().removeClass('ate');
                $('.thumbnail-list .popup-box').children().eq($(this).index()).show().siblings().hide();
            }
        )
    }
    // 选购弹框中点击箭头图片移动
    function move(){
        // n=1;
        // n+=n;
        $('.next').click(function(){
            $('.thumb ul').animate({marginLeft:-70},1000)
        })
        $('.prev').click(function(){
            $('.thumb ul').animate({marginLeft:0},1000)
        })
    };
    //弹框中的数量加减
    function add(){
        var $n = $(".num-ipt").val();
        //数量增加操作
        $(".add").click(function () {
            $n++;
            $(".num-ipt").val($n);
        })
        // 数量减少操作
        $(".min").click(function () {
            $n--;
            if($n <= 1){
                $n=1;
            }
            $(".num-ipt").val($n);
        })
    };
    // 图片懒加载
    function lazy(){
        $("img").lazyload({
            threshold : 200,
            effect : "fadeIn"
         });
    }
    return{
        shop:shop,
        tab:tab,
        move:move,
        add:add,
        lazy:lazy
    }
})()
fun.shop();
fun.tab();
fun.move();
fun.add();
fun.lazy();