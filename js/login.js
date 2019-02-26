var login = (function () {
    // 切换登陆方式
    function loginTab() {
        $('.pro-box-btm').children().eq(0).show();
        $('.tab-link').click(function () {
            $(this).addClass('active').show().siblings().removeClass('active');
            $('.pro-box-btm').children().eq($(this).index()).show().siblings().hide();
        })
    }
    //点击input框的样式
    function ipt() {
        // 用户名框
        $('.user-label').click(function () {
            $('.user-label').addClass('focus');
            $('.x-ipt').focus();
            $('.x-ipt').css({
                border: "1px solid #EB5A41"
            })
        })
        $(' .x-ipt').click(function () {
            $('.user-label').addClass('focus');
            $('.x-ipt').css({
                border: "1px solid #EB5A41"
            });
        })
        //密码框
        $('.pwd-label').click(function () {
            $('.pwd-label').addClass('focus');
            $('.pwd-ipt').focus();
            $('.pwd-ipt').css({
                border: "1px solid #EB5A41"
            })
        })
        $(' .pwd-ipt').click(function () {
            $('.pwd-label').addClass('focus');
            $('.pwd-ipt').css({
                border: "1px solid #EB5A41"
            });
        })
    }
    // 失去输入焦点时验证格式有效性
    function blur() {
        // 用户名框失去焦点
        $(' .x-ipt').blur(function () {
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
            if (!/^1\d{10}$/.test(val)) {
                if (val == '') {
                    $('.form-label').removeClass('focus');
                } else {
                    $('.form-label').addClass('focus');
                    $(" .user-err").show();
                }

            } else {
                $(" .user-err").hide();
            }
        })
        // 密码框失去焦点
        $('.pwd-ipt').blur(function () {
            pwd = $(this).val();
            if (val != '') {
                $(this).css({
                    border: "1px solid #EB5A41"
                });
            } else {
                $(this).css({
                    border: "1px solid #a3a3a3"
                })
            }
            // console.log(pwd);
            if (!/^.{6,20}/.test(pwd)) {
                if (pwd == '') {
                    $('.form-label').removeClass('focus');
                } else {
                    $('.form-label').addClass('focus');
                    $(' .pwd-err').show();
                }

            } else {
                $(' .pwd-err').hide();
            }
        })
        //    单击登陆时验证信息
        $('.login-box').click(function () {
            var userVal = $('.pro-box-btm .user').val();
            var isChecked = $(".login-box .auto-login").prop("checked");
            if (val != '' && pwd != '') {
                $.ajax({
                    type: "post",
                    url: "api/checkpw.php",
                    data: {
                        user: userVal,
                        pwd: $('.pro-box-btm .pwd').val()
                    },
                    datatype: 'json',
                    success: function (data) {
                        // console.log(typeof data);
                        var data = JSON.parse(data);
                        // console.log(data.code);
                        if (data.code == 1) {
                            $('.login-err').show();
                        } else {
                            // 登陆成功
                            window.location.href="index.html";

                            //显示用户名
                            // console.log(1);

                            var signin = $(".header .inner-wrap .header-right .login-wrap .small-signin");
                            var member= $(".header .inner-wrap .header-right .login-wrap .small-member");
                            signin.hide();
                            member.show();

                            //创建cookie
                            if (isChecked) {
                                setCookie("user", userVal, 14);
                            } else {
                                setCookie("user", userVal);
                            };
                            // checkCookie();
                        }
                    }
                })
            } else {
                // $('.pwd-ipt').after("<span>&nbsp;!&nbsp;用户名或密码错误</span>")
            }
        })
    }
    //短信倒计时
    function send() {
        var numbers = /^1\d{10}$/;
        var val = $('.x-ipt').val().replace(/\s+/g, ""); //获取输入的手机号   \s 为空白符 + 至少出现一次
        if ($('.btn-caution').find('span').length == 0 && $('.btn-caution a').attr('class') == 'send') {
            if (!numbers.test(val) || val.length == 0) {
                $(".user-err").show(); //提示错误信息
                // $('.btn-caution').append('<span class="error">手机格式错误</span>');
                return false;
            }
        }
        // 倒计时
        $('.btn-caution a').click(function () {
            if (numbers.test(val)) {
                var time = 60;
                $(".user-err").hide();
                // $('.btn-caution span').remove();

                function timeCountDown() {
                    if (time == 0) {
                        clearInterval(timer);
                        $('.btn-caution a').addClass('send1').removeClass('send0').html('发送验证码');
                        sends.checked = 1;
                        return true;
                    }
                    $('.btn-caution a').html(time + "S后再次发送");
                    time--;
                    return false;
                    sends.checked = 0;
                }
                $('.btn-caution a').addClass('send0').removeClass('send1');
                timeCountDown();
                var timer = setInterval(timeCountDown, 1000);
            }
        })
    }
    return {
        loginTab: loginTab,
        ipt: ipt,
        blur: blur,
        send: send,
    }
})()
login.loginTab();
login.ipt();
login.blur();
login.send();