

console.log("smssend js ");

// function send

// 카드 취소 문자
function sendCsOrderCancel(send_array){
    //console.log("(sendCsOrderCancel)send_array :"+send_array);

    $.ajax({
        url : "/LmsController/sendCsOrderCancel",
        type : "POST",
        data : send_array,
        dataType : "JSON",
        async : true,
        statusCode : {

        },
        success : function (data) {
            //console.log("data->"+JSON.stringify(data));
        }
    });
}

// 반품 요청 문자
function sendCsProdReturn(send_array){


    $.ajax({
        url : "/LmsController/sendCsProdReturn",
        type : "POST",
        data : send_array,
        dataType : "JSON",
        async : true,
        statusCode : {

        },
        success : function (data) {
            console.log("data->"+JSON.stringify(data));
        }
    });
}

// 교환 요청 문자
function sendCsProdChange(send_array){



    $.ajax({
        url : "/LmsController/sendCsProdChange",
        type : "POST",
        data : send_array,
        dataType : "JSON",
        async : true,
        statusCode : {

        },
        success : function (data) {
            console.log("data->"+JSON.stringify(data));
        }
    });
}

