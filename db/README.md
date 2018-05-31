# DB設計
## テーブル一覧
|No|テーブル名|用途|
|--|--------|---|
|1|users|アカウントの基本情報を保有する。テーブル定義はdevise gemによるusersテーブルをベースとする。|
|2|profiles|ユーザーのプロフィール情報を保有する|
|3|config_informations|ユーザー情報の設定内容を保有する|
|4|config_privacies|ユーザーのプライバシー設定内容を保有する|
|5|config_safeties|ユーザーのセキュリティ設定内容を保有する|
|6|config_personalizations|ユーザーのコンテンツのカスタマイズ設定内容を保有する|
|7|config_mobiles|ユーザーのモバイル設定内容を保有する|
|8|config_email_notifications|ユーザーのメール通知設定内容を保有する|
|9|config_notifications|ユーザーの通知設定内容を保有する|
|10|config_web_notifications|ユーザーのWeb通知設定内容を保有する|
|11|config_muted_words|ユーザーのミュートしているキーワード情報を保有する|
|12|config_accessibilities|ユーザーのユーザー補助設定内容を保有する|
|13|languages|設定可能な言語情報を保有する|
|14|countries|設定可能な国情報を保有する|
|15|photo_taggings|自分を画像にタグ付けする設定の設定可能な値を保有する|
|16|for_teams|チームで利用する設定の設定可能な値を保有する|
|17|sending_frequencies|話題のツイートのメール通知頻度設定の設定可能な値を保有する|
|18|mutes|ユーザーのミュートしているアカウント情報を保有する|
|19|blocks|ユーザーのブロックしているアカウント情報を保有する|
|20|tweets|ツイート情報を保有する|
|21|retweets|リツイート情報を保有する|
|22|hashtags|ハッシュタグ情報を保有する|
|23|taggings|ハッシュタグ付けツイート情報を保有する|
|24|follows|フォロー情報を保有する|
|25|likes|いいね情報を保有する|
|26|replies|返信情報を保有する|
|27|lists|リスト情報を保有する|
|28|list_registrations|リスト登録情報を保有する|
|29|list_members|リストに追加されたユーザー情報を保有する|
|30|direct_messages|ダイレクトメッセージ情報を保有する|
|31|dm_groups|ダイレクトメッセージグループ情報を保有する|
|32|groups_users|ダイレクトメッセージグループの所属情報を保有する|

## usersテーブル
### テーブル定義
devise gemにより作成されるテーブルに最初から定義された属性であっても、機能要件により必要なものは改めて記載する。

|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|false|-|true|ユーザーID|
|name|string|-|15|false|(1)|true|ユーザー名|
|email|string|-|-|false|""|-|emailアドレス|
|phone_number|string|-|-|false|""|-|電話番号|
|password|string|-|-|false|-|-|パスワード|

(1) ActiveRecode上は空文字とするが、アカウント作成時はランダムなユーザー名を割り当てる

### バリデーション
|属性名|バリデーション内容|
|-----|---------------|
|name|15文字以下、英数字とアンダーバーのみ許可、"Twitter"や"Adimin"は含められない、必須、一意|
|email|一意、phone_numberと合わせて少なくとも一方は必須|
|phone_number|一意、phone_numberと合わせて少なくとも一方は必須|
|password|confirmation、必須|

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_one|:profile, :config_information, :config_privacy, :config_safety, :config_personalization, :config_mobile, :config_email_notification, :config_notification, :config_web_notification, :config_accessibility|
|has_many|:config_muted_words, :mutes, :blocks, :tweets, :likes, :groups_users, :dm_groups through: :groups_users, :list_members, :lists, :list_registrations, :follows|

## profilesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|name|string|-|50|false|-|true|表示名|
|biography|string|-|160|-|-|-|自己紹介|
|location|string|-|-|-|-|-|場所|
|website|string|-|-|-|-|-|ホームページ|
|birthday|date|-|-|-|-|-|誕生日|
|theme_color|string|-|-|false|1da1f2|-|テーマカラー|
|profile_photo|string|-|-|false|empty_avatar.png|-|プロフィール画像|
|header_photo|string|-|-|-|-|-|ヘッダー画像|

### バリデーション
|属性名|バリデーション内容|
|-----|---------------|
|name|50文字以下、必須|
|biography|160文字以下|
|theme_color|16進数3バイト表記のみ許可、必須|

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:users|

## config_informationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|lang|references|FK|-|false|日本語|-|言語設定|
|time_zone|string|-|-|false|Tokyo|-|タイムゾーン|
|loging_verification|boolean|-|-|false|false|-|ログイン認証|
|no_username_only_password_reset|boolean|-|-|false|false|-|パスワードのリセットに個人情報を使う|
|country_id|references|FK|-|false|日本|-|コンテンツの国|
|autoplay|boolean|-|-|false|true|-|動画の自動再生|
|personalize_timeline|boolean|-|-|false|true|-|重要な新着ツイートをトップに表示|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :country, :language|

## config_privaciesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|protected|boolean|-|-|false|false|-|ツイートを非公開にする|
|geo_enabled|boolean|-|-|false|false|-|位置情報付きでツイート|
|photo_tagging_id|references|FK|-|false|1|-|自分を画像にタグ付けすることを許可|
|discoverable_by_email|boolean|-|-|false|true|-|メールアドレスの照合と通知を許可する|
|mobile_discoverable|boolean|-|-|false|true|-|電話番号の照合と通知を許可する|
|for_team_id|references|FK|-|false|1|-|チームでの使用|
|allow_dms_from_anyone|boolean|-|-|false|false|-|すべてのユーザーからダイレクトメッセージを受信する|
|allow_dm_receipts|boolean|-|-|false|true|-|既読通知の送信/受信|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :for_team, :photo_tagging|

## config_safetiesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|hide_sensitive_content|boolean|-|-|false|true|-|不適切な内容を表示しない|
|remove_blocked_and_muted_accounts|boolean|-|-|false|true|-|ブロックまたはミュートしているアカウントを除外|
|display_sensitive_media|boolean|-|-|false|false|-|センシティブな内容を含む可能性のある画像/動画を表示する|
|mark_media_sensitive|boolean|-|-|false|false|-|ツイートする画像/動画をセンシティブな内容を含むものとして設定する|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## config_personalizationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|allow_ads_personalization|boolean|-|-|false|true|-|広告をカスタマイズ|
|allow_logged_out_device_personalization|boolean|-|-|false|true|-|すべての端末間でカスタマイズ|
|allow_location_history_personalization|boolean|-|-|false|true|-|位置情報をもとにカスタマイズ|
|use_cookie_personalization|boolean|-|-|false|false|-|Twitterコンテンツを閲覧したウェブの場所を追跡|
|allow_sharing_data_for_third_party_personalization|boolean|-|-|false|true|-|お客様のデータをTwitterのビジネスパートナーと共有する|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## config_mobilesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|country_id|references|FK|-|false|日本|-|国|
|phone_number|string|-|-|-|-|-|携帯の電話番号|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :country|

