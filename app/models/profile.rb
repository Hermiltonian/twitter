class Profile < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 50, allow_blank: true }
  validates :biography, length: { maximum: 160 }
  validates :theme_color, presence: true, format: { with: /\A[0-9a-f]{6}\z/, allow_blank: true , message: "16進数で入力してください。" }
end
