/*
  ------------------------------------------
  メールアドレスの形式チェック関数
  ------------------------------------------
*/
function checkMailFormat(mail) {
    var mail_regex1 = new RegExp( '(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*' );
    var mail_regex2 = new RegExp( '^[^\@]+\@[^\@]+$' );
    if( mail.match( mail_regex1 ) && mail.match( mail_regex2 ) ) {
        // 全角チェック
        if( mail.match( /[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/ ) ) { return false; }
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
        if( !mail.match( /\.[a-z]+$/ ) ) { return false; }
        return true;
    }

    return false;
}

/*
  ------------------------------------------
  電話番号の形式チェック関数
  ------------------------------------------
*/
function checkPhoneFormat(phone) {
    var phone_regex1 = new RegExp( '^0[0-9][-(]?[0-9]{4}[-)]?[0-9]{4}$' ) // 03-1111-1111形式
    var phone_regex2 = new RegExp( '^0[0-9]{2}[-(]?[0-9]{3,4}[-)]?[0-9]{4}$' ) // 042-111-1111形式, 090-1111-1111形式
    var phone_regex3 = new RegExp( '^0[0-9]{3}[-(]?[0-9]{3}[-)]?[0-9]{3}$' ) // 0120-111-111形式

    return ( phone.match( phone_regex1 ) || phone.match( phone_regex2 ) || phone.match( phone_regex3 ) ) ? true : false;
}

$(function() {
  /*
    -------------------------------------
    イベント：電話番号入力に変える
    -------------------------------------
  */
  $("#change_from_email_to_phone").on("click", function() {
    $("#input-phone, #change_from_phone_to_email").removeAttr("hidden");
    $("#input-email, #change_from_email_to_phone").attr("hidden", "hidden");

    // メールのバリデーションエラーメッセージを消去
    $(".Signup__Body__Contents__Email--Invalid").attr("hidden", "hidden");
  });

  /*
    -------------------------------------
    イベント：メール入力に変える
    -------------------------------------
  */
  $("#change_from_phone_to_email").on("click", function() {
    $("#input-email, #change_from_email_to_phone").removeAttr("hidden");
    $("#input-phone, #change_from_phone_to_email").attr("hidden", "hidden");

    // 電話番号のバリデーションエラーメッセージを消去
    $(".Signup__Body__Contents__Phone--Invalid").attr("hidden", "hidden");
  });

  /*
    -------------------------------------
    イベント：名前のバリデーションと名前文字数カウント
    -------------------------------------
  */
  $("#input-name").on("input", function() {
    // 入力文字の取得
    var input_words = $("#input-name").val();
    // 文字数の取得
    var words_count = input_words.length;
    // 文字数の表示
    $(".Signup__Body__Contents__Name--Wordcounter").text(words_count + "/50");

    // スペースで始まる入力は許可しない
    if (input_words.match(/^ +/) !== null) {
      words_count = 0;
    }

    // 名前が0文字の場合
    if (words_count == 0) {
      // エラーメッセージ表示のためhidden属性を解除
      $(".Signup__Body__Contents__Name--No-name-error").removeAttr("hidden");

      // 名前入力後、0文字でフォーカス外れた場合のスタイル変更
      $("#Signup__Body__Contents__Name--No-name-error").on("focusout", function() {
        // スタイル変更用のクラスを割り当て
        $("#input-name").addClass("Signup__Body__Contents__Name--Input--Error");
      });
    } else {
      // エラーメッセージを非表示にする
      $(".Signup__Body__Contents__Name--No-name-error").attr("hidden", "hidden");
      checkRequiredInputs();
    }
  });

  /*
    -------------------------------------
    イベント：メールのバリデーション
    -------------------------------------
  */
  $("#input-email").on("input", function() {
    if (checkMailFormat($("#input-email").val())) {
      $(".Signup__Body__Contents__Email--Invalid").attr("hidden", "hidden");
      checkRequiredInputs();
    } else {
      $(".Signup__Body__Contents__Email--Invalid").removeAttr("hidden");
    }
  });

  /*
    -------------------------------------
    イベント：電話番号のバリデーション
    -------------------------------------
  */
  $("#input-phone").on("input", function() {
    if (checkPhoneFormat($("#input-phone").val())) {
      $(".Signup__Body__Contents__Phone--Invalid").attr("hidden", "hidden");
      checkRequiredInputs();
    } else {
      $(".Signup__Body__Contents__Phone--Invalid").removeAttr("hidden");
    }
  });

  /*
    -------------------------------------
    イベント：次へボタン押下
    -------------------------------------
  */
  $("#signup-next").on("click", function() {
    $(".Signup__Body__Contents__Name--Wordcounter").attr("hidden", "hidden");
    $("#signup-next, #change_from_email_to_phone, #change_from_phone_to_email").attr("hidden", "hidden");
    $("#signup-back, .Signup__Body__Contents__Submit").removeAttr("hidden");
  });

  /*
    -------------------------------------
    イベント：戻るボタン押下
    -------------------------------------
  */
  $("#signup-back, #input-name, #input-phone, #input-email").on("click", function() {
    $(".Signup__Body__Contents__Name--Wordcounter").removeAttr("hidden");
    $("#signup-next, #change_from_phone_to_email").removeAttr("hidden");
    $("#signup-back, .Signup__Body__Contents__Submit").attr("hidden", "hidden");
  });
});
