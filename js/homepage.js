

(function(){
    function fun (){
        $(window).scroll(function(){
            var boxH = $(".children").eq(0).offset().top
            var winHeight = $(window).height();//屏幕的高度;
            var winScroll = $(window).scrollTop();//滚动值；
            // 当前在视口的盒子索引；
            var index = Math.floor((winScroll + winHeight - boxH )/ $(".children").eq(0).height()); 
            /* 判断是否符合加载条件切是首次加载 */
            if(winScroll + winHeight > boxH && $(".children").eq(index).data("notload")){
                /* 符合条件调用懒加载函数 */
                goodsAjax(index,$(".children"))
            }
        })
    }
    fun();
    /* 懒加载函数 */
function goodsAjax(index,obj){
    obj.eq(index).data("notload",false)
    $.ajax({
        url:"api/homepage.php",
        type:"POST",
        dataType:"json",
        data:{
            type:index+1
        },
        success:function(array){
            var boxData = array.data1[0],
                boxDatb = boxData.xiao,
                boxDatc = boxDatb.split(",")
            html =`
                <div class="goods-innerbox clearfix" style="background:url(images/homepage/`+ array.data1[0]['1-simg'] +`)";>
                    <div class="dexter">
                        <div class="goodcomment-tit">`+boxData.fuzhuang+`</div>
                        <a href="" class="look-all">查看全部 ></a>
                        <div class="hot-box">
                            <div>
                                <a><p href="">`+boxDatc[0]+`</p></a>
                                <a><p href="">`+boxDatc[1]+`</p></a>
                                <a><p href="">`+boxDatc[2]+`</p></a>
                                <a><p href="">`+boxDatc[3]+`</p></a>
                                <a><p href="">`+boxDatc[4]+`</p></a>
                                <a><p href="">`+boxDatc[5]+`</p></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[0].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[0].img1 +`" alt="">
                        `+ array.data2[0].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[0].jiage +`</span>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[1].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[1].img1 +`" alt="">
                        `+ array.data2[1].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[1].jiage +`</span>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[2].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[2].img1 +`" alt="">
                        `+ array.data2[2].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[2].jiage +`</span>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[3].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[3].img1 +`" alt="">
                        `+ array.data2[3].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[3].jiage +`</span>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[4].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[4].img1 +`" alt="">
                        `+ array.data2[4].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[4].jiage +`</span>
                    </div>
                </div>
                <div class="modules">
                    <img src="./images/homepage/`+ array.data2[5].img +`" alt="">
                    <a href="">
                        <img src="./images/homepage/`+ array.data2[5].img1 +`" alt="">
                        `+ array.data2[5].wenzi+`
                    </a>
                    <div class="price-box">
                        <span>￥` + array.data2[5].jiage +`</span>
                    </div>
                </div>
                <div class="recommended">
                    <div class="brand-tit">
                        <span> 推荐品牌 </span>
                    </div>
                    <ul class="clearfix">
                        <li><img src="./images/homepage/`+ array.data3[0].img1 +`" alt=""></li>
                        <li><img src="./images/homepage/`+ array.data3[0].img2 +`" alt=""></li>
                        <li><img src="./images/homepage/`+ array.data3[0].img3 +`" alt=""></li>
                        <li><img src="./images/homepage/`+ array.data3[0].img4 +`" alt=""></li>
                        <li><img src="./images/homepage/`+ array.data3[0].img5 +`" alt=""></li>
                        <li><img src="./images/homepage/`+ array.data3[0].img6 +`" alt=""></li>
                    </ul>
                </div>
            `
            $(".type-area .children").eq(index).html(html)
        }
    })
}
})()