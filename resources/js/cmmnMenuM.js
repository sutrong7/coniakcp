// noinspection JSJQueryEfficiency
/*
$.event.special.touchmove = {
    setup: function (_, ns, handle) {
        if (ns.includes("noPreventDefault")) {
            this.addEventListener("touchmove", handle, {passive: false});
        } else {
            this.addEventListener("touchmove", handle, {passive: true});
        }
    }
};

$.event.special.touchstart = {
    setup: function (_, ns, handle) {
        if (ns.includes("noPreventDefault")) {
            this.addEventListener("touchstart", handle, {passive: false});
        } else {
            this.addEventListener("touchstart", handle, {passive: true});
        }
    }
};

$.event.special.mousewheel = {
    setup: function (_, ns, handle) {
        if (ns.includes("noPreventDefault")) {
            this.addEventListener("mousewheel", handle, {passive: false});
        } else {
            this.addEventListener("mousewheel", handle, {passive: true});
        }
    }
};
*/

$(function () {
    // jym 22.06.09 배송지 목록 팝업문제 해결
    $('a.popup_close').on('click', (e) => {
        e.preventDefault();
    })

    $('.m_access_right button').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.sch_dv01').fadeOut('fast');
        } else {
            $(this).addClass('on');
            $('.sch_dv01').fadeIn('fast');
        }

    });

    $('.top_sch_close').click(function () {
        $('.m_access_right button').removeClass('on');
        $('.sch_dv01').fadeOut('fast');

    });

    $('.gnb_wrap .category_select').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.category_menu').show(200);
        } else {
            $(this).addClass('on');
            $('.category_menu .dep_1').show();
            $('.category_menu').show(200);
        }
    });

    $('a.invite_select').mouseover(function () {
        $(this).next().css("display", "block");
    });

    $('.icon_menu ul li .invite_link').mouseleave(function () {
        $(this).css("display", "none");
    });


    $('.category_menu .dep_1 ul li').mouseover(function () {
        $(this).closest('.dep_1').next().show();
    });

    $('.category_menu .dep_2 ul li').mouseover(function () {
        $(this).closest('.dep_2').next().show();
    });

    $('.category_menu .dep_3 ul li').mouseover(function () {
        $(this).closest('.dep_3').next().show();
    });

    $('.category_menu').mouseleave(function () {
        $('.gnb_wrap .category_select').removeClass('on');
        $(this).slideUp(100);
        $('.dep_1').slideUp(100);
        $('.dep_2').slideUp(100);
        $('.dep_3').slideUp(100);
    });

    $('.category_menu .dep_4').mouseleave(function () {
        $(this).hide();
    });


    $('#countDown').revolver({
        // end date (year)
        year: "2021",
        // end date (month)
        month: "9",
        // end date (day)
        day: "14",

        // days Separator
        daysDel: 'DAY',
        // hours Separator
        hourDel: ':',
        // minutes Separator
        minDel: ':',
        // seconds Separator
        secDel: '',
        // text to show when the countdown has finished
        terminationMessage: ' 마감 '
    });

    /* 20220615 탑 버튼 기능 추가 */
    $(window).scroll(function () {
        var topBanner = $(window).scrollTop();
        /* 20220926 gnb display 여부 추가 PHJ */
        // if ($(".header_gnb ").css("display") == "block" && topBanner > 52) {
        //     $('.header_gnb').addClass('gnb_fixed');
        //     $('header').css('padding-bottom', '68px');
        // } else {
        //     $('.header_gnb').removeClass('gnb_fixed');
        //     $('header').css('padding-bottom', '0px');
        // }
        /* 20220926 gnb display 여부 추가 PHJ */
        var scrTop = $(window).scrollTop();
        var scrTopBtn = $('.scrollTop');
        let writeLinkBtn = $('.fixed_write');

        if (scrTop > 100) {
            scrTopBtn.addClass('on');
            writeLinkBtn.addClass('on');
        } else {
            scrTopBtn.removeClass('on');
            writeLinkBtn.removeClass('on');
        }
    });
    /*// 20220615 탑 버튼 기능 추가 */


    $('.slide_wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 300,
        touchMove: false,
        swipe: false

    });

    $('.time_content_wrap').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 300,
        variableWidth: true
    });

    $(window).resize(function () {
        if (this.resizeTO) {
            clearTimeout(this.resizeTO);
        }
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 100);

    });

    $(window).on('resizeEnd', function () {

        var winWidth = $(window).innerWidth();

        $('.detail_slide').slick('destroy');

        //$('.time_content_wrap').slick('destroy');

        if (winWidth <= 991) {

            $('.detail_slide').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                verticalSwiping: true,
                vertical: true,
                variableWidth: false,

            });


        } else {
            $('.detail_slide').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                verticalSwiping: false,
                vertical: false,
                variableWidth: true,

            });

            //$('.time_content_wrap').slick("destroy");

        }

    });

    $(window).resize(function () {

    });
    $(window).ready(function () {

        var winWidth = $(window).innerWidth();

        if (winWidth <= 991) {
            $('.detail_slide').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                verticalSwiping: true,
                vertical: true,
                variableWidth: false

            });


        } else {
            $('.detail_slide').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                verticalSwiping: false,
                vertical: false,
                variableWidth: true

            });

            //$('.time_content_wrap').slick("unslick");
        }
    });

    $(window).resize(function () {
        if (this.resizeTO) {
            clearTimeout(this.resizeTO);
        }
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 30);

    });

    $(window).on('resizeEnd', function () {


        $('.detail_slide').slick('refresh');

    });


    //$('.time_content_wrap').slick("unslick");

    if ($(".scroll_bar").length) {
        $(".scroll_bar").mCustomScrollbar({
            axis: "x", // horizontal scrollbar
            theme: "dark-thin",
            autoExpandScrollbar: true,
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });
    }

    /* 20220826 선택자 변경 ksk */
    $('.fixed_icon .scrollTop').bind('click', function () {
        $('html, body').animate({scrollTop: '0'}, 680);
    });


    $('.footer_info h1').click(function () {

        const jbWidth = $(window).innerWidth();

        if (jbWidth > 640) {
            $(this).next().show();
        } else {
            $(this).next().slideToggle();
            $(this).toggleClass('array');
        }

    });

    $(".mypage_snb .mypage_list ul li a").click(function (e) {
        $(".mypage_snb .mypage_list ul li").removeClass("active");
        $(this).parent("li").addClass("active");
    });


    /* side_menu */

    // $('.m_category_select').click(function () {
    //     $('.m_side_menu').fadeIn(300);
    //     $('#mask-overlay').addClass('overlay-opened');
    //     $('body').addClass('wraps');
    // });
    //
    // $('.m_side_close').click(function () {
    //     $('.m_side_menu').fadeOut(300);
    //     $('#mask-overlay').removeClass('overlay-opened');
    //     $('body').removeClass('wraps');
    // });


    /* m_category */

    $(".m_dep_1 ul li").click(function () {
        $(this).closest(".m_dep_1").hide();
        $(this).closest(".m_dep_1").next().fadeIn(300);
    });

    $(".m_dep_2 ul li").click(function () {
        $(this).closest('.m_dep_2').hide();
        $(this).closest('.m_dep_2').next().fadeIn(300);
    });

    $('.m_dep_3 ul li').click(function () {
        $(this).closest('.m_dep_3').hide();
        $(this).closest('.m_dep_3').next().fadeIn(300);
    });

    $('.prev_back').click(function () {
        $(this).parent().hide();
        $(this).parent().prev().fadeIn();
    });


});


/* 20230120 헤더 기능 변경 */
var didScroll;
var lastScrollTop = 0;
var delta = 50;
var navbarHeight = $('.kbp .header_gnb').outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hadScrolled();
        didScroll = false;
    }
}, 1);

function hadScrolled() {

    if ($('section').hasClass('myPage')) {
        return false;

    } else {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        if (st > lastScrollTop && st > navbarHeight) {
            $('.header_gnb').addClass('nav-down').removeClass('nav-up').addClass('on');
            $('header').css('padding-bottom', '56px');
        } else {
            if (st + $(window).height() < $(document).height()) {

                $('.header_gnb').removeClass('nav-down').addClass('nav-up').addClass('on');
                $('header').css('padding-bottom', '56px');

                if (st < $('header').offset().top + 100) {
                    $('.header_gnb').removeClass('nav-up').removeClass('on');
                    $('header').css('padding-bottom', '0');
                }
            }
        }


        lastScrollTop = st;
    }

}


