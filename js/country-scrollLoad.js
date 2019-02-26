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
                                imgstr="<img src='images/group/grey.gif' data-original='images/group/"+dataStr+"' alt='"+listData[i].tit+"'>",
                                $price="￥"+listData[i].price;
                                $(".goods-img a").eq(i).html(imgstr);
                                $(".tit a").eq(i).text(listData[i].tit);
                                $(".price").eq(i).text($price); 
                        }
                        flag = true;
                        page++;
                        (function(){
                        $(".country-block img").lazyload({
                                    threshold : 300,
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