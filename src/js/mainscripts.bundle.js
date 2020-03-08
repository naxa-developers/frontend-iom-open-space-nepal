<<<<<<< HEAD

(function ($) {
    "use strict";
    // $('.sidebar_wrapper').perfectScrollbar();

    var winH = $(window).innerHeight();
    var HdHeight = $('.site-header').innerHeight();
    var FtHeight = $('.site-footer').height();
    var mapHeight = winH - HdHeight;
    $('.map ,.sidebar-wrapper').css({ 'height': mapHeight });


    function sidebarToggle() {
        $('.map-sidebar .sidebar-toggle').on('click', function () {
            $(this).toggleClass('rotated');
            $(this).closest('.map-sidebar').find('.sidebar-wrapper').animate({
                width: "toggle"
            });
        });
    }
    sidebarToggle();


    $('.intro-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 3000,
    });

    var pageSection = $(".bg-image");
    pageSection.each(function () {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });




    function toggle_button() {
        $('.headRight .toggle-button').on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('Is-toggle');

        });
    }
    toggle_button();

    function minHeight() {
        var videoHeight = $('.video-section .video').innerHeight();
        $('.video-section .video-content').css({ 'min-height': videoHeight });
        var winWidth = $(window).width();
        if (winWidth <= 767) {
            $('.video-section .video-content').css({ 'min-height': 'auto' });
        }
    }
    minHeight();
    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('select').selectpicker();



})(jQuery);


// $(function() {
//     "use strict";
//     CustomScrollbar(), CustomJs()
// }); 

=======

(function ($) {
    "use strict";
    // $('.sidebar_wrapper').perfectScrollbar();

    var winH = $(window).innerHeight();
    var HdHeight = $('.site-header').innerHeight();
    var FtHeight = $('.site-footer').height();
    var mapHeight = winH - HdHeight;
    $('.map ,.sidebar-wrapper').css({ 'height': mapHeight });


    function sidebarToggle() {
        $('.map-sidebar .sidebar-toggle').on('click', function () {
            $(this).toggleClass('rotated');
            $(this).closest('.map-sidebar').find('.sidebar-wrapper').animate({
                width: "toggle"
            });
        });
    }
    sidebarToggle();


    $('.intro-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 3000,
    });

    var pageSection = $(".bg-image");
    pageSection.each(function () {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });




    function toggle_button() {
        $('.headRight .toggle-button').on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('Is-toggle');

        });
    }
    toggle_button();

    function minHeight() {
        var videoHeight = $('.video-section .video').innerHeight();
        $('.video-section .video-content').css({ 'min-height': videoHeight });
        var winWidth = $(window).width();
        if (winWidth <= 767) {
            $('.video-section .video-content').css({ 'min-height': 'auto' });
        }
    }
    minHeight();
    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('select').selectpicker();



})(jQuery);


// $(function() {
//     "use strict";
//     CustomScrollbar(), CustomJs()
// }); 

>>>>>>> 27827056134716d4785a34912ef3d7223824891f
