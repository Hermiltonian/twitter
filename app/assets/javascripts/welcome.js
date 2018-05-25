// 最適なビューを提供するためにメインコンテンツブロックの高さを調整する関数
function adjustSizeOfContents() {
  var bannerHeight = $("#banners").outerHeight(true);                 // バナーの高さ
  var footerHeight = $(".StreamsFooter").outerHeight(true);           // フッターの高さ
  var windowHeight = $(window).height();                              // ウィンドウの高さ
  var contentHeight = 0;                                              // 現在のコンテンツの高さ
  var newContentHeight = windowHeight - bannerHeight - footerHeight;  // 新たに設定しようとするコンテンツの高さ

  // 現在のコンテンツの必要最低限の高さを取得
  if ($(".StaticLoggedOutHomePage-signupBlock").outerHeight(true) > $(".StaticLoggedOutHomePage-communicationContent").outerHeight(true)) {
    contentHeight = $(".StaticLoggedOutHomePage-signupBlock").outerHeight(true);
  } else {
    contentHeight = $(".StaticLoggedOutHomePage-communicationContent").outerHeight(true);
  }

  // 現在のコンテンツの方が高いなら高さを変えない
  $(".StaticLoggedOutHomePage-content").height((contentHeight > newContentHeight) ? contentHeight : newContentHeight);
}

$(function() {
  // ページロード時のメインコンテンツブロックリサイズ
  adjustSizeOfContents();

  // バナーを確認した際のイベント
  $("#banners").on("click", "button", function() {
    // バナーを消す
    $("#banners").empty();

    // バナー非表示後のメインコンテンツブロックをリサイズ
    adjustSizeOfContents();
  });

  // ウィンドウリサイズ時のメインコンテンツブロックをリサイズ
  $(window).resize(adjustSizeOfContents);
});
