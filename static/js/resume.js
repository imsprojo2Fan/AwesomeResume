var workItem,skillItem,eduItem;
var localData;
var resume = {};
$(function () {
    //隐藏验证登录输入框
    $('fieldset').hide();
    localData = localStorage.getItem("resume");
    if(localData){
        //console.info(JSON.parse(localStorage.getItem("resume")));
        resume = JSON.parse(localData);
        renderHtml();
    }

    $("#distpicker").distpicker();

    $('.slide').slider({
        formatter: function (value) {
            return '当前值:' + value;
        }
    }).on('slide', function (slideEvt) {
        //当滚动时触发
        //console.info(slideEvt);
        //获取当前滚动的值，可能有重复
        // console.info(slideEvt.value);
    }).on('change', function (e) {
        //当值发生改变的时候触发
        //console.info(e);
        //获取旧值和新值
        //console.info(e.value.oldValue + '--' + e.value.newValue);
    });

    $('#design').on("click",function () {//右下角设计按钮
        if(localData){
            renderForm();
        }
        $('.content-wrap').hide(200);
        $('#submitTip').hide(200);
        $('#myModal').modal("show");
    });
    $('#modalClose').on("click",function () {//模态框关闭按钮
        $('#myModal').modal("hide");
        $('.content-wrap').show(200);
        if(localStorage.getItem("resume")){
            $("#submitTip").show();
        }
    });
    $('#prev').on("click",function () {
        var curPage = $('#curPage').html();
        $('#prev').show();//显示上一页按钮
        $('#preview').hide();//隐藏保存预览按钮
        $('#next').show();//显示下一页按钮
        $('#page'+curPage).hide(200);//隐藏当前页
        curPage--;
        if(curPage==1){
            $('#prev').hide();//隐藏上一页按钮
        }
        if(curPage<3){
            $('#pageTitle').html("基础信息");
        }else if(curPage==3){
            $('#pageTitle').html("工作/实习经历");
        }else if(curPage==4){
            $('#pageTitle').html("所有技能");
        }else{
            $('#pageTitle').html("教育经历");
        }
        $('#page'+curPage).show(200);//显示上一页
        $('#curPage').html(curPage);//设置当前页
    });
    $('#next').on("click",function () {
        var curPage = $('#curPage').html();
        $('#prev').show();//显示上一页按钮

        $('#page'+curPage).hide(200);//隐藏当前页
        curPage++;
        if(curPage==5){
            $('#preview').show();//显示保存预览按钮
            $('#next').hide();//隐藏下一页按钮
        }
        if(curPage<3){
            $('#pageTitle').html("基础信息");
        }else if(curPage==3){
            $('#pageTitle').html("工作/实习经历");
        }else if(curPage==4){
            $('#pageTitle').html("所有技能");
        }else{
            $('#pageTitle').html("教育经历");
        }
        $('#page'+curPage).show(200);//显示下一页
        $('#curPage').html(curPage);//设置当前页

    });

    //新增工作经历
    $('#save4work').on("click",function (){
        var workArr = $('.workItem');
        workItem = $(workArr[0]).clone();
        $(workItem).find("input").val("");//清空已填内容
        $(workItem).find("input[type='month']").val("2018-01");
        $(workItem).find("textarea").val("");//清空已填内容
        if(!isPhone()){
            $(workItem).css("border","0.5px solid #eee");
        }else{
            $(workItem).css("border-top","0.5px solid #eee");
        }

        $('#workWrap').append(workItem);
        $('.del4work').each(function (index) {//显示删除按钮
            if(index!=0){
                $(this).show();
                $(this).find("button").on("click",function () {//删除按钮绑定事件
                    $(this).parent().parent().remove();//移除当前dom
                });
            }
        });
    });
    //新增技能
    $('#save4skill').on("click",function () {
        var item = $('.skillItem')[0];
        skillItem = $(item).clone();
        $(skillItem).find("input").val("");//清空已填内容
        if(!isPhone()){
            $(skillItem).css("border","0.5px solid #eee");
        }else{
            $(skillItem).css("border-top","0.5px solid #eee");
        }
        $('#skillWrap').append(skillItem);
        $(skillItem).find('.slide').slider({//渲染slider
            formatter: function (value) {
                return '当前值:' + value;
            },
            max:100,
            value:75
        });
        $(skillItem).find("#ex1Slider")[0].remove();
        $('.del4skill').each(function (index) {//显示删除按钮
            if(index!=0){
                $(this).show();
                $(this).find("button").on("click",function () {//删除按钮绑定事件
                    $(this).parent().parent().remove();//移除当前dom
                });
            }
        });
    });
    //新增教育经历
    $('#save4edu').on("click",function () {
        var item = $('.eduItem')[0];
        eduItem = $(item).clone();
        $(eduItem).find("input").val("");//清空已填内容
        $(eduItem).find("input[type='month']").val("2018-01");
        $(eduItem).find("textarea").val("");//清空已填内容
        if(!isPhone()){
            $(eduItem).css("border","0.5px solid #eee");
        }else{
            $(eduItem).css("border-top","0.5px solid #eee");
        }

        $('#eduWrap').append(eduItem);
        $('.del4edu').each(function (index) {//显示删除按钮
            if(index!=0){
                $(this).show();
                $(this).find("button").on("click",function () {//删除按钮绑定事件
                    $(this).parent().parent().remove();//移除当前dom
                });
            }
        });
    });
    //完成预览
    $('#preview').on('click',function () {
        dataCollect();
        $('#submitTip').show(200);
    });

});
function tipTip(str) {
    $('#tip').html("<p>即刻提示:<span class='red'>"+str+"</span></p>");
    setTimeout(function () {
        $('#tip').html("");
    },3000);
}
function dataCollect() {
    $('#tip').html("");
    var name = $('#name').val().trim();
    var objective = $('#objective').val().trim();
    var gender = $('input:radio:checked').val();
    var birthday = $('#birthday').val();
    var phone = $('#phone').val().trim();
    var email = $('#email').val().trim();
    var home = $('#province').val()+"-"+$('#city').val();
    var address = $('#address').val().trim();
    var hobby = $('#hobby').val().trim();
    var honor = $('#honor').val().trim();
    var introduce = $('#introduce').val().trim();
    var works = [];
    $("#workWrap").find(".workItem").each(function () {
        var workItem = {};
        workItem.start = $(this).find(".start").val();
        workItem.end = $(this).find(".end").val();
        workItem.company = $(this).find(".companyName").val().trim();
        workItem.position = $(this).find(".position").val().trim();
        workItem.description = $(this).find("textarea").val().trim().replace(/\n/g,'<br/>');
        works.push(workItem);
    });
    var skills = [];
    $("#skillWrap").find(".skillItem").each(function () {
        var skillItem = {};
        skillItem.name = $(this).find(".skillName").val().trim();
        skillItem.num = $(this).find(".slide").val();
        skills.push(skillItem);
    });
    var edus = [];
    $("#eduWrap").find(".eduItem").each(function () {
        var eduItem = {};
        eduItem.start = $(this).find(".start").val();
        eduItem.end = $(this).find(".end").val();
        eduItem.school = $(this).find(".school").val().trim();
        eduItem.description = $(this).find("textarea").val().trim().replace(/\n/g,'<br/>');
        edus.push(eduItem);
    });
    if(!name){
        tipTip("姓名是认识一个人的第一步喔.");
        return;
    }
    if(!objective){
        tipTip("您貌似忘记填写求职意向了.");
        return;
    }
    if(!phone){
        tipTip("留下手机号能让HR更容易找到你喔!");
        return;
    }
    if(!email){
        tipTip("邮箱地址有时其实也挺需要的.");
        return;
    }
    if(!introduce){
        tipTip("自我评价能让别人更容易的了解你呢!");
        return;
    }
    if(works.length==0){
        tipTip("您似乎没有填写工作经历.");
        return;
    }
    if(works.length==0){
        tipTip("您似乎忘了填写教育经历.");
        return;
    }

    resume.name = name;
    resume.objective = objective;
    resume.gender = gender;
    resume.birthday = birthday;
    resume.phone = phone;
    resume.email = email;
    resume.home = home;
    resume.province = $('#province').val();
    resume.city = $('#city').val();
    resume.address = address;
    resume.hobby = hobby;
    resume.honor = honor;
    resume.introduce = introduce;
    resume.works = works;
    resume.skills = skills;
    resume.edus = edus;
    console.log(resume);
    localStorage.setItem("resume",JSON.stringify(resume));
    renderHtml();
    $('#modalClose').click();

}
function renderHtml() {
    //隐藏关闭按钮
    $('#modalClose').hide();
    $("#submitTip").show();
    $(".typed").hide();
    $(".typed_").typed({//渲染打印效果
        strings: ["我的名字是"+resume.name, "我是一名"+resume.objective,"来自"+resume.home, "🙂"],
        typeSpeed: 100,
        backDelay: 900,
        loop: true
    });
    var str = "暂未填写";
    $('#showName').html(resume.name);
    $("#showObjective").html(resume.objective);
    $("#showGender").html(resume.gender);
    if(resume.gender==="女"){
        $('.bg-about').css("background","url(../../static/resume/resume001/images/about/about01_.jpg)");
        $('.bg-about').css("background-size","cover");
        $('.bg-about').css("background-repeat","no-repeat");
    }
    $("#showBirthday").html(resume.birthday);
    $("#showPhone").html(resume.phone);
    $('#showEmail').html(resume.email);
    if(!resume.home){
        $('#showHome').html(str);
    }else{
        $('#showHome').html(resume.home);
    }
    if(!resume.address){
        $('#showAddress').html(str);
    }else{
        $('#showAddress').html(resume.address);
    }
    if(!resume.hobby){
        $('#showHobby').html(str);
    }else{
        $('#showHobby').html(resume.hobby);
    }
    if(!resume.honor){
        $('#showHonor').html("-");
    }else{
        $('#showHonor').html(resume.honor);
    }
    $('#showIntroduce').html(resume.introduce);

    var works = resume.works.reverse();
    $('.showWorkWrap').html("");
    for(var i=0;i<works.length;i++){
        var obj = works[i];
        var start = obj.start;
        var end = obj.end;
        var date = start+" 至 "+end;
        var company = obj.company;
        var position = obj.position;
        var description = obj.description.replace(/\n/g,'<br/>');
        if(!description){
            description = "暂未填写";
        }
        $(".showWorkWrap").append('<li>\n' +
            '                                    <div class="col-md-6 col-sm-6">\n' +
            '                                        <div class="wrap-card">\n' +
            '                                            <div class="card">\n' +
            '                                                <h2 class="company">'+company+
            '                                                </h2>\n' +
            '                                                <p class="job">\n' +position+
            '                                                </p>\n' +
            '                                                <p class="year">\n' +date+
            '                                                </p>\n' +
            '                                                <hr>\n' +
            '                                                <div class="text-detail">\n' +
            '                                                    <p>\n' +description+
            '                                                    </p>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </li>');
    }

    var skills = resume.skills;
    $('.showSkillWrap').html("");
    for(var i=0;i<skills.length;i++){
        var obj = skills[i];
        var skillName = obj.name;
        var num = obj.num;
        $('.showSkillWrap').append('<div class="skillbar" data-percent="'+num+'%">\n' +
            '                                <div class="title head-sm">\n' +skillName+
            '                                </div>\n' +
            '                                <div class="count-bar">\n' +
            '                                    <div class="count"></div>\n' +
            '                                </div>\n' +
            '                            </div>');
    }
    //Skill
    jQuery('.skillbar').each(function() {
        jQuery(this).appear(function() {
            jQuery(this).find('.count-bar').animate({
                width:jQuery(this).attr('data-percent')
            },3000);
            var percent = jQuery(this).attr('data-percent');
            jQuery(this).find('.count').html('<span>' + percent + '</span>');
        });
    });

    var edus = resume.edus.reverse();
    $('.showEduWrap').html("");
    for(var i=0;i<edus.length;i++){
        var obj = edus[i];
        var start = obj.start;
        var end = obj.end;
        var date = start+" 至 "+end;
        var school = obj.school;
        var description = obj.description.replace(/\n/g,'<br/>');
        if(!description){
            description = "暂未填写";
        }
        $(".showEduWrap").append('<li>\n' +
            '                                    <div class="col-md-6 col-sm-6">\n' +
            '                                        <div class="wrap-card">\n' +
            '                                            <div class="card">\n' +
            '                                                <h2 class="company">'+school+
            '                                                </h2>\n'+
            '                                                <p class="year">\n' +date+
            '                                                </p>\n' +
            '                                                <hr>\n' +
            '                                                <div class="text-detail">\n' +
            '                                                    <p>\n' +description+
            '                                                    </p>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </li>');
    }
}
function renderForm() {
    $('#name').val(resume.name);
    $('#objective').val(resume.objective);
    var gender = resume.gender;
    if(gender==="男"){
        $('#radio1').attr("checked","checked");
        $('#radio2').attr("checked",false);
    }else{
        $('#radio2').attr("checked","checked");
        $('#radio1').attr("checked",false);
    }
    $('#birthday').val(resume.birthday);
    $('#phone').val(resume.phone);
    $('#email').val(resume.email);
    $('#province').val(resume.province);
    $('#city').val(resume.city);
    $('#address').val(resume.address);
    $('#hobby').val(resume.hobby);
    $('#honor').val(resume.honor);
    $('#introduce').val(resume.introduce);
    var works = resume.works;
    $('#workWrap').html("");
    for(var i=0;i<works.length;i++){
        var obj = works[i];
        var start = obj.start;
        var end = obj.end;
        var company = obj.company;
        var position = obj.position;
        var id = i+"work";
        var description = obj.description;
        $('#workWrap').append('<div class="workItem" style="margin-top: 3px;padding-top: 5px;border:0.5px solid #eee;">\n' +
            '                                <div class="del4work" style="width: 100%;text-align: right;margin-top: -10px;display:none"><button class="btn btn-danger btn-xs" title="删除当前项"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>\n' +
            '                                <div class="form-group alertPickDate">\n' +
            '                                    <label class="col-sm-3 control-label form-label">起止时间<span class="red"></span></label>\n' +
            '                                    <div class="col-sm-4" style="border: 0px solid red;">\n' +
            '                                        <input type="month" value="'+start+'" class="form-control start">\n' +
            '                                    </div>\n' +
            '                                    <div class="col-sm-4" style="border: 0px solid red;">\n' +
            '                                        <input type="month" value="'+end+'" class="form-control end">\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">公司名称</label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <input type="text" class="form-control companyName" value="'+company+'" maxlength="60"   placeholder="公司名称">\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">职位名称</label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <input type="text" class="form-control position" maxlength="60" value="'+position+'"   placeholder="职位名称">\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">工作描述<span class="red"></span></label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <textarea class="form-control" id="'+id+'" placeholder="工作描述" style="min-height: 120px;resize: vertical"></textarea>\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>');
        //设置textarea
        $('#'+id).val(description);
    }
    $('.del4work').each(function (index) {//显示删除按钮
        if(index!=0){
            $(this).show();
            $(this).find("button").on("click",function () {//删除按钮绑定事件
                $(this).parent().parent().remove();//移除当前dom
            });
        }
    });

    var skills = resume.skills;
    $('#skillWrap').html("");
    for(var i=0;i<skills.length;i++){
        var obj = skills[i];
        var skillName = obj.name;
        var num = obj.num;
        $('#skillWrap').append('<div class="skillItem" style="margin-top: 3px;padding-top: 5px;">\n' +
            '                                <div class="del4skill" style="width: 100%;text-align: right;margin-top: -10px;display:none"><button class="btn btn-danger btn-xs" title="删除当前项"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">技能名称</label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <input type="text" class="form-control skillName" value="'+skillName+'" maxlength="60" placeholder="技能名称">\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">熟练度<span class="red"></span></label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <input id="skill'+i+'"  class="slide" data-slider-id=\'ex1Slider\' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="'+num+'"/>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>');
        $('#skill'+i).slider({//渲染slider
            formatter: function (value) {
                return '当前值:' + value;
            },
            max:100,
            value:num
        });
        //$(skillItem).find("#ex1Slider")[0].remove();
    }
    $('.del4skill').each(function (index) {//显示删除按钮
        if(index!=0){
            $(this).show();
            $(this).find("button").on("click",function () {//删除按钮绑定事件
                $(this).parent().parent().remove();//移除当前dom
            });
        }
    });

    var edus = resume.edus;
    $('#eduWrap').html("");
    for(var i=0;i<edus.length;i++){
        var obj = edus[i];
        var start = obj.start;
        var end = obj.end;
        var school = obj.school;
        var id = i+"edu";
        var description = obj.description;
        $('#eduWrap').append('<div class="eduItem" style="margin-top: 3px;padding-top: 5px;border: 0.5px solid #eee;">\n' +
            '                                <div class="del4edu" style="width: 100%;text-align: right;margin-top: -10px;display:none"><button class="btn btn-danger btn-xs" title="删除当前项"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>\n' +
            '                                <div class="form-group alertPickDate">\n' +
            '                                    <label class="col-sm-3 control-label form-label">起止时间<span class="red"></span></label>\n' +
            '                                    <div class="col-sm-4" style="border: 0px solid red;">\n' +
            '                                        <input type="month" value="'+start+'" class="form-control start">\n' +
            '                                    </div>\n' +
            '                                    <div class="col-sm-4" style="border: 0px solid red;">\n' +
            '                                        <input type="month" value="'+end+'" class="form-control end">\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">学校/机构名称</label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <input type="text" class="form-control school" value="'+school+'" maxlength="60" placeholder="学校/机构名称">\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-sm-3 control-label form-label">教育信息<span class="red"></span></label>\n' +
            '                                    <div class="col-sm-8">\n' +
            '                                        <textarea class="form-control" placeholder="教育信息" id="'+id+'" style="min-height: 120px;resize: vertical"></textarea>\n' +
            '                                        <span class="help-block"></span>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>');
        //设置textarea
        $('#'+id).val(description);
    }
    $('.del4edu').each(function (index) {//显示删除按钮
        if(index!=0){
            $(this).show();
            $(this).find("button").on("click",function () {//删除按钮绑定事件
                $(this).parent().parent().remove();//移除当前dom
            });
        }
    });

}
function submit() {

    if($('#submit').html()==="前往登录"){
        window.open("/login","_blank");
        return;
    }

    swal({
            title: "<h3>是否已有账号?</h3>",
            text: "如果无账号将由系统生成临时账号,请尽快更改!",
            type: "warning",
            html:true,
            showCancelButton: true,
            confirmButtonColor: "#6397ff",
            confirmButtonText: "是",
            cancelButtonText: "否",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                swal({
                    title: "<h3>请输入登录信息</h3>",
                    text: "<input placeholder='账号/邮箱/手机号' type='text' id='account'>"+"<input placeholder='登录密码' type='password' id='password'>",
                    html:true,
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonColor: "#6397ff",
                    confirmButtonText: "提交",
                    cancelButtonText: "取消",
                    animation: "slide-from-top",
                    type: "prompt",
                    inputPlaceholder:"账号信息"
                }, function(){
                    var account = $('#account').val().trim();
                    var password = $('#password').val().trim();
                    console.info("account:"+account+"-password:"+password);
                    $.post("/validate",{type:"validate4made",_xsrf:$('#token').val(),account:account,password:password,rid:GetQueryString("v")},function (r) {
                        if(r.code==1){
                            window.location.href = "/main";
                            clearLocalData();
                        }else if(r.code==2){
                            setTimeout(function(){swal(r.msg, "登录系统点击我的制作即可查看简历", "error"); },100);
                            $('#footerTip').html("登录系统点击左侧我的制作即可查看最新简历");
                            $('#submit').removeClass("btn-primary");
                            $('#submit').addClass("btn-success");
                            $('#submit').html("前往登录");
                            clearLocalData();
                        }else if(r.code==3){
                            $.ajax({
                                url : "/resume/submit",
                                type : "POST",
                                data : {
                                    uid:r.data,
                                    rid:GetQueryString("v"),
                                    name:resume.name,
                                    objective:resume.objective,
                                    gender:resume.gender,
                                    birthday:resume.birthday,
                                    phone:resume.phone,
                                    email:resume.email,
                                    province:resume.province,
                                    city:resume.city,
                                    address:resume.address,
                                    hobby:resume.hobby,
                                    honor:resume.honor,
                                    introduce:resume.introduce,
                                    works:JSON.stringify(resume.works),
                                    skills:JSON.stringify(resume.skills),
                                    edus:JSON.stringify(resume.edus),
                                    _xsrf:$('#token').val()
                                },
                                dataType : "json",
                                cache : false,
                                beforeSend:function(){
                                    $('#loading').fadeIn(200);
                                    $('#scroll-top').click();
                                },
                                success : function(r) {
                                    if (r.code == 1) {
                                        swal({
                                            title:"提交成功!",
                                            text:'登录系统点击我的制作即可查看简历',
                                            html:true,
                                            type:"success"
                                        });
                                        $('#footerTip').html("登录系统点击左侧我的制作即可查看最新简历");
                                        $('#submit').removeClass("btn-primary");
                                        $('#submit').addClass("btn-success");
                                        $('#submit').html("前往登录");
                                        clearLocalData();
                                    } else {
                                        swal(r.msg,' ',"error");
                                    }
                                },
                                complete:function () {
                                    $('#loading').fadeOut(200);
                                }
                            });
                        }else{
                            setTimeout(function(){swal("错误提示",r.msg,"error"); },100);

                        }
                    })

                });
            }else{
                $.ajax({
                    url : "/resume/submit",
                    type : "POST",
                    data : {
                        rid:GetQueryString("v"),
                        name:resume.name,
                        objective:resume.objective,
                        gender:resume.gender,
                        birthday:resume.birthday,
                        phone:resume.phone,
                        email:resume.email,
                        province:resume.province,
                        city:resume.city,
                        address:resume.address,
                        hobby:resume.hobby,
                        honor:resume.honor,
                        introduce:resume.introduce,
                        works:JSON.stringify(resume.works),
                        skills:JSON.stringify(resume.skills),
                        edus:JSON.stringify(resume.edus),
                        _xsrf:$('#token').val()
                    },
                    dataType : "json",
                    cache : false,
                    beforeSend:function(){
                        $('#loading').fadeIn(200);
                        $('#scroll-top').click();
                        toggleBody(0);
                    },
                    success : function(r) {
                        if (r.code == 1) {
                            swal({
                                title:"提交成功!",
                                text:'以下为临时登录密钥,请尽快登录系统更改！</br><h3>'+r.data+"</h3>",
                                html:true,
                                type:"success"
                            });
                            $('#footerTip').html("登录系统您可能需要拷贝临时密钥:</br>"+r.data);
                            $('#submit').removeClass("btn-primary");
                            $('#submit').addClass("btn-success");
                            $('#submit').html("前往登录");
                            clearLocalData();
                        } else {
                            swal(r.msg,' ',"error");
                        }
                    },
                    complete:function () {
                        $('#loading').fadeOut(200);
                        toggleBody(1);
                    }
                });
            }
        });

}
function clearLocalData() {
    localStorage.setItem("resume","");
}