/***
 *
 *  VERSION 0.1 -- FIXED VIEWPORT ANIMATION
 *
 *   0. Variable declarations
 *   1. init WOW Animations
 *   2. init parallax
 *   3. Init Lightbox
 *   4. Slideshow 
 *   5. Masonary item
 *   6. computing Height for full-height elements
 *   7. Video Aspect Ratio Fixtures
 *   8. drophoverMenu
 *   9. loadInsta
 *  10. loadMap
 *  11. form validation
 *-----------------------------------------------------------------
 **/


//  1. variable declarations

"use strict";
var full_height, full_height_1;

var ua = navigator.userAgent;
var is_webkit = ua.match(/webkit/i);
var is_firefox = ua.match(/gecko/i);
var is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie = ua.match(/msie 6/i);
var is_ie = is_ancient_ie || is_older_ie || is_newer_ie;
var is_mobile_ie = navigator.userAgent.indexOf('IEMobile') !== -1;
var is_mobile = ua.match(/mobile/i);
var is_OSX = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
jQuery.fn.spectragram.accessData = {
    accessToken: '2112249086.5c36a40.0ad4c41917d44ba79a0fe741c146778e',
    clientID: '5c36a408a8284bce865efad0f880c8d4'
};
var Pace;
//   1. init WOW Animations

if ( typeof Pace!== 'undefined' ) {

    Pace.on('done', function() {
        new WOW().init();
        loadInsta();
        //     10. LoadMaps    
        if( typeof google!== 'undefined'){

            loadMap();
        }

        setTimeout(function() {
            $('.masonry-container').masonry('layout');
        }, 200);
    });

} else {
    new WOW().init();
    loadInsta();
    //     10. LoadMaps    
    if( typeof google!== 'undefined'){

            loadMap();
        }
}
$(document).ready(function() {
    
    $("<style id='user_computedstyles'></style").appendTo("body");

        
//   2. init parallax
    parallax();

//   3. Init Lightbox
    $(".open_lightbox").lightGallery({
        'hash':false,
        'preload':0,
        'download': false,
        'autoplay':false
    });
    //light boxgallery
    $(".lightbox-gallery").lightGallery({
        selector: '.open_lightbox_image',
        'hash':false,
        'preload':0,
        'download': false,
        'autoplay':false,
        'pager':false
    });

//   4.  Slideshows
    $('.slideshow').slick({
        dots: true,
        fade: true,
        arrows: true,
        infinite: true,
        variableWidth: false
    });

//   5. Masonary
    // initialize Masonry after all images have loaded  
    $(".masonry-container").imagesLoaded(function() {
        
        $(".masonry-container").masonry({
            gutter:0,
            itemSelector: '.masonry_item'
        });

        
    });

 //    6.computing Height for full-height elements
       
        full_height = 'section.full-height{   height:' + window.innerHeight + 'px!important;}';
        full_height_1 = '.height-vh100{   height:' + window.innerHeight + 'px!important;}';
        $("#user_computedstyles").append(full_height);
        $("#user_computedstyles").append(full_height_1);

//     7. Video Fixtures    
    VideoFixture();

if($('.player').length > 0){
    
          $(".player").YTPlayer();
}   

//     9. DrophoverMenu    
drophoverMenu();

    $(window).scroll(function() {
       var navHeight = $( window ).height() - 70;
             if ($(window).scrollTop() < 100) {
                 $('.navbar.make-sticky').removeClass("has-scrolled");
                 
             }
             else {
                 $('.navbar.make-sticky').addClass("has-scrolled");
                 
             }
    });

});
/*document.ready ends*/

function VideoFixture() {
    /*https://jsfiddle.net/sammy_1993/k47wh03p/*/
    $('.localBgvid video').each(function() {
        var current_Inline_video = $(this);
        var ratio = (current_Inline_video.width() / current_Inline_video.height());
        var section = current_Inline_video.closest('section');
        if (section.width() > section.outerHeight()) {
            current_Inline_video.css('width', (section.width() * ratio));
            current_Inline_video.css('margin-left', -((section.width() * ratio) / 4));
            current_Inline_video.css('height', 'auto');
        } else {
            current_Inline_video.css('width', 'auto');
            current_Inline_video.css('height', (section.outerHeight() * ratio));
            current_Inline_video.css('margin-left', 0);
        }
    });

}

function parallax() {

    if ($(window).width() > 756 && isMobile == false ) {
            
          $.stellar({
            horizontalScrolling: false,
            verticalScrolling: true,
            responsive: true,
            hideDistantElements: true,

        });
    
    } else {
        if ($.stellar != null) {

            $.stellar('destroy');
            focusPointHelper();
        }

    }

}
$(window).resize(function() {
    VideoFixture();
    parallax();
});

