/* All slider functionality*/
function slider(){
  var newSelected = $(this).index()+1;
  $(this).parents(".list-item").children(".rating").children(".num").text(newSelected);

  $(this).parent().children(".active").removeClass("active");
  $(this).addClass("active");
}