## config_email_notificationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|send_network_activity_email|boolean|-|-|false|true|-|新しい通知があります|
|send_new_direct_text_email|boolean|-|-|false|true|-|ダイレクトメッセージを受けとったとき|
|send_shared_tweet_email|boolean|-|-|false|true|-|誰かがツイートをメールしたとき|
|network_digest_schedule|boolean|-|-|false|true|-|話題のツイートの頻度|
|sending_frequency_id|references|FK|-|false|1|-|送信頻度|
|performance_digest_schedule|boolean|-|-|false|true|-|ツイートのパフォーマンスに関する更新|
|send_email_newsletter|boolean|-|-|false|true|-|Twitterの商品や機能更新に関するお知らせ|
|send_activation_email|boolean|-|-|false|true|-|Twitterを使いこなすためのヒント|
|send_resurrection_email|boolean|-|-|false|true|-|未読の新着ツイート|
|send_partner_email|boolean|-|-|false|true|-|パートナー製品やサードパーティーサービスなどに関するTwitterからのお知らせ|
|send_survey_email|boolean|-|-|false|true|-|アンケートに関するお知らせ|
|send_follow_recs_email|boolean|-|-|false|true|-|おすすめユーザー|
|send_similar_people_email|boolean|-|-|false|true|-|最近のフォローに基づいたおすすめユーザー|
|send_smb_sales_marketing_email|boolean|-|-|false|true|-|Twitterのビジネス向けサービスについてのヒント|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :sending_frequency|

## config_notificationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|following_filter_enabled|boolean|-|-|false|false|-|フォローしていないアカウント|
|filter_not_followed_by_enabled|boolean|-|-|false|false|-|フォローされていないアカウント|
|filter_new_users_enabled|boolean|-|-|false|false|-|新しいアカウント|
|filter_default_profile_image_enabled|boolean|-|-|false|false|-|プロフィール画像が設定されていないアカウント|
|filter_no_confirmed_email_enabled|boolean|-|-|false|false|-|メールアドレスが未認証のアカウント|
|filter_no_confirmed_phone_enabled|boolean|-|-|false|false|-|電話番号が未認証のアカウント|
|quality_filter_enabled|boolean|-|-|false|true|-|クオリティフィルター|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## config_web_notificationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|browser_notification_enabled|boolean|-|-|false|false|-|ブラウザ通知をオンにする|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## config_muted_wordsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|muted_word|string|PK|-|false|-|-|ミュート対象キーワード|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## config_accessibilitiesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|alt_text_compose_enabled|boolean|-|-|false|false|-|画像の説明を追加|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## languagesテーブル
### テーブル定義

|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|false|-|-|ID|
|value|string|-|-|false|-|-|コード値|
|name|string|-|-|false|-|-|表示名|

### バリデーション
|属性名|バリデーション内容|
|-----|---------------|
|value|一意|
|name|一意|

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:config_informations|

## countriesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|false|-|-|ID|
|value|string|-|-|false|-|-|コード値|
|name|string|-|-|false|-|-|表示名|
|using_config_information|boolean|-|-|false|true|-|ユーザー情報でのコンテンツの国設定で使用するタプルかどうかを識別する|
|using_config_mobiles|boolean|-|-|false|true|-|モバイル設定での国設定で使用するタプルかどうかを識別する|

### バリデーション
|属性名|バリデーション内容|
|-----|---------------|
|value|一意|
|name|一意|

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:config_mobiles, :config_informations|

## photo_taggingsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id  |integer|PK|-|false|-|-|ID|
|description|string|-|-|false|-|-|設定項目名|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:config_privacies|

## for_teamsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id  |integer|PK|-|false|-|-|ID|
|description|string|-|-|false|-|-|設定項目名|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:config_privacies|

## sending_frequenciesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id  |integer|PK|-|false|-|-|ID|
|description|string|-|-|false|-|-|設定項目名|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:config_email_notifications|

## mutesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|muted_user_id|references|PK, FK|-|false|-|-|ミュート対象ユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## blocksテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|ユーザーID|
|blocked_user_id|references|PK, FK|-|false|-|-|ブロック対象ユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## tweetsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|-|-|true|ツイートID|
|text|string|-|280|-|-|-|ツイートテキスト|
|image_1|string|-|-|-|-|-|写真1ファイル名|
|image_2|string|-|-|-|-|-|写真2ファイル名|
|image_3|string|-|-|-|-|-|写真3ファイル名|
|image_4|string|-|-|-|-|-|写真4ファイル名|
|gif|string|-|-|-|-|-|GIF画像ファイル名|
|movie|string|-|-|-|-|-|動画ファイル名|
|created_at|timestamp|-|-|false|-|-|ツイート日時|
|user_id|references|FK|-|false|-|-|ツイートユーザーID|
|likes_count|integer|-|-|false|0|-|いいね合計数|
|retweets_count|integer|-|-|false|0|-|リツイート合計数|
|replies_count|integer|-|-|false|0|-|返信合計数|
|plays_count|integer|-|-|false|0|-|動画再生回数|