function scaleMenu(){
    ('.profile-userpic').parents('.col-sm-4').css('transform',' scale(0.9)')
}
$("#opensidemenu").on("click", function(e) {
    
    $(".sidemenu").removeClass("hidden");

});

// 11. form validation
$('.phpmailform').validate({
    'rules' : {
        'name': 'required',
        'email': {
            'required': true,
            'email': true
        },
        'message': {
            'required': true
        }
    },
    'messages': {
        'name': 'Name is Required',
        'email': {
            'required': 'Email is Required',
            'email': 'Please enter valid Email'
        },
        'message': {
            'required': 'Message is Required'
        }
    },
    'errorPlacement': function(error, element) {},
    'submitHandler': function(form, e) {
        
        e.preventDefault();
        /* submitting form */
        var formData = new FormData(form);
        var formHandle = $(form);
        // console.log(formHandle);
        var submitButton = formHandle.find('button, [type="submit"]');
        /* for displaying error meessage only */
        if($('.error').length>0) {
            $('.form-msg').remove();
            formHandle.prepend('<div class="alert form-msg alert-danger" role="alert"> <strong>Please fill all fields Correctly</strong> <a href="#" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></a></div>');
        }
        console.log(submitButton);
        submitButton.text('Submitting..');
        submitButton.attr('disabled', 'disabled');
        // debugger;
        var sendingURL = formHandle.attr('action');
        console.log(sendingURL)
        $.ajax({
            'url': sendingURL,
            'type': 'POST',
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function(response) {
                submitButton.removeAttr('disabled');
                submitButton.text('Send');
                var response = $.parseJSON( response );
                if(response.success) {
                    $('.form-msg').remove();
                    formHandle.prepend('<div class="alert form-msg alert-success" role="alert"> '+ formHandle.attr('data-success-msg') +' <a href="#" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></a></div>');
                    
                } if(!response.success) {
                    $('.form-msg').remove();
                    formHandle.prepend('<div class="alert form-msg alert-danger" role="alert"> '+ formHandle.attr('data-error-msg') +' <a href="#" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></a></div>');
                    
                }
            },
            'error': function(response) {
                submitButton.removeAttr('disabled');
                submitButton.text('Send');
                console.log('error')
            }
        })
    }
});
function focusPointHelper(){
    $('.bg-img').each( function (index){
        if( $(this).attr('data-background') != 'undefined' ){
            $(this).css('background-position', $(this).attr('data-background'));
        }
        else{
            $(this).css('background-position','0 0');
        }
    });
}
function drophoverMenu() {

    $(document).on('mouseenter', '.navbar .dropdown', function(e) {
        $(this).parents('.navbar').find('.dropdown').removeClass("open");
        $(this).addClass("open")
    });
    $(document).on('mouseleave', '.navbar .dropdown-menu', function(e) {

        $('.open').removeClass("open")
    });

    $(document).on('click', '.navbar .dropdown-menu', function(e) {
     
        e.stopPropagation();
    });
}


function loadInsta() {
    $('.instafeed').each(function() {
        var insta_name = $(this).attr('data-insta-username');
        var warper = $(this).attr("data-insta-wrapper");
        var insta_length = $(this).attr("data-insta-length");

        $(this).spectragram('getUserFeed', {
            query: insta_name,
            max: insta_length,
            wrapEachWith: warper
        });
    });
}
function loadMap() {
    $('.maps').click(function() {
        $(this).addClass('activated');
    });

    $(window).scroll(function() {
        
            $('.maps.activated').removeClass('activated');
        
    });

        $( ".maps" ).each(function( index ) 
            {
                $(this).attr("id","map_id_"+index)
                var mapElement = document.getElementById($(this).attr('id'));
                var Lat = $( this ).attr("data-latitude");
                var Lng =  $( this ).attr("data-longitude");
                var zm =  $( this ).attr("data-zoom");
               
                var LatLng = new google.maps.LatLng(Lat,Lng);
                var mapOptions = {
                    zoom: parseInt(zm),
                    center: new google.maps.LatLng(Lat, Lng),
                    disableDefaultUI: false,
                    mapTypeControl: false,
                    scrollwheel: true,
                    streetViewControl: false,
                    zoomControl: true,
                    styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}]
                };

                var image = {
                    url: 'img/map-marker.png',
                    size: new google.maps.Size(26, 32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(26, 32)
                };

                var map = new google.maps.Map(mapElement, mapOptions);
                var marker = new google.maps.Marker( {position: LatLng, map: map, icon: image} );
                marker.setPosition( new google.maps.LatLng( Lat, Lng ) );
            })
}


if (window.location.protocol == "file:") {
  $( document).on('click','.lg-close.lg-icon',function(){
    $('.lg-on').removeClass('lg-on');
    $('.lg-outer').remove();
    $('.lg-backdrop').remove();
  });
}