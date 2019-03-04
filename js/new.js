var webInfo = [];
var center;
var isFirst = 1;
var incremental = 0; //分页请求增量
var Timer;
function tanChu(content){
    var Text = $("<div><span></span></div>");
    $("html").append(Text);
    $(Text).children("span").html(content);
    $(Text).addClass("tanChu");
    $(Text).animate({
        top:'300px',
        opacity:'0.7',
    },'slow',function () {
        $(Text).fadeOut();
        $(Text).remove();
    })
}
function clickLeft(offset) {
    idx = $(".threeD_gallery_wrap").find(".front_side").index();
    $(".threeD_gallery_item").eq(idx).removeClass("front_side").addClass("gallery_right_middle");
    $(".threeD_gallery_item").eq((idx+1)%7).removeClass("gallery_right_middle").addClass("gallery_right_hide");
    $(".threeD_gallery_item").eq((idx+2)%7).removeClass("gallery_right_hide").addClass("right_hide");
    $(".threeD_gallery_item").eq((idx+3)%7).removeClass("right_hide").addClass("left_hide").find("img").attr("src",webInfo[offset][0]);
    $(".threeD_gallery_item").eq((idx+4)%7).removeClass("left_hide").addClass("gallery_left_hide");
    $(".threeD_gallery_item").eq((idx+5)%7).removeClass("gallery_left_hide").addClass("gallery_left_middle");
    $(".threeD_gallery_item").eq((idx+6)%7).removeClass("gallery_left_middle").addClass("front_side");
}
function clickRight(offset) {
    idx = $(".threeD_gallery_wrap").find(".front_side").index();
    $(".threeD_gallery_item").eq(idx).removeClass("front_side").addClass("gallery_left_middle");
    $(".threeD_gallery_item").eq((idx+1)%7).removeClass("gallery_right_middle").addClass("front_side");
    $(".threeD_gallery_item").eq((idx+2)%7).removeClass("gallery_right_hide").addClass("gallery_right_middle");
    $(".threeD_gallery_item").eq((idx+3)%7).removeClass("right_hide").addClass("gallery_right_hide");
    $(".threeD_gallery_item").eq((idx+4)%7).removeClass("left_hide").addClass("right_hide").find("img").attr("src",webInfo[offset][0]);
    $(".threeD_gallery_item").eq((idx+5)%7).removeClass("gallery_left_hide").addClass("left_hide");
    $(".threeD_gallery_item").eq((idx+6)%7).removeClass("gallery_left_middle").addClass("gallery_left_hide");
}
function getAjax() {
    $.ajax({
        url:incremental+".html",
        type:"POST",
        // data:{adder:incremental},
        dataType: "json",
        cache: false,
        success:function (data) {
            if(data) {
                incremental++;
                if (isFirst == 1) {
                    webInfo = data;
                    center = parseInt(parseInt(webInfo.length) / 2) + 1;
                    $(".threeD_gallery_wrap").find(".left_hide").find("img").attr("src", webInfo[center - 3][0]);
                    $(".threeD_gallery_wrap").find(".gallery_left_hide").find("img").attr("src", webInfo[center - 2][0]);
                    $(".threeD_gallery_wrap").find(".gallery_left_middle").find("img").attr("src", webInfo[center - 1][0]);
                    $(".threeD_gallery_wrap").find(".front_side").find("img").attr("src", webInfo[center][0]);
                    $(".threeD_gallery_wrap").find(".gallery_right_middle").find("img").attr("src", webInfo[center + 1][0]);
                    $(".threeD_gallery_wrap").find(".gallery_right_hide").find("img").attr("src", webInfo[center + 2][0]);
                    $(".threeD_gallery_wrap").find(".right_hide").find("img").attr("src", webInfo[center + 3][0]);
                    isFirst = 2;
                } else {
                    for (var i = 0; i < data.length;i++) webInfo.push(data[i]);
                }
                return 1;
            }
        }
    });
}
function fillOutImg(position) {
        var imgsrc = webInfo[position][0];
        var opacityBottom = '<div id="opacityBottom" style="display: none"><img class="bigImg" src="'+ imgsrc +'" ></div>';
        $(document.body).append(opacityBottom);
        toBigImg();//变大函数
    }
function clickToSmallImg() {
    $("html,body").removeClass("none-scroll");
    $("#opacityBottom").remove();
    $("#inputbox").animate({bottom:"-50px"},500);
    clearInterval(Timer);
}
function startMessage() {
    var number = webInfo[center].length-1;
    var i = 1;
    Timer = setInterval(function () {
        sentMessage(webInfo[center][i]);
        number--;
        i++;
        if (number == 0){
            clearInterval(Timer);
        }
    },800);
}
function toBigImg(){
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var imgHeight = $(".threeD_gallery_wrap").find(".front_side").find("img").width();
    var imgWidth = $(".threeD_gallery_wrap").find(".front_side").find("img").height();
    var neadWidth ="";
    var neadHeight ="";
    hRatio = (screenHeight/imgHeight)*0.9;
    WRatio = (screenWidth/imgWidth);
    if (screenWidth>screenHeight){
        neadHeight = imgHeight*hRatio+"px";
        neadWidth = "auto";
    }else{
        neadHeight = "auto";
        neadWidth = imgWidth*WRatio+"px";
    }
    $("#opacityBottom").addClass("opacityBottom");
    $("#opacityBottom").show();
    $("html,body").addClass("none-scroll");//下层不可滑动
    $(".bigImg").addClass("bigImg");
    $(".bigImg").css({
            "width": neadWidth,
            "height":neadHeight,
    });
    $(".bigImg").css({
        "margin-left":"-"+$(".bigImg").width()/2+"px",
        "margin-top":"-"+$(".bigImg").height()/2+"px",
    });
    $("#opacityBottom").bind("click",clickToSmallImg);
    $(".bigImg").bind("click",clickToSmallImg);
    // var imgHeight = $(".bigImg").prop("height");
    // if(imgHeight > h){
    //     $(".bigImg").css({"top":(h-imgHeight)/2 + 'px'});
    // }else{
    //     $(".bigImg").css({"top":'10%'});
    // }
    startMessage();
}
function sentMessage(content) {
    var ladder = (parseInt(Math.random()*10)%5+3)*10;
    var bitLength = 120+Math.sqrt(Math.pow(content.length,2.3))*10;
    console.log(bitLength);
    var Text = $("<span></span>");
    $(".bg_img").append(Text);
    Text.addClass("theMessage");
    Text.text(content);
    Text.css({
        width:bitLength+"px",
        top:ladder+"%",
        right:"-"+bitLength+"px",
    });
    Text.animate({
       left:"-"+bitLength+"px",
    },10000,function () {
        Text.fadeOut();
        Text.remove();
    });
}
function showInput() {
    $("#inputbox").animate({
        bottom:"0px"
    },500,function () {
        $("#text").focus();
    })
}
function inport(content) {
    sentMessage(content);
    webInfo[center].push(content);
}