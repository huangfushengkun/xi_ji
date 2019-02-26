// 西集好物轮播
function loop(obj1,obj2,obj3){
    obj3.click(function(){
        obj2.animate({marginLeft:-182*3},1000);
    })
    obj1.click(function(){
        obj2.stop(true,true).animate({marginLeft:0},1000);
    })

}
loop($('.goods-box1 .prev'),$('.goods-box1 .holder ul'),$('.goods-box1 .next'));
loop($('.goods-box2 .prev'),$('.goods-box2 .holder ul'),$('.goods-box2 .next'));
loop($('.goods-box3 .prev'),$('.goods-box3 .holder ul'),$('.goods-box3 .next'));
loop($('.goods-box4 .prev'),$('.goods-box4 .holder ul'),$('.goods-box4 .next'));