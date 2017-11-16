/* Handles UI of extension, deals with no data */
$(function(){
  $(".slider .slide").click(function(){
    $(".slider .slide.active").removeClass("active");
    $(this).addClass("active");
  })
})
