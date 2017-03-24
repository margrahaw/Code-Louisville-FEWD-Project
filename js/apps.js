$(document).ready(function () {

  //Flickr API 
  //On click event 
  $('button').click(function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var park = $(this).text();
    var flickrOptions = {
      tags: park,
      format : "json",
    };
    function displayPhotos(data) {
      console.log(data);
      var photoHTML = '<ul id="imageGallery">';
      $.each(data.items, function (i, photo) {
        photoHTML += '<li>';
        photoHTML += '<a data-lightbox="image" href="' + photo.media.m + '">'; //photo.link - and - removed the class="image"
        photoHTML += '<img src="' + photo.media.m +'"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });


  //Create a dropdown menu for small screens
  //Create a select and append to #menu
  var $select = $("<select></select")
  $("#menu").append($select);
  //Cylce over menu links
  $("#menu a").each(function(){
   var $anchor = $(this);
   //Create an option
   var $option = $("<option></option");

   //Deal with selected options
   if($anchor.parent().hasClass("menu-selected")){
     $option.prop("selected", true);
     }
     //Option's value is href
     $option.val($anchor.attr("href"));
     //Option's text is the text of the link
     $option.text($anchor.text());
     //Append option to select
     $select.append($option);
    });

  //Bind change listner to the select 
    $select.change(function() {
      window.location = $select.val();
    });

  //Slick.js additions
  $('.slides').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true
  });
 

}); // end ready

//I should write create a lightbox for the photos and then remove the lightbox.js plugin 