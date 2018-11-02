(function($) {
  "use strict";
  $(window).on("load", function() { // makes sure the whole site is loaded
    //preloader
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(150).fadeOut("slow"); // will fade out the white DIV that covers the website.
    
    //masonry
    $('.grid').masonry({
      itemSelector: '.grid-item'
    });    
  });


  $(document).ready(function(){
      //menu
      var bodyEl = document.body,
          content = document.querySelector( '.content-wrap' ),
          openbtn = document.getElementById( 'open-button' ),
          closebtn = document.getElementById( 'close-button' ),
          isOpen = false;

      function inits() {
          initEvents();
      }

      function initEvents() {
          openbtn.addEventListener( 'click', toggleMenu );
          if( closebtn ) {
              closebtn.addEventListener( 'click', toggleMenu );
          }

          // close the menu element if the target it´s not the menu element or one of its descendants..
          content.addEventListener( 'click', function(ev) {
              var target = ev.target;
              if( isOpen && target !== openbtn ) {
                  toggleMenu();
              }
          } );
      }

      function toggleMenu() {
          if( isOpen ) {
              classie.remove( bodyEl, 'show-menu' );
          }
          else {
              classie.add( bodyEl, 'show-menu' );
          }
          isOpen = !isOpen;
      }

      inits();

      //typed js
      $(".typed").typed({
          strings: ["我的名字是M.Reza", "我是一名Web Designer", "🙂"],
          typeSpeed: 100,
          backDelay: 900,
          // loop
          loop: true
      });

      //owl carousel
      $('.owl-carousel').owlCarousel({
          autoPlay: 5000, //Set AutoPlay to 3 seconds
          items : 1,
          itemsDesktop : [1199,1],
          itemsDesktopSmall : [979,1],
          itemsTablet : [768,1],
          itemsMobile : [479,1],

          // CSS Styles
          baseClass : "owl-carousel",
          theme : "owl-theme"
      });

      $('.owl-carousel2').owlCarousel({
          autoPlay: 5000, //Set AutoPlay to 3 seconds

          items : 1,
          itemsDesktop : [1199,1],
          itemsDesktopSmall : [979,1],
          itemsTablet : [768,1],
          itemsMobile : [479,1],
          //autoPlay : false,

          // CSS Styles
          baseClass : "owl-carousel",
          theme : "owl-theme"
      });

      //contact
      $('input').blur(function() {

          // check if the input has any value (if we've typed into it)
          if ($(this).val())
              $(this).addClass('used');
          else
              $(this).removeClass('used');
      });

      //pop up porfolio
      $('.portfolio-image li a').magnificPopup({
          type: 'image',
          gallery: {
              enabled: true
          }
          // other options
      });

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

      if (typeof(Storage) !== "undefined") {
          // 针对 localStorage/sessionStorage 的代码
          console.log("本地存储");
      } else {
          // 抱歉！不支持 Web Storage ..
      }

      setTimeout(function () {
          var alertInfo = getCookieValue("alertInfo");
          if(!alertInfo){
              addCookie("alertInfo","alertInfo",7,"/");
              swal("即刻提示","点击右下角设计按钮即可制作及预览简历","info");
          }
      },500);


  });
  
    
  //header
  function inits() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector(".for-sticky");
        if (distanceY > shrinkOn) {
            //classie.add(header,"opacity-nav");
        } else {
            if (classie.has(header,"opacity-nav")) {
                //classie.remove(header,"opacity-nav");
            }
          }
      });
    }

  window.onload = inits();

  //nav-active
  /*function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.menu-list a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.menu-list a').removeClass("active");
        currentLink.addClass("active");
      }
      else{
        currentLink.removeClass("active");
      }
    });
  }*/
    homeTop = $("#home").offset().top-85;
    aboutTop = $("#about").offset().top-85;
    employmentTop = $("#employment").offset().top-85;
    skillTop = $("#skill").offset().top-85;
    educationTop = $("#education").offset().top-85;
    testimonialTop = $("#testimonial").offset().top-85;
    contactTop = $("#contact").offset().top-85;
})(jQuery);
var homeTop,aboutTop,employmentTop,skillTop,educationTop,testimonialTop,contactTop;
window.addEventListener('scroll',winScroll);
function winScroll(e){
    // 拿到e之后进行你需要的处理
    //滚动条位置
    //var gTop = document.body.scrollTop + document.documentElement.scrollTop;
    var gTop = $(document).scrollTop();
    if(gTop<aboutTop){
        resetActive("home");
    }else if(gTop>=homeTop&&gTop<employmentTop){
        resetActive("about");
    }else if(gTop>=aboutTop&&gTop<skillTop){
        resetActive("employment");
    }else if(gTop>=employmentTop&&gTop<educationTop){
        resetActive("skill");
    }else if(gTop>=skillTop&&gTop<testimonialTop){
        resetActive("education");
    }else if(gTop>=educationTop&&gTop<contactTop){
        resetActive("testimonial");
    }else{
        resetActive("contact");
    }
}

function resetActive(str) {
    $('.menu-list a').each(function () {
        $(this).removeClass("active");
        var id = $(this).attr("data");
        if(id===str){
            $(this).attr("class","active");
        }
    });
}

function adimate(str) {

    /*$('.menu-list a').each(function () {
        $(this).removeClass("active");
        var id = $(this).attr("data");
        if(id===str){
            $(this).attr("class","active");
        }
    });*/

    var target = document.getElementById(str);
    if (!target) {
        $('html,body').animate({
                scrollTop: 0
            },
            300);
        return;
    }
    var targetOffset = $(target).offset().top-85;
    $('html,body').animate({
            scrollTop: targetOffset
        },
        300);

    //$('#close-button').click();

}
