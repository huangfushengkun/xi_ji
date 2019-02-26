var autoloop = (function () {
  init
  var i = 0;
  var timer;
  // tab切换初始样式
  function init(obj, obj1, obj2) {
    $(obj)
      .hide()
      .first()
      .show();
    $(obj1)
      .eq(0)
      .addClass(obj2);
  }
  //tab hover 切换样式
  function tabToggle(obj, obj1, obj2) {
    $(obj1).hover(
      function () {
        var index = $(this).index();
        $(obj)
          .eq(index)
          .show()
          .siblings()
          .hide();
        $(this)
          .addClass(obj2)
          .siblings()
          .removeClass(obj2);
      },
      function () {
      }
    );
  }
  //轮播初始样式
  function xiu() {
    $(".holderList ul").eq(0).show(800).siblings().hide(800);
    /*第一张图片显示，其余图片的隐藏*/
    ShowTime();/*调用函数*/
    $(".prev").click(function () {
      clearInterval(timer);
      if (i == 0) {
        i = 2;
      }
      i--;
      Show();
      ShowTime();
    });
    $(".next").click(function () {
      clearInterval(timer);
      if (i == 2) {
        i = -1;
      }
      i++;
      Show();
      ShowTime();
    });
  }
  //显示元素
  function Show() {
    $(".holderList ul").eq(i).fadeIn(175).siblings().fadeOut(175);/*当前页面显示其余隐，渐变效果*/
  }
  //循环调用
  function ShowTime() {
    /*方法：setInterval(function(){},time)
    间隔多长时间执行一个事件*/
    timer = setInterval(function () {
      i++;
      if (i == 2) {
        i = 0;/*如果i=2,i的值返回0*/
      }
      Show();/*函数的调用*/
    }, 4000);/*4秒一变*/
  }
  //鼠标经过事件
  function onmouseenter() {
    $(".holder").hover(
      function () {
        clearInterval(timer);//清除轮播
      },
      function () {
        ShowTime();
      }
    )
  }
  return {
    init:init,
    tabToggle:tabToggle,
    xiu: xiu,
    onmouseenter: onmouseenter
  }
})()
autoloop.init(
  ".xj-top10pro .contents-box .contents-box-inner",
  ".xj-top10pro .tab-box ul li",
  "active"
);
autoloop.init(
  ".store-box .contents-box .shop-content",
  ".store-box .tab-box ul li",
  "act"
);
autoloop.tabToggle(
  ".xj-top10pro .contents-box .contents-box-inner",
  ".xj-top10pro .tab-box ul li",
  "active"
);
autoloop.tabToggle(
  ".store-box .contents-box .shop-content",
  ".store-box .tab-box ul li",
  "act"
);
autoloop.xiu();
autoloop.onmouseenter();
// 懒加载
(function(){
    $("img").lazyload({
        threshold : 200,
        effect : "fadeIn"
     });
})();