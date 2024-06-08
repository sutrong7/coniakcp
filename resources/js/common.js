/* KCP clss 추가 */
if (!$("body").hasClass("kcp")) {
    $("body").addClass("kcp");
}

/* TAB */
let tabBtn = document.querySelectorAll('.tab-btn');
let tabCon = document.querySelectorAll('.tab-con');

tabBtn.forEach((tab, idx) => {
    tab.addEventListener('click', function () {
        tabBtn.forEach(tab => {
            tab.classList.remove('active');
        })
        tabCon.forEach(con => {
            con.classList.remove('active');
        })
        tabBtn[idx].classList.add('active');
        tabCon[idx].classList.add('active');
    })
})

/* POPUP */

function fn_popup_open(v_popUpId) {
    $("#" + v_popUpId).addClass("popup_fixed");
    $("body").css("overflow", "hidden");

    /* 팝업 컨텐츠  */
    // let popupFormHeight = $("#" + v_popUpId).find('.popup_con').height();
    // let deviceHeight = screen.height;
    // console.log(deviceHeight);
    // console.log(popupFormHeight);
    // if (popupFormHeight > deviceHeight){
    //     $('.popup_con').addClass('on');
    //     $('.btn_wrap').addClass('on');
    // }
}

let popupCloseBtn = document.querySelectorAll('.popup_close');
console.log(popupCloseBtn);
popupCloseBtn.forEach((popupBtn) => {
    popupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        $('.popup_box').removeClass("popup_fixed");
        $("body").css("overflow", "auto");
    });
})

function fn_popup_close(v_popUpId) {
    $("#" + v_popUpId).removeClass("popup_fixed");
    $("body").css("overflow","auto");
}

function fn_fancybox_close(v_popUpId) {
    $.fancybox.close($("#" + v_popUpId));
}

/*  D-day */

let remainTime = document.querySelectorAll('.d-day');

function fn_diffDay() {
    let deadline = new Date('2023-03-05');
    console.log(remainTime);
    let today = new Date();
    let diff = deadline - today;
    let diffDay = String(Math.floor(diff / (1000 * 60 * 60 * 24)));

    remainTime.forEach((item)=> {
        item.classList.contains('class-day') ? item.innerHTML = `마감 <em>${diffDay}일</em> 남았습니다.` : item.innerHTML = `D${diffDay}`;
    });
}

fn_diffDay();



/* 콤마 */
function fn_TransMoney(money) {
    return money;
}