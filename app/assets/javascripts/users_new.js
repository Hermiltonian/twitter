/*
  ------------------------------------------
  名前の形式チェック関数
  ------------------------------------------
*/
function validateName(name = $("#input-name").val()) {
    var name_regex1 = new RegExp( '[^　 ]{1,50}' ); // スペース以外の文字、1文字以上50文字以下

    return name.match( name_regex1 ) ? true : false;
}

/*
  ------------------------------------------
  電話番号の形式チェック関数
  ------------------------------------------
*/
function validatePhone(phone = $("#input-phone").val()) {
    var phone_regex1 = new RegExp( '^0[0-9][-(]?[0-9]{4}[-)]?[0-9]{4}$' ); // 03-1111-1111形式
    var phone_regex2 = new RegExp( '^0[0-9][1-9][-(]?[0-9]{3}[-)]?[0-9]{4}$' ); // 042-111-1111形式
    var phone_regex3 = new RegExp( '^0[7-9]0[-(]?[0-9]{4}[-)]?[0-9]{4}$' ); // 090-1111-1111形式
    var phone_regex4 = new RegExp( '^0[0-9]{3}[-(]?[0-9]{3}[-)]?[0-9]{3}$' ); // 0120-111-111形式

    return ( phone.match( phone_regex1 ) || phone.match( phone_regex2 ) || phone.match( phone_regex3 ) || phone.match( phone_regex4 ) ) ? true : false;
}

