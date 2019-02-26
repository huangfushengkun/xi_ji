var productsFn = (function() {
  // tab切换初始样式
  /**
   * obj---跟随tab切换要的内容
   * obj1---触发的元素tab
   * obj2---添加样式的类名
   **/
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
      function() {
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
      function() {}
    );
  }
  /**
   * obj---tab选项
   * obj1--tab选项展示的内容
   * obj2--tab选项改变的类名
   *
   **/
  function tabToggleClick(obj, obj1, obj2) {
    $(obj).click(function() {
      var index = $(this).index();
      $(this)
        .siblings()
        .children("div")
        .children("span")
        .removeClass(obj2);
      $(obj1)
        .eq(index)
        .show()
        .siblings()
        .hide();
      $(this)
        .children("div")
        .children("span")
        .addClass(obj2);
    });
  }
  /**
   * num加减
   * obj--控制商品件数
   * obj1-点击加
   * obj2--点击减
   **/
  function add(obj, obj1, obj2) {
    var $n = $(obj).val();
    //数量加操作
    $(obj1).click(function() {
      $n++;
      if ($n >= 7) {
        $n = 7;
      }
      $(obj).val($n);
    });
    // 数量减操作
    $(obj2).click(function() {
      $n--;
      if ($n <= 1) {
        $n = 1;
      }
      $(obj).val($n);
    });
  }
  //商品放大镜
  function big_img() {
    var main_img = $(".product-album-pic .small-pic"), //商品展示的大图
      hover = $(".product-album-pic .thumbnail-list ul"), //商品缩略图的ul
      hover_img = $(".product-album-pic .thumbnail-list ul img"), //商品缩略图的ul 下的img
      img_block = $(".product-album-pic .album-zooms-handle"), //放大悬浮块
      img_big = $(".product-side .album-zooms-container img"), //放大图块下的img
      img_box = $(".product-side"), //商品展示图的大盒子
      left_l = img_box.offset().left + 250,
      top_l = img_box.offset().top + 250;
    hover_img.mouseenter(function() {
      //current商品缩略图的ul 下的li
      hover_img.parent().removeClass("current");
      $(this)
        .parent()
        .addClass("current");
      var src = $(this).attr("src");
      main_img.attr("src", src);
    });
    img_box
      .mousemove(function(e) {
        if (e.pageX <= left_l) {
          e.pageX = left_l;
        }
        if (e.pageX >= left_l + 250) {
          e.pageX = left_l + 250;
        }
        if (e.pageY <= top_l) {
          e.pageY = top_l;
        }
        if (e.pageY >= top_l + 250) {
          e.pageY = top_l + 250;
        }
        var src = hover
          .children(".current")
          .children("img")
          .attr("src");
        img_block.css({
          display: "block",
          left: e.pageX - left_l,
          top: e.pageY - top_l
        });
        img_big.parent().css("display", "block");
        img_big.attr("src", src);
        img_big.css({
          left: -1.1 * (e.pageX - left_l),
          top: -1.1 * (e.pageY - top_l)
        });
        img_big.css("display", "block");
      })
      .mouseout(function(e) {
        img_block.css("display", "none");
        img_big.parent().css("display", "none");
      });
  }
  /**
  * 数据请求
  ***/
  function reuqesPost() {
    // window.onscroll=function(){
    var otherShopTop = $(".product-content-block").offset().top,
        body_L = $(".product-content-block").offset().left,
        /*其他商品盒子距离body左边的距离*/
        box_L = $(".product-section-right").width(),
        /*其他商品左侧的width*/
        boxWidth = $(".product-content-block").width(),
        /*其他商品盒子总宽度*/
        val_L = Math.ceil(boxWidth - box_L + body_L);
        var winScrollTop;

          window.addEventListener("scroll",function(){
            winScrollTop =  document.body.scrollTop || document.documentElement.scrollTop || window.pageYoffset;
             if (winScrollTop - otherShopTop >-600){
            xhr_ajax();
          }
          })
       
    function xhr_ajax() {
      var page = 0;
     function handlerJsonp(data) {
        console.log(data); 
      };
      function strHtml(data1, data2, data3) {
        var infoHtml = " ",
          aboutHtml = " ",
          hotHtml = " ";
        for (var i = 0; i < data1.length; i++) {
          aboutHtml +=
            '<li><div class="img-box" dataId="'+data1[i].Id+'"><a href="" title="' +
            data1[i].tit +
            '" target="_blank"><img src="images/group/' +
            data1[i].url +
            '" alt="' +
            data1[i].tit +
            '"></a></div><div class="cont-tit-box"><a href="" title="' +
            data1[i].tit +
            '" target="_blank"><img src="images/group/4ed9fd6583b7460a08701d1e1abbb422c2ed9bb8.png" alt="' +
            data1[i].tit +
            '"> ' +
            data1[i].tit +
            '</a></div><div class="price-box">￥' +
            data1[i].price +
            "<span>￥" +
            data1[i].newprice +
            "</span></div></li>";
          hotHtml +=
            '<li><div class="img-box" dataId="'+data2[i].Id+'"><a href="" title="' +
            data2[i].tit +
            '" target="_blank"><img src="images/group/' +
            data2[i].url +
            '" alt="' +
            data2[i].tit +
            '"></a></div><div class="cont-tit-box"><a href="" title="' +
            data2[i].tit +
            '" target="_blank"><img src="images/group/4ed9fd6583b7460a08701d1e1abbb422c2ed9bb8.png" alt="' +
            data2[i].tit +
            '"> ' +
            data2[i].tit +
            '</a></div><div class="price-box">￥' +
            data2[i].price +
            "<span>￥" +
            data2[i].newprice +
            "</span></div></li>";
          $(".xj-pro-gallery")
            .eq(0)
            .children("ul")
            .html(aboutHtml);
          $(".xj-pro-gallery")
            .eq(1)
            .children("ul")
            .html(hotHtml);
        }
        infoHtml +=
          data3[0].url + data3[0].price + data3[0].tit + data3[0].newprice;
        $(".detail-content")
          .children("div")
          .html(infoHtml);
      }
      $.ajax({
        type: "get",
        url: "api/product.php",
        data: {
          page: page
        },
        jsonpCallback: "handlerJsonp",
        dataType: "jsonp",
        success: function(data) {
          var abuotShop = [],
            hotShop = [],
            shopInfo = [],
            n = 0,
            m = 0,
            len = data.length;
            for (var i = 0; i < len; i++) {
              if (data[i]["pid"] == 0) {
                abuotShop[i] = data[i];
              } else if (data[i]["pid"] == 1) {
                hotShop[n] = data[i];
                n++;
              } else if (data[i]["pid"] == 2) {
                shopInfo[m] = data[i];
                m++;
              }
            }
          strHtml(abuotShop, hotShop, shopInfo);
        },
        error:function(err){console.log(err)}
      });
    }
  }
  return {
    init: init,
    tabToggle: tabToggle,
    tabToggleClick: tabToggleClick,
    add: add,
    big_img: big_img,
    reuqesPost:reuqesPost
  };
})();

productsFn.init(".pro-box-btm .xj-pro-gallery", ".xj-pro-list ul li", "active");
productsFn.tabToggle(
  ".pro-box-btm .xj-pro-gallery",
  ".xj-pro-list ul li",
  "active"
);
productsFn.init(
  ".xj-product_section-inner .articleBlock",
  ".tabStyle ul .tab-link",
  "actived"
);
productsFn.tabToggle(
  ".xj-product_section-inner .articleBlock",
  ".tabStyle ul .tab-link",
  "actived"
);
productsFn.tabToggleClick(
  ".comment_radioBox ul li",
  ".comment_productInfo .tack",
  "xjExform-checked"
);
productsFn.add(".action-quantity-input", ".btn-increase", ".btn-decrease");
productsFn.big_img();
productsFn.reuqesPost();

var hide=(function(){
    /*其他商品触顶显示*/
    function flexTop() {
      var otherShopTop = $(".product-content-block").offset().top;
      window.onscroll = function() {
        var winScrollTop = $(window).scrollTop(),
          /*获取滚动距离文档顶部的距离*/
          body_L = $(".product-content-block").offset().left,
          /*其他商品盒子距离body左边的距离*/
          box_L = $(".product-section-right").width(),
          /*其他商品左侧的width*/
          boxWidth = $(".product-content-block").width(),
          /*其他商品盒子总宽度*/
          val_L = Math.ceil(boxWidth - box_L + body_L);
        if (winScrollTop - otherShopTop > 0) {
          showIn(val_L);
        } else {
          hidenOut();
        }
      };
  
      function showIn(obj) {
        $(".product-section-right .tabStyle").css({
          position: "fixed",
          top: 0,
          left: obj
        });
        $(".tabStyle .pro-tabs li").css({
          borderLeft: "1px solid #E8E8E8"
        });
        $(".tab-cat").show();
      }
  
      function hidenOut() {
        $(".product-section-right .tabStyle").css({
          position: "static",
          top: 0,
          left: 0
        });
        $(".tab-cat").hide();
      }
    }
    return {
      flexTop:flexTop
    }
})()
hide.flexTop();


