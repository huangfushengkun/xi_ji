function cart() {

    // 点击全选时实现店铺和商品的全选功能
    $(".check-all").on('click', 'i', function () {
        $(this).toggleClass("i-active");
        // 调用点击函数
        var $allSelect = $(".cart-container label i");
        checkboxClick($allSelect, $(this));
        Allprice();
    })

    //点击店铺时实现店铺内的商品选中

    $(".cart-container").on('click', '.shop-name i', function () {
        $(this).toggleClass("i-active");
        // 调用点击函数
        var $shopSelect = $(this).parents(".shop-header").siblings().find("i");
        checkboxClick($shopSelect, $(this));

        //计数，当count等于被勾选店铺的长度时，实现全选
        //遍历每个店铺
        var $singleShop = $(".shop-name i");
        var $shopEle = $(".check-all i");
        counting($singleShop, $shopEle);
        Allprice();
    })

    //提取代码 
    //点击复选框添加类名的函数
    function checkboxClick(obj, ele) {
        if (ele.hasClass("i-active")) {
            obj.addClass("i-active");
        } else {
            obj.removeClass("i-active");

        }
    }

    //单选产品，实现店铺选中和全选；
    $(".cart-container").on('click', '.p-checkbox i', function () {
        $(this).toggleClass("i-active");
        // 遍历每个店铺的单个商品
        var $singleGoods = $(this).parents(".cart-main").children(".goods-list").find("i");
        var $singleEle = $(this).parents(".cart-main").children(".shop-header").find("i")
        counting($singleGoods, $singleEle);

        //遍历每个店铺
        var $singleShop = $(".shop-name i");
        var $shopEle = $(".check-all i");
        counting($singleShop, $shopEle);
        Allprice();
    })

    //提取代码
    //计数的函数
    function counting(obj, ele) {
        var count = 0;
        obj.each(function () {
            if ($(this).hasClass("i-active")) {
                count++
            }
        })
        if (count == obj.length) {
            ele.addClass("i-active");
        } else {
            ele.removeClass("i-active");
        }
    }


    // 计算每个商品的小计
    function subTotal() {
        $(".goods-list").each(function () {
            //获取每个商品的单价
            var singlePrice = parseFloat($(this).find(".single-price").html());
            //获取每个商品的数量
            var goodsNum = parseInt($(this).find(".goods-num").val());
            //获取每个商品的小计
            var sub = (singlePrice * goodsNum).toFixed(2);
            $(this).find(".sub-price").html(sub);
        })
    }
    subTotal()

    // 每个商品数量增减时
    $(".cart-container").on("click", ".btn-add", function () {
        var goodsNum = $(this).prev().val();
        goodsNum++;
        $(this).prev().val(goodsNum);
        // subTotal();
        // Allprice();
        // totalNumber();
        // 发起ajax请求
        var $goodsNum = $(this).prev().val();
        var $goodsID = $(this).prev().data("goodsid")
        $.ajax({
            type: "post",
            url: "api/cartAddReduce.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function () {
                // 请求成功后计算小计，总价钱，总数量和选中的数量
                subTotal();
                Allprice();
                totalNumber();
            }
        })
    })
    $(".cart-container").on("click", ".btn-reduce", function () {
        var goodsNum = $(this).next().val();
        goodsNum--;
        if (goodsNum == 0) {
            goodsNum = 1
        }
        $(this).next().val(goodsNum);
        // subTotal();
        // Allprice();
        // totalNumber();
        // 发起ajax请求
        var $goodsNum = $(this).next().val();
        var $goodsID = $(this).next().data("goodsid")
        $.ajax({
            type: "post",
            url: "api/cartAddReduce.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function () {
                // 请求成功后计算小计，总价钱，总数量和选中的数量
                subTotal();
                Allprice();
                totalNumber();
            }
        })
    })

    //计算总价钱和选中的数量
    function Allprice() {
        var totalPrice = 0;
        var selectNum = 0
        $(".p-checkbox .i-active").each(function () {
            // 获取选中的小计,计算总价钱
            var subPrice = $(this).parents(".goods-list").find(".sub-price").html()
            var priceNum = parseFloat(subPrice);
            totalPrice += priceNum;
            totalPrice.toFixed(2);

            //计算选中的数量
            var currentNum = $(this).parents(".goods-list").find(".goods-num").val();
            var goodsNum = parseInt(currentNum);
            selectNum += goodsNum;
        })
        $(".total-price").html(totalPrice);
        $(".select-total span").html(selectNum);
    }
    Allprice()

    // 计算商品的总数量
    function totalNumber() {
        var totalNum = 0;
        $(".goods-num").each(function () {
            var singleGoodsNum = $(this).val();
            var toNum = parseInt(singleGoodsNum)
            totalNum += toNum;
        })
        $(".item-total span").html(totalNum);
        $(".header .minicart strong").html(totalNum);
    }
    totalNumber()

    //删除指定的商品
    $(".cart-container").on("click", ".btn-delete", function () {
        var $cartMainLength = $(this).parents(".cart-container").children(".cart-main").length;
        var $goodsListLength = $(this).parents(".cart-main").children(".goods-list").length
        if ($cartMainLength == 1 && $goodsListLength == 1) {
            $(this).parents(".cart-container").remove();
            $(".cart-empty").show()
        }
        if ($goodsListLength == 1) {
            $(this).parents(".cart-main").remove();
        }
        $(this).parents(".goods-list").remove();
        // Allprice();
        // totalNumber();
        // 获取点击删除商品的id
        var $delData = $(this).data("goodsid");
        // 点击删除键的时候发起ajax请求删除后台数据
        $.ajax({
            type: "post",
            url: "api/delCart.php",
            data: "delData=" + $delData,
            success: function () {
                // 请求成功后计算总价钱，总数量和选中的数量
                Allprice();
                totalNumber();
            }
        })
    })
    //删除选中的商品
    $(".cart-container").on("click", ".delete-select", function () {

        var delSelectGoods = [];
        $(".p-checkbox .i-active").each(function () {
            var $dSelectGoodsId = $(this).parents(".goods-list").find(".btn-delete").data("goodsid");
            // 把勾选商品的id放入数组内
            delSelectGoods.push($dSelectGoodsId);
            if ($(this).parents(".cart-main").children(".goods-list").length == 1) {
                $(this).parents(".cart-main").remove();
            }
            $(this).parents(".goods-list").remove();
        })
        if ($(this).parents(".cart-container").children(".cart-main").length == 0) {
            $(this).parents(".cart-container").remove();
            $(".cart-empty").show();
        }
        // Allprice();
        // totalNumber();
        // 发起ajax请求，把delSelectGoods数组传到后端遍历
        $.ajax({
            type: "post",
            url: "api/cartDelSelect.php",
            data: {
                selectId: delSelectGoods
            },
            success: function () {
                // 请求成功后计算总价钱，总数量和选中的数量
                Allprice();
                totalNumber();
            }
        })
    });



    // 加载购物车的时候请求后台购物车的数据
    
    ;(function () {
        var user = getCookie("user");
        var signin = $(".header .inner-wrap .header-right .login-wrap .small-signin");
        var member = $(".header .inner-wrap .header-right .login-wrap .small-member");
        if (user) {
            signin.hide();
            member.show();
            $(".username").text(user);
            $.ajax({
                type: "post",
                url: "api/cart.php",
                dataType: "json",
                success: function (data) {
                    $("body,html").show();
                    if (data.success) {
                        $(".cart-container").addClass("cart-active")
                        var shopArr = [];
                        //遍历把所有的店铺名字放入到数组里
                        $.each(data.list, function (index, val) {
                            if (shopArr.indexOf(val.shopName) == -1) {
                                shopArr.push(val.shopName)
                            }
                        })
                        //创建商品列表
                        $.each(shopArr, function (a, b) {
                            $cartShopNode = $('<div class="cart-main cart-main' + a + '"><div class="shop-header"><div class="shop-name"><label><input type="checkbox" class="select-country" name="select-country"><i></i></label><span>' + b + '</span></div><a href="#" class="more-goods">同仓凑单<span>></span></a></div></div>');
                            $(".cart-header").after($cartShopNode);
                            $.each(data.list, function (index, val) {
                                if (val.shopName == b) {
                                    $cartGoodsNode = $(`<div class="goods-list">
                                    <ul class="clearfix">
                                        <li class="p-checkbox">
                                            <label>
                                                <input type="checkbox" class="select-country" name="select-country">
                                                <i></i>
                                            </label>
                                        </li>
                                        <li class="p-pic">
                                            <a href="#"><img src="./images/cart/` + val.img + `" alt=""></a>
                                        </li>
                                        <li class="p-info">
                                            <div class="p-title">
                                                <img src="./images/cart/cart_icon.png" alt="">
                                                <span>西集自营</span><br>
                                                <a href="#">` + val.details + `</a>
                                            </div>
                                            <div class="label-style clearfix">
                                                ` + val.sevenDay + `
                                            </div>
                                        </li>
                                        <li class="p-spec">
                                            <p>` + val.sizeColor + `</p>
                                        </li>
                                        <li class="p-price">￥<span class="single-price">` + val.price + `</span></li>
                                        <li class="p-quantity clearfix">
                                            <p class="btn-reduce">-</p>
                                            <input type="text" value="` + val.number + `" class="goods-num" data-goodsid="` + val.Id + `">
                                            <p class="btn-add">+</p>
                                        </li>
                                        <li class="subtotal">￥<span class="sub-price">159.00</span></li>
                                        <li class="p-action">
                                            <p>移入我的关注</p>
                                            <a href="javascript:void(0);" class="btn-delete" data-goodsid="` + val.Id + `">删除</a>
                                        </li>
                                    </ul>
                                </div>`)
                                    $(".cart-main" + a).append($cartGoodsNode)
                                }
                            })
                        })
                    } else {
                        $(".cart-empty").addClass("cart-active")
                        $(".minicart strong").html(0);
                    }

                    //数据请求过来后  计算商品的总数量h和小计
                    totalNumber();
                    subTotal();
                }
            })
        }else{
            $("body,html").show();
            $(".cart-empty").addClass("cart-active")
            $(".minicart strong").html(0);
        }

    })()
}
cart()