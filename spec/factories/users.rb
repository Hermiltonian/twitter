FactoryGirl.define do
  factory :user do
    password = Faker::Internet.password(8)

    name                  Faker::Name.last_name
    phone_number          Faker::Number.number(11)
    email                 Faker::Internet.email
    password              password
    password_confirmation password
  end
end
