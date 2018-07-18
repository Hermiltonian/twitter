# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :profile do
    user
    name            Faker::Twitter.user[:screen_name]
    biography       Faker::Twitter.user[:description]
    location        Faker::Twitter.user[:location]
    website         Faker::Twitter.user[:url]
    birthday        Faker::Date.birthday(0,100)
    theme_color     Faker::Twitter.user[:profile_background_color].delete("#")
    profile_photo   Faker::Twitter.user[:profile_image_url]
    header_photo    Faker::Twitter.user[:profile_background_image_url]
  end
end
