class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :profile

  # サインアップ時のUser.nameの自動生成
  def create_name(profile_name)
    key_length = 8
    char_list = []
    0.upto(25) { |n| char_list << (65 + n).chr }  # 英小文字
    0.upto(25) { |n| char_list << (97 + n).chr }  # 英大文字
    0.upto(9) { |n| char_list << n.to_s }         # 数字

    new_name = profile_name + "_"
    0.upto(key_length) { new_name += char_list.sample }

    self.name = new_name
  end

  protected

  # devise :validatableのメソッドオーバーライド
  def email_required?
    false
  end
end
