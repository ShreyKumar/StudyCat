/* All slider functionality*/
function slider(){
  $(this).parent().children(".active").removeClass("active");
  //$(".slider .slide.active").removeClass("active");
  $(this).addClass("active");
}