### バリデーション
|属性名|バリデーション内容|
|-----|---------------|
|text|text, image_1, image_gif, movieの少なくともいずれか一つが必須|
|image_1|text, image_1, image_gif, movieの少なくともいずれか一つが必須|
|image_gif|text, image_1, image_gif, movieの少なくともいずれか一つが必須|
|movie|text, image_1, image_gif, movieの少なくともいずれか一つが必須|

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|
|has_many|:likes, :replies, :taggings, :hashtags through: :taggings, :retweets|

## retweetsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|tweet_id|references|PK, FK|-|false|-|-|リツイートしたツイートID|
|retweet_id|references|PK, FK|-|false|-|-|リツイートされたツイートID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:tweet|

## hashtagsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|-|-|-|ID|
|name|string|-|-|false|-|true|タグ名|
|taggings_count|integer|-|-|false|0|-|ツイート回数|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:taggings, :tweets through: :taggings|

## taggingsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|hashtag_id|references|PK, FK|-|false|-|-|ハッシュタグID|
|tweet_id|references|PK, FK|-|false|-|-|ハッシュタグ付けされたツイートID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:hashtag, :tweet|

## followsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|フォローしたユーザーID|
|user_id|references|PK, FK|-|false|-|-|フォローされたユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|

## likesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|user_id|references|PK, FK|-|false|-|-|いいねしたユーザーID|
|tweet_id|references|PK, FK|-|false|-|-|いいねされたツイートID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :tweet|

## repliesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|tweet_id|references|PK|-|-|-|-|返信ツイートのID|
|replied_tweet_id|references|PK|-|-|-|-|返信先のツイートID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:tweet|

## listsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|-|-|-|リストID|
|user_id|references|PK, FK|-|false|-|-|リストを作成したユーザーID|
|name|string|-|25|false|-|-|リスト名|
|description|string|-|100|-|-|-|リストの説明|
|public|boolean|-|-|false|true|-|公開設定|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user|
|has_many|:list_registrations, :list_members|

## list_registrationsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|list_id|references|PK, FK|-|-|-|-|リストID|
|user_id|references|PK, FK|-|-|-|-|リストを登録したユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :list|

## list_membersテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|list_id|references|PK, FK|-|-|-|-|リストID|
|user_id|references|PK, FK|-|-|-|-|リストに追加されたユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :list|

## direct_messagesテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|message_id|integer|PK|-|-|-|-|メッセージID|
|group_id|integer|FK|-|-|-|-|グループID|
|user_id|references|FK|-|false|-|-|送信ユーザーID|
|text|string|-|280|-|-|-|メッセージテキスト|
|image|string|-|-|-|-|-|写真ファイル名|
|gif|string|-|-|-|-|-|GIF画像ファイル名|
|movie|string|-|-|-|-|-|動画ファイル名|
|created_at|timestamp|-|-|false|-|-|送信日時|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belogns_to|:dm_group|

## dm_groupsテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|id|integer|PK|-|-|-|-|グループID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|has_many|:direct_messages, :groups_users, :users through: :groups_users|

## groups_usersテーブル
### テーブル定義
|属性名|型|キー|limit|null|default|index|説明|
|----|---|---|-----|---|--------|-----|---|
|group_id|references|PK, FK|-|-|-|-|グループID|
|user_id|references|PK, FK|-|-|-|-|ユーザーID|

### バリデーション
なし

### アソシエーション
|アソシエーション|テーブル|
|-------------|-------|
|belongs_to|:user, :dm_group|
