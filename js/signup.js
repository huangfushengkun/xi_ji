var signup = (function () {
    // 点击ipt框样式
    function ipt() {
        // 用户名
        $('.user-label').click(function () {
            $('.user-label').addClass('focus');
            $('.x-ipt').focus();
            $('.x-ipt').css({
                border: "1px solid #EB5A41"
            })
        });
        $(' .x-ipt').click(function () {
            $('.user-label').addClass('focus');
            $('.x-ipt').css({
                border: "1px solid #EB5A41"
            });
        });
        //密码框
        $('.label1').click(function () {
            $('.label1').addClass('focus');
            $('.pw1').focus();
            $('.pw1').css({
                border: "1px solid #EB5A41"
            })
        })
        $(' .pw1').click(function () {
            $('.label1').addClass('focus');
            $('.pw1').css({
                border: "1px solid #EB5A41"
            });
        });
        //确认密码框
        $('.label2').click(function () {
            $('.label2').addClass('focus');
            $('.pw2').focus();
            $('.pw2').css({
                border: "1px solid #EB5A41"
            })
        })
        $(' .pw2').click(function () {
            $('.label2').addClass('focus');
            $('.pw2').css({
                border: "1px solid #EB5A41"
            });
        });
        //短信验证框
        $('.send-label').click(function () {
            $('.send-label').addClass('focus');
            $('.send-ipt').focus();
            $('.send-ipt').css({
                border: "1px solid #EB5A41"
            })
        });
        $(' .send-ipt').click(function () {
            $('.send-label').addClass('focus');
            $('.send-ipt').css({
                border: "1px solid #EB5A41"
            });
        });
    }

    function userBlur() {
        //用户名失去焦点时
        $(' .x-ipt').blur(function () {
            val = $(this).val();
            if (val == '') {

                $(this).css({
                    border: "1px solid #a3a3a3"
                });
                // $(".user-err").hide();
            } else {
                // $('.form-label').addClass('focus');
                $(this).css({
                    border: "1px solid #EB5A41"
                })
            }
            if (!/^1\d{10}$/.test(val)) {
                if (val == '') {
                    $('.form-label').removeClass('focus');
                    $(".user-err").hide();
                } else {
                    $(" .user-err").show();
                }

            } else {
                $(" .user-err").hide();
            }
        })
        //短信验证框失去焦点时
        $('.send-ipt').blur(function () {
            val = $(this).val();
            if (val != '') {
                $(this).css({
                    border: "1px solid #EB5A41"
                });
            } else {
                $(this).css({
                    border: "1px solid #a3a3a3"
                })
            }
        })
        //密码框失去焦点时
        function pwd(obj) {
            $(obj).blur(function () {
                pwd = $(this).val();
                if (pwd != '') {
                    $(this).css({
                        border: "1px solid #EB5A41"
                    });
                } else {
                    $(this).css({
                        border: "1px solid #a3a3a3"
                    })
                }
                if (!/^\w{6,20}/.test(pwd)) {
                    if (pwd == '') {
                        $('.form-label').removeClass('focus');
                    } else {
                        $('.form-label').addClass('focus');
                        $(' .pwd-err').show();
                    }
                } else if (pwd == '') {
                    $(' .pwd-err').show();
                } else {
                    $(' .pwd-err').hide();

                }


            })
        }
        pwd(".pw1");
        pwd(".pw2");
        $(".login-box").on("click", function (e) {
            e.preventDefault();
            var userVal = $('.user').val();
            var val1 = $(".pw1").val();
            var val2 = $(".pw2").val();

            if (val1 == val2) {
                $.ajax({
                    type: "post",
                    url: "api/signin.php",
                    data: {
                        user: userVal,
                        pwd: $(".pwd").val()
                    },
                    datatype: "json",
                    success: function (data) {
                        var data = JSON.parse(data);
                        if (data.code == 1) {
                            //注册失败
                            $(".pwd-err").show();
                        } else {
                            // 注册成功
                            window.location.href="passport-login.html";
                        }

                    }
                })
            } else {
                // $(".pwd-err").show();
            }
        })
    }
    return {
        ipt: ipt,
        userBlur: userBlur,
    }
})()
signup.ipt();
signup.userBlur();