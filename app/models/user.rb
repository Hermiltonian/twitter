class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :profile

  before_create :create_illegible_name

  validates :name,
   presence: true,
   uniqueness: { allow_blank: true },
   length: { maximum: 15, allow_blank: true },
   user_forbidden_words: true

  validates :phone_number,
   uniqueness: true,
   presence: { if: -> { email.blank? } }

  validates :email,
   uniqueness: true,
   presence: { if: -> { phone_number.blank? } }

  validates :password,
   length: { minimum: 6 },
   format: { with: /\A(?=.*[0-9])(?=.*[a-zA-Z]).{6,}\z/, message: "英数字を組み合わせてください。" }


  protected

  # devise :validatableのメソッドオーバーライド
  def email_required?
    false
  end

  private

  # サインアップ時のUser.nameの自動生成
  def create_illegible_name
    new_name = ""
    name_length = 10
    char_list = []

    0.upto(25) { |n| char_list << (65 + n).chr }  # 英小文字
    0.upto(25) { |n| char_list << (97 + n).chr }  # 英大文字
    0.upto(9) { |n| char_list << n.to_s }         # 数字

    1.upto(name_length) { new_name += char_list.sample }

    self.name = new_name
  end
end
