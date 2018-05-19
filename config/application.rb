require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Twitter
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # ジェネレータのデフォルト動作の変更
    config.generators do |g|
      g.assets false
      g.helper false
    end

    config.i18n.default_locale = :ja # デフォルトのロケール変更
    config.time_zone = 'Asia/Tokyo'  # デフォルトのタイムゾーン変更
    config.force_ssl = true          # SSL接続を強制
  end
end
