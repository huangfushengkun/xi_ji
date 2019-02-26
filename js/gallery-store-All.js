;(function($){
    /* 验证cookie */
    //获取左侧品牌区选择区滚轮事件需要的标签
    var $rightNavBox = $(".filter-entries-values.rightNav-box");
    var $rightNavContent = $rightNavBox.children("ul");
    var $rightNavBoxH = $rightNavBox.innerHeight();  //盒子高
    var $rightNavContentH = $rightNavContent.innerHeight();  //内容高
    var $rightNavLine = $rightNavBox.children(".nav-line");
    var $navBar = $rightNavLine.children();
    var $navBarH = $navBar.innerHeight(); //滚动条高
    var $rightNavContentTop = $rightNavContent.position().top; //内容相对父元素的top值
    var scale = ($rightNavContentH - $rightNavBoxH) / ($rightNavBoxH - $navBarH);
    var nowPage = 1;
    var pageSize = 5;

    /* 加载首页 */
    showIndex(nowPage)
    function showIndex(num){
        $.ajax({
            url: "api/gallery.php",
            type: "POST",
            dataType: "json",
            data:{
                page:num
            },
            success: function (array) {
                var data = array.data;
                // console.log(array)
                // console.log(data)
                pageSize = Math.ceil(array.num/24);
                addContent(data)
                renderPages(nowPage)
                // creatContent(data);//动态创建分类内容列表
                // creatNav(data); //动态创建导航内容
                // if(allPage>1){
                //     $(".page-view").show();
                //     creatPage(allPage) //创建分页
                // }
                // changeCurrent(nowPage) //
                // clockNext(allPage)  //allPage:总页数 nowPage：当前页码
            }
        })
    }

    /* 添加内容 */
    function addContent(data){
        $(".gallery-grid ul.goods-list").html("");
        var html = "";
        for(var i=0; i<data.length; i++){
            html += `
                <li class="goods-item">
                    <div class="goods-item-outer">
                        <div class="goods-item-inner">
                            <div class="goods-pic">
                                <img src="images/gallery-store/`+data[i].pic+`.jpg" alt="您的图片跑丢了">
                            </div>
                            <div class="goods-info">
                                <div class="goods-price">
                                    <p class="now"><span>￥</span>`+data[i].price+`</p>
                                    <p class="del"><span>￥</span>`+data[i].oldprice+`</p>
                                </div>
                                <h3 class="goods-name"><a href="#">`+data[i].name+`</a></h3>
                                <div class="tag-box">
                                    <span class="not-self">非自营</span>
                                    <span class="shipping">包邮</span>
                                    <span class="self">自营</span>
                                </div>
                                <div class="btm-box"><a href="#">立即选购</a></div>
                            </div>
                        </div>
                    </div>
                </li>
            `
        }
        $(".gallery-grid ul.goods-list").html(html);
    }

    /* 价格排序 */
    function priceSort(){
        $(".gallery-sortBar .gallery-sort").on("click","A",function(e){
            $(e.target).parent().addClass("active").siblings().removeClass("active");
            if($(e.target).text() == "默认"){
                clickLoad("api/gallery.php")
            }
            if($(e.target).text() == "销量"){
                clickLoad("api/gallerySalesnum.php")
            }
            if($(e.target).text() == "新品"){
                clickLoad("api/galleryNew.php")
            }
            if($(e.target).next().attr("current") === "order"){
                $(e.target).next().attr("current","desc")
                $(e.target).next().removeClass("icon-jiantouarrow505");
                $(e.target).next().addClass("icon-jiantouarrow499")
                clickLoad("api/galleryOrderPrice.php")
            }else if($(e.target).next().attr("current") === "desc"){
                $(e.target).next().attr("current","order")
                $(e.target).next().removeClass("icon-jiantouarrow499")
                $(e.target).next().addClass("icon-jiantouarrow505");
                clickLoad("api/galleryDescPrice.php")
            }
        })
    }
    priceSort()

    /* 按点击需求加载页面 */
    function clickLoad(url){
        $.ajax({
            url: url ,
            type: "POST",
            dataType: "json",
            data:{
                page:1
            },
            success: function (array) {
                var data = array.data;
                pageSize = Math.ceil(array.num/24);
                addContent(data)
                renderPages(nowPage)
            }
       })
    }

    /* 点击价格排序背景切换 */
    function switchBgc(){
        $(".gallery-showmode").on("click","span",function(){
            $(this).toggleClass("active")
        })
    }
    switchBgc()

    /* 左侧品牌区选择区滚轮事件 */
    mouseWheel($rightNavBox.get(0),$rightNavContent)

    function mouseWheel(obj,obj2) {
        var itemH = obj2.children().eq(0).innerHeight()
        var $rightNavContentH = obj2.innerHeight();  //内容高
        var $rightNavContentTop = obj2.position().top; //内容相对父元素的top值


       //判断鼠标滚轮滚动方向
       if (obj.addEventListener)//FF,火狐浏览器会识别该方法
       obj.addEventListener('DOMMouseScroll', wheel, false);
       obj.onmousewheel = obj.onmousewheel = wheel;//W3C
       //统一处理滚轮滚动事件
       function wheel(event){
           var delta = 0;
           if (!event) event = window.event;
           if(event.preventDefault){ //阻止默认行为 防止页面滚动
                event.preventDefault();
           }else{
               e.returnValue = false;
           }
           if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
               delta = event.wheelDelta/120; 
               if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
           } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
               delta = -event.detail/3;
           }
           if (delta)
               handle(delta);
       }

       //上下滚动时的具体处理函数
       function handle(delta) {
           if (delta <0){//向下滚动
               $rightNavContentTop -= itemH
               if($rightNavContentTop <= $rightNavBoxH - $rightNavContentH){
                $rightNavContentTop = $rightNavBoxH - $rightNavContentH
               }
               obj2.css({
                   top : $rightNavContentTop
               })
           }else{//向上滚动
               $rightNavContentTop += itemH
               if($rightNavContentTop > 0){
                $rightNavContentTop = 0
               }
               obj2.css({
                   top : $rightNavContentTop
               })
           }
           //关联右侧滚动条
           $navBar.stop(true).animate({
               top: -$rightNavContentTop / scale
           })
       }
    }

    /* 滚动条拖动事件 */
    function scrollBarMove(){
        $navBar.on("mousedown",function(e){
            $_this = $(this)
            var beginY = e.pageY - $navBar.position().top;  //初始值
            $(document).on("mousemove",function(e){
                //求出移动的距离
                var endY = e.pageY - beginY;
            if(endY < 0){
                endY = 0;
            }else if(endY>=$rightNavBoxH-$navBarH){
                endY=$rightNavBoxH-$navBarH
            }
            $_this.css({top:endY});
            // 内容走的距离 = （内容的长度 - 盒子的长度） \/ (盒子长度 - 滚动条的长度) * 滚动条走的距离
            var content_len = scale * endY;
            $rightNavContent.css({top:-content_len});
            return false;
            })
            $(document).on("mouseup",function(){
                $(document).unbind()
            })
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        })

    }
    scrollBarMove()
    /* 创建分页 */
    function renderPages(currentPage) {
        var html = ""
        $("ul.page-list").html("")
        if(currentPage > 1){ //当前页码为1 禁用上一页
            html +='<li page="'+(currentPage-1)+'">上一页</li>'
        }else{
            html +='<li page="'+currentPage+'" class="forbid">上一页</li>'
        }
        if (currentPage < 5) {
            //显示12345 ... 最后一页
            for (var i = 1; i <= 5; i++) {
                var className = i === currentPage ? 'active' : ''
                html += '<li page="'+i+'" class="'+ className +'">' + i + '</li>'
            }
            html += '<span>...</span><li page="'+pageSize+'">' + pageSize + '</li>'
        }
        if (currentPage >= 5 && currentPage <= pageSize - 4) {
            //显示1...45678 ... 最后一页
            html += '<li>1</li><span>...</span>'
            for (var i = currentPage - 2; i <= currentPage + 2; i++) {
                var className = i === currentPage ? 'active' : ''
                html += '<li page="'+i+'" class="'+ className +'">' + i + '</li>'
            }
            html += '<span>...</span><li page="'+pageSize+'">' + pageSize + '</li>'
        }
        if (currentPage > pageSize - 4) {
            //1 ...  pageSize-4 pageSize-3 pageSize-2 pageSize-1 pageSize
            html += '<li>1</li><span>...</span>'
            for (var i = pageSize - 5; i <= pageSize; i++) {
                var className = i === currentPage ? 'active' : ''
                html += '<li page="'+i+'" class="'+ className +'">' + i + '</li>'
            }
        }
        if(currentPage < pageSize){ //当前页码为1 禁用上一页
            html +='<li page="'+(currentPage+1)+'">下一页</li>'
        }else{
            html +='<li page="'+currentPage+'" class="forbid">下一页</li>'
        }
        $("ul.page-list").html(html)
    }

    /* 点击对应页码请求对应数据 */
    clickPage ("api/gallery.php")
    function clickPage (url){
        $("ul.page-list").on("click", "li", function (e) {
            if(e.target.className !=="active"){
                var cp = +e.target.getAttribute("page")
                
                if($("#price").parent().hasClass("active")){ //判断是否进行价格排序
                    console.log(111)
                    if($("#price").attr("current") === "desc"){
                        url = "api/galleryOrderPrice.php" //更改分页加载时的数据接口
                    }else{
                        url = "api/galleryDescPrice.php"
                    }
                }
                $.ajax({
                    url: url ,
                    type: "POST",
                    dataType: "json",
                    data:{
                        page:cp
                    },
                    success: function (array) {
                        var data = array.data;
                        pageSize = Math.ceil(array.num/24);
                        addContent(data)
                    }
                })
                renderPages(cp)
            }
        })
    }

})(jQuery)