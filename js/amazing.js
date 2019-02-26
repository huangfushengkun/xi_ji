    
    

    /* 初始化样式 */
    var nowPage = 1;
    var pageSize = 5;
    var $rightNavContent = $(".right-nav-content-list")
    var $rightNavContentH = $(".right-nav-content-list").innerHeight()
    var $rightNavBoxH = $(".right-nav-content").innerHeight()
    navShow();
    showIndex(nowPage);

    /* 加载首页 */
    function showIndex (num){
        $.ajax({
            url: "api/amaShowOne.php",
            type: "POST",
            dataType: "json",
            data:{
                page:num
            },
            success: function (array) {
                var data = array.data;
                pageSize = Math.ceil(array.num/20);
                creatContent(data);//动态创建分类内容列表
                creatNav(data); //动态创建导航内容
                if(pageSize>1){
                    $(".page-view").show();
                    // creatPage(pageSize) //创建分页
                    renderPages(nowPage)
                }
                // changeCurrent(nowPage) //
                // clockNext(pageSize)  //pageSize:总页数 nowPage：当前页码
            }
        })
    }
    /* 处理加载返回的数据 */
    function dealDat(){

    }
    /* 显示隐藏楼层导航 */
    function navShow(){
        if($("body,html").scrollTop()>215){
            $("#right-nav, .go-top").show()
        }else{
            $("#right-nav, .go-top").hide()
        }
    }

    /* 监听点击索引滚动内容 */
    function contentModule(){
        var ul = $(".right-nav-content ul").get(0);
        var Lis = ul.children;
        /* 监听点击 */
        $(".right-nav-content-list").on("click","span",function(e){
            var $ele = $(e.target).parents("li")
            $ele.addClass("active");
            $("body,html").scrollTop( $ele.index() * ($(".content-block").outerHeight(true)) + $(".main-box").offset().top)
        })
            // 4.监听滚动
        window.onscroll = function () {
            // 4.1 获取滚动产生的高度
            var roll = Math.ceil(scroll().top);
            // 4.2 遍历
            for (var i = 0; i < Lis.length; i++) {
                // 4.3 判断

                if (roll >= $(".main-box").children().eq(i).offset().top) {
                    // console.log($(".main-box").children().eq(i))
                    for (var j = 0; j < Lis.length; j++) {
                        Lis[j].className = "";
                    }

                    Lis[i].className = "active";
                }
            }
            navShow();
            listenNav ()


        }
    }
    contentModule()

    /* ajax动态加载 */
    $(".holder ul").on("click", "I", function (e) {
        $(e.target).parents("li").addClass("active").siblings().removeClass("active");
        $.ajax({
            url: "api/amaShowAll.php",
            type: "POST",
            dataType: "json",
            data: {
                type: $(e.target).parents("li").index(),
            },
            success: function (data) {
                // var data = array.data;
                // console.log(data)
                creatContent(data);//动态创建分类内容列表
                creatNav(data); //动态创建导航内容
                $(".page-view").hide();
            }
        })

    })

    /* 动态创建分类内容列表 */
        function creatContent(data) {
            $(".main-box").html("");
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += `
                                <div class="content-block">
                                <div class="content-inner" style="background:url(images/amazi/` + data[i].bg + `) no-repeat">
                                    <div class="text-box">
                                        <div class="logo-box" style="background:url(images/amazi/` + data[i].logo + `) no-repeat;background-size: auto 60px;"></div>
                                        <p class="tit">
                                            <a href="javascript:void(0);">` + data[i].tittle + `</a>
                                        </p>
                                        <p class="txt">
                                            <a href="javascript:void(0);">` + data[i].text + `</a>
                                        </p>
                                        <a href="javascript:void(0);" class="buy-btn">进入专场</a>
                                        <div class="list-box">
                                            <ul class="clearfix">
                                                <li>
                                                    <a href="javascript:void(0);"><img src="images/amazi/` + data[i]["list-bg01"] + `" alt=""></a>
                                                    <div class="list-title">
                                                        <a href="javascript:void(0);">` + data[i]['list-txt01'] + `</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"><img src="images/amazi/` + data[i]['list-bg02'] + `" alt=""></a>
                                                    <div class="list-title"><a href="javascript:void(0);">` + data[i]['list-txt02'] + `</a></div>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"><img src="images/amazi/` + data[i]['list-bg03'] + `" alt=""></a>
                                                    <div class="list-title"><a href="javascript:void(0);">` + data[i]['list-txt03'] + `</a></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="video-box">
                                        <a href="javascript:void(0);"></a>
                                    </div>
                                </div>
                                <div class="content-bottom">
                                    <a href="javascript:void(0);">` + data[i].name + `</a>
                                </div>
                            </div>
                                `

            }
            $(".main-box").html(html);
        }

    /* 动态创建导航内容 */
        function creatNav(data) {
            $(".right-nav-content-list").html("")
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += `
                        <li>
                            <a href="javascript:void(0);">
                                <span>` + data[i].name + `</span>
                                <span class="line"></span>
                            </a>
                        </li>
                    `
                $(".right-nav-content-list").html(html)
            }
        }
    /* 创建分页 */
    function renderPages(currentPage) {
        var html = ""
        $("ul.page-list").html("")
        if(currentPage > 1){ //当前页码为1 禁用上一页
            html +='<li page="'+(currentPage-1)+'">上一页</li>'
        }else{
            html +='<li page="'+currentPage+'" class="forbid">上一页</li>'
        }
        if (currentPage < 5 && pageSize<=5) {
            //显示12345 ... 最后一页
            for (var i = 1; i <= pageSize; i++) {
                var className = i === currentPage ? 'active' : ''
                html += '<li page="'+i+'" class="'+ className +'">' + i + '</li>'
            }
            // html += '<span>...</span><li page="'+pageSize+'">' + pageSize + '</li>'
        }
        if (currentPage < 5 && pageSize>5) {
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
        if (currentPage >= 5 && currentPage > pageSize - 4) {
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
    clickPage ("api/amaShowOne.php")
    function clickPage (url){
        $("ul.page-list").on("click", "li", function (e) {
            if(e.target.className !=="active"){
                var cp = +e.target.getAttribute("page")
                $.ajax({
                    url: url ,
                    type: "POST",
                    dataType: "json",
                    data:{
                        page:cp
                    },
                    success: function (array) {
                        var data = array.data;
                        pageSize = Math.ceil(array.num/20);
                        /* 添加数据 */
                        creatContent(data)
                    }
                })
                renderPages(cp)
            }
        })
    }

    /* 监听右侧导航的位置 */
    var $navBar = $(".right-nav-scrollbar")
    var $navBarH = $navBar.innerHeight()
    var itemH = 32
    // var ContentTop = $rightNavContent.position().top; //内容相对父元素的top值
    var scale = ($rightNavContentH - $rightNavBoxH) / ($rightNavBoxH - $navBarH)
    function listenNav (){
        var $index = $rightNavContent.children(".active").index()
        // console.log($index)
        if($index >= 6 && $index < 13){
        // console.log($index , "11")

            $rightNavContent.stop(true).animate({
                top:(6- $index) * itemH
            },function(){
                $navBar.stop(true).animate({
                    top: ($index-6) * itemH / scale
                })
            }) 
            // console.log(scale)
            
            
        }
    }
    /* 鼠标滚轮事件 */
        
    mouseWheel($("#right-nav").get(0),$rightNavContent)

    function mouseWheel(obj,obj2) {
    var ContentTop = $rightNavContent.position().top; //内容相对父元素的top值

        // var itemH = obj2.children().eq(0).innerHeight()
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
               ContentTop -= itemH
               if(ContentTop <= $rightNavBoxH - obj2.innerHeight()){
                ContentTop = $rightNavBoxH - obj2.innerHeight()
               }
               obj2.css({
                   top : ContentTop
               })
           }else{//向上滚动
               ContentTop += itemH
               if(ContentTop > 0){
                ContentTop = 0
               }
               obj2.css({
                   top : ContentTop
               })
           }
           //关联右侧滚动条
           $navBar.stop(true).animate({
               top: -ContentTop / scale
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
            console.log(endY)
            $_this.css({top:endY});
            // 内容走的距离 = （内容的长度 - 盒子的长度） \/ (盒子长度 - 滚动条的长度) * 滚动条走的距离
            var content_len = scale * endY;
            console.log(content_len , scale , endY)
            $rightNavContent.css({top: - content_len});
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

     /* 返回顶部 */
     function goTop(){
        $(".go-top").on("click",function(){
            $("html,body").animate({
                scrollTop:0
            },function(){
                $(".go-top").hide()
            })
        })
    }
    goTop()

    /* 监听侧导航位置 */
    navPosition()
    function navPosition(){
        $(window).scroll(function(){

            if($("body,html").scrollTop() + $(window).height() >= $("#page-nav").offset().top +210 ) {
                console.log(2245)
                $("#right-nav").css({
                    position : "absolute",
                    bottom :50 ,
                    right: 10
                })
            }else{
                $("#right-nav").css({
                    position : "fixed",
                    bottom :250,
                    right:10
                })
            }
            if($("body,html").scrollTop() + $(window).height() >= $("#page-nav").offset().top){
                $(".go-top").css({
                    position : "absolute",
                    bottom :0 ,
                    right:10
                })
            }else{
                $(".go-top").css({
                    position : "fixed",
                    bottom :10 ,
                    // right:10
                })
            }
         })

        $("#page-nav").offset().top
        console.log($("#page-nav").offset().top)

        
        $(window).height()
        // console.log($(window).height())
    
    }
    
    

