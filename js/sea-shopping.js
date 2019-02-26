// 导航渐隐渐现
$(function(){
    $(window).scroll(function(){
        var screen=$(window).height();//窗口
        var scroll=$(window).scrollTop();//滚动条
        var top=$(".goods_list").offset().top;
        // console.log(screen)
        // console.log("----------"+scroll)
        if(top<=screen+scroll){
            $(".floor").fadeIn("slow");
        }else{
            $(".floor").fadeOut("slow");
        }
    })
})
// 导航改变字体样式
$(function(){
    $(".content_outer").each(function(i){
        var ofset=$(this).offset().top;
        if((screen+scroll)-ofset>=0){
            
        }else if(screen+scroll<ofset){
          
        }   
})
});
// 图片懒加载

    $(".img_box").find("img").lazyload();