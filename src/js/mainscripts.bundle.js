
(function ($) {
    "use strict";

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

})(jQuery);


// $(function() {
//     "use strict";
//     CustomScrollbar(), CustomJs()
// }); 

