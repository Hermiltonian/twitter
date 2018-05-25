// 最適なビューを提供するためにメインコンテンツブロックの高さを調整する関数
function adjustSizeOfContents() {
  var bannerHeight = $("#banners").outerHeight(true);                 // バナーの高さ
  var footerHeight = $(".StreamsFooter").outerHeight(true);           // フッターの高さ
  var windowHeight = $(window).height();                              // ウィンドウの高さ
  var contentHeight = 0;                                              // 現在のコンテンツの高さ
  var newContentHeight = windowHeight - bannerHeight - footerHeight;  // 新たに設定しようとするコンテンツの高さ

  var utilHeight = $(".StaticLoggedOutHomePage-signupBlock").outerHeight(true);           // サインアップブロックの高さ
  var comuHeight = $(".StaticLoggedOutHomePage-communicationContent").outerHeight(true);  // コミュニケーションブロックの高さ

  // 現在のコンテンツの必要最低限の高さを取得
  if ($(".StaticLoggedOutHomePage-content").css("display") == "flex") {
    // displayがflexの場合は左右のブロックの高い方を採用
    contentHeight = (comuHeight > utilHeight) ? comuHeight : utilHeight;
  } else {
    // displayがflex出ない場合（blockを想定）の場合は上下のブロックの高さの合計を採用
    contentHeight = utilHeight + comuHeight;
  }

  // 現在のコンテンツの方が高さがあるなら高さを変えない
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
