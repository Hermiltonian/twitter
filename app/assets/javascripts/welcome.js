function resizeContent() {
  var bannerHeight = $("#banners").outerHeight(true);
  var footerHeight = $(".StreamsFooter").outerHeight(true);
  var windowHeight = $(window).height();
  var contentHeight = windowHeight - bannerHeight - footerHeight;
  $(".StaticLoggedOutHomePage-content").height(contentHeight);
}

$(function() {
  resizeContent();

  $("#banners").on("click", "button", function() {
    $("#banners").empty();
    resizeContent();
  });

  $(window).resize(resizeContent);
});