/*
  ------------------------------------------
  メールアドレスの形式チェック関数
  ------------------------------------------
*/
function validateEmail(mail = $("#input-email").val()) {
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
  パスワードの形式チェック関数
  ------------------------------------------
*/
function validatePassword(password = $("#input-password").val()) {
    var password_regex1 = new RegExp( '(?=.*[0-9])(?=.*[a-zA-Z]).{6,}' );  // 英数字の使用確認
    var password_regex2 = new RegExp( '.{6,}' );                           // 6文字以上の確認

    return ( password.match( password_regex1 ) && password.match( password_regex2 ) ) ? true : false;
}

/*
  ------------------------------------------
  セレクタの隠し関数
  ------------------------------------------
*/
function setHidden(selector, hidden = true) {
  hidden ? selector.attr("hidden", "hidden") : selector.removeAttr("hidden");
}

/*
  ------------------------------------------
  セレクタの隠し解除関数
  ------------------------------------------
*/
function unsetHidden(selector) {
  setHidden(selector, false);
}

/*
  ------------------------------------------
  電話番号入力に変更する関数
  ------------------------------------------
*/
function changeIntoPhoneInput() {
  // 入力値の初期化
  $("#input-email").val("");

  // 隠し要素のリセット
  unsetHidden($("#change_from_phone_to_email, #change_from_email_to_phone"));
  setHidden($(".Signup__Body__ID__Email--Invalid"));

  // 入力の切り替え
  unsetHidden($(".Signup__Body__ID__Phone"));
  setHidden($(".Signup__Body__ID__Email"));

  // 次へボタンの有効/無効判定
  activateBtnConfirmID();
}

/*
  ------------------------------------------
  メール入力に変更する関数
  ------------------------------------------
*/
function changeIntoEmailInput() {
  // 入力値の初期化
  $("#input-phone").val("");

  // 隠し要素のリセット
  unsetHidden($("#change_from_phone_to_email, #change_from_email_to_phone"));
  setHidden($(".Signup__Body__ID__Phone--Invalid"));

  // 入力の切り替え
  unsetHidden($(".Signup__Body__ID__Email"));
  setHidden($(".Signup__Body__ID__Phone"));

  // 次へボタンの有効/無効判定
  activateBtnConfirmID();
}

/*
  ------------------------------------------
  ID必須チェック関数
  ------------------------------------------
*/
function validateRequired() {
  // 電話入力ありの場合
  if ($("#input-phone").val()) {return validateName() && validatePhone();}

  //メール入力ありの場合
  if ($("#input-email").val()) {return validateName() && validateEmail();}

  return false;
}

/*
  ------------------------------------------
  ID入力時の次へボタン有効化チェック関数
  ------------------------------------------
*/
function activateBtnConfirmID() {
  validateRequired() ? $("#btn-confirm-id").removeAttr("disabled") : $("#btn-confirm-id").attr("disabled", "disabled");
}

/*
  ------------------------------------------
  パスワード入力時の次へボタン有効化チェック関数
  ------------------------------------------
*/
function activateBtnRegisterPassword() {
  validatePassword() ? $("#btn-register-password").removeAttr("disabled") : $("#btn-register-password").attr("disabled", "disabled");
}

$(function() {
  /*
    -------------------------------------
    イベント：電話番号入力に変える
    -------------------------------------
  */
  $("#change_from_email_to_phone").on("click", changeIntoPhoneInput);

  /*
    -------------------------------------
    イベント：メール入力に変える
    -------------------------------------
  */
  $("#change_from_phone_to_email").on("click", changeIntoEmailInput);

  /*
    -------------------------------------
    イベント：名前入力時のバリデーションと名前文字数カウント
    -------------------------------------
  */
  $("#input-name").on("input", function() {
    // 文字数の表示
    $(".Signup__Body__ID__Name--Wordcounter").text($("#input-name").val().length + "/50");

    // 名前のバリデーション
    validateName() ? (
      // OKの場合はエラーメッセージを非表示
      setHidden($(".Signup__Body__ID__Name--No-name-error"))
    ) : (
      // NGの場合はエラーメッセージを表示
      unsetHidden($(".Signup__Body__ID__Name--No-name-error"))
    );

    // 次へボタン有効化チェック
    activateBtnConfirmID();
  });

  /*
    -------------------------------------
    イベント：メールのバリデーション
    -------------------------------------
  */
  $("#input-email").on("input", function() {
    // OKの場合はエラーメッセージを非表示
    // NGの場合はエラーメッセージを表示
    validateEmail() ? setHidden($(".Signup__Body__ID__Email--Invalid")) : unsetHidden($(".Signup__Body__ID__Email--Invalid"));

    // 次へボタン有効化チェック
    activateBtnConfirmID();
  });

  /*
    -------------------------------------
    イベント：電話番号のバリデーション
    -------------------------------------
  */
  $("#input-phone").on("input", function() {
    // OKの場合はエラーメッセージを非表示
    // NGの場合はエラーメッセージを表示
    validatePhone() ? setHidden($(".Signup__Body__ID__Phone--Invalid")) : unsetHidden($(".Signup__Body__ID__Phone--Invalid"));

    // 次へボタン有効化チェック
    activateBtnConfirmID();
  });

  /*
    -------------------------------------
    イベント：パスワードのバリデーション
    -------------------------------------
  */
  $("#input-password").on("input", function() {
    // OKの場合はエラーメッセージを非表示
    // NGの場合はエラーメッセージを表示
    validatePassword() ? setHidden($(".Signup__Body__Password--Invalid")) : unsetHidden($(".Signup__Body__Password--Invalid"));

    // 次へボタン有効化チェック
    activateBtnRegisterPassword();
  });

  /*
    -------------------------------------
    イベント：次へボタン押下
    -------------------------------------
  */
  $("#btn-confirm-id").on("click", function() {
    // 不要な要素を非表示
    setHidden($(".Signup__Body__ID__Name--Wordcounter"));
    setHidden($("#btn-confirm-id, #change_from_email_to_phone, #change_from_phone_to_email"));

    // 必要な要素を表示
    unsetHidden($("#btn-retry-id, .Signup__Body__ID__Fix"));
  });

  /*
    -------------------------------------
    イベント：戻るボタン押下、入力内容の訂正
    -------------------------------------
  */
  $("#btn-retry-id, #input-name, #input-phone, #input-email").on("click", function(e) {
    // 必要な要素を表示
    unsetHidden($("#btn-confirm-id, .Signup__Body__ID__Name--Wordcounter"));

    // 不要な要素を非表示
    setHidden($("#btn-retry-id, .Signup__Body__ID__Fix"));

    // 入力フォームの再表示
    if ($("#input-phone").val()) {changeIntoPhoneInput();}
    if ($("#input-email").val()) {changeIntoEmailInput();}
  });

  /*
    -------------------------------------
    イベント：登録ボタン押下（パスワード入力へ遷移）
    -------------------------------------
  */
  $("#btn-fix-id").on("click", function() {
    // ID入力ブロックを非表示
    setHidden($(".Signup__Body__ID"));
    setHidden($("#btn-confirm-id, #btn-retry-id"));

    // パスワード入力ブロックを表示
    unsetHidden($(".Signup__Body__Password"));
    unsetHidden($("#btn-register-password"));
  });
});
