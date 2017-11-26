$(function(){
  setTimeout(function(){
    $(".list-item .slider .slide").click(slider);

    //reset dummy to empty fields
    console.log($(".new-site-dummy .control-btns .reset i"));
    $(".new-site-dummy .control-btns .reset i").click(function(){
      //clear everything
      $(".new-site-dummy #name").val("");
      $(".new-site-dummy .slider .slide").removeClass("active");
      $(".new-site-dummy .slider .slide:nth-child(3)").addClass("active");

    })
  }, 250);
})
