require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#create' do
    context 'Fail to create user with an invalid name' do
      it 'is invalid with a blank name' do
        user = build(:user, name: nil)
        user.valid?
        expect(user.errors[:name]).to include("アカウント名を入力してください。")
      end

      it 'is invalid with a too long name' do
        user = build(:user, name: "aaaaabbbbbcccccZ")
        user.valid?
        expect(user.errors[:name]).to include("アカウント名は15文字以下にしてください。")
      end

      it 'is invalid with a duplicate name' do
        user1 = create(:user, phone_number: "09011110000", email: "test1@example.com")
        user1.name = "test"
        user1.save

        user2 = build(:user, name: "test", phone_number: "09022220000", email: "test2@example.com")
        user2.valid?
        expect(user2.errors[:name]).to include("このアカウント名は既に使われています。他の名前を入力してください。")
      end

      it 'is invalid with including the Twitter word' do
        user = build(:user, name: "user_twitter")
        user.valid?
        expect(user.errors[:name]).to include("使用できない単語を含んでいます。")
      end

      it 'is invalid with including the Admin word' do
        user = build(:user, name: "user_admin")
        user.valid?
        expect(user.errors[:name]).to include("使用できない単語を含んでいます。")
      end
    end

    context 'Fail to ceate user with an invalid phone number and email' do
      it 'is invalid without phone number and email' do
        user = build(:user, phone_number: "", email: "")
        user.valid?
        expect(user.errors[:phone_number]).to include("電話番号を入力してください。")
      end

      it 'is invalid with a duplicate phone number' do
        user1 = create(:user, phone_number: "09012341234", email: "")
        user2 = build(:user, phone_number: "09012341234", email: "")
        user2.valid?
        expect(user2.errors[:phone_number]).to include("この電話番号は既に使われています。他の電話番号を入力してください。")
      end

      it 'is invalid with a duplicate email' do
        user1 = create(:user, phone_number: "", email: "test@example.com")
        user2 = build(:user, phone_number: "", email: "test@example.com")
        user2.valid?
        expect(user2.errors[:email]).to include("このメールアドレスは既に使われています。他のメールアドレスを入力してください。")
      end
    end

    context 'Fail to create user with an invalid password' do
      it 'is invalid with a too short password' do
        user = build(:user, password: "1234a")
        user.valid?
        expect(user.errors[:password]).to include("パスワードは6文字以上入力してください。")
      end

      it 'is invalid without complexicity password' do
        user = build(:user, password: "12345678")
        user.valid?
        expect(user.errors[:password]).to include("英数字を組み合わせてください。")
      end
    end

    context 'Succeed to create user' do
      it 'is calid with a max length name' do
        user = build(:user, name: "aaaaabbbbbccccc")
        expect(user).to be_valid
      end

      it 'is valid with only phone number' do
        user = build(:user, phone_number: "09012341234", email: "")
        expect(user).to be_valid
      end

      it 'is valid with only email' do
        user = build(:user, phone_number: "", email: "test@example.com")
        expect(user).to be_valid
      end
    end
  end
end
