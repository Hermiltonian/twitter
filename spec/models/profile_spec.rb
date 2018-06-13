require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe '#create' do
    context 'Fail to create' do
      it 'is invalid without a name' do
        profile = build(:profile, name: nil)
        profile.valid?
        expect(profile.errors[:name]).to include("名前を入力してください。")
      end
      it 'is invalid with a too long name' do
        profile = build(:profile, name: "123456789|123456789|123456789|123456789|123456789|a")
        profile.valid?
        expect(profile.errors[:name]).to include("名前は50文字以下にしてください。")
      end
      it 'is invalid with a too long biography' do
        profile = build(:profile, biography: "123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|a")
        profile.valid?
        expect(profile.errors[:biography]).to include("自己紹介は160文字以下にしてください。")
      end
      it 'is invalid without a theme color' do
        profile = build(:profile, theme_color: nil)
        profile.valid?
        expect(profile.errors[:theme_color]).to include("テーマカラーを入力してください。")
      end
      it 'is invalid with a illegal color format' do
        profile = build(:profile, theme_color: "red")
        profile.valid?
        expect(profile.errors[:theme_color]).to include("16進数で入力してください。")
      end
    end
    context 'Succeed to create' do
      it 'is valid with a max length name' do
        profile = build(:profile, name: "123456789|123456789|123456789|123456789|123456789|")
        expect(profile).to be_valid
      end
      it 'is valid with a max length biography' do
        profile = build(:profile, biography: "123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
        expect(profile).to be_valid
      end
      it 'is valid with only required attributes' do
        profile = build(:profile, biography: nil, location: nil, website: nil, birthday: nil, header_photo: nil)
        expect(profile).to be_valid
      end
      it 'is valid with full attributes' do
        profile = build(:profile)
        expect(profile).to be_valid
      end
    end
  end
end
