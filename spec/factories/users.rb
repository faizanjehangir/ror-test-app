FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { 'password' }
    age { Faker::Number.between(from: 20, to: 80) }
    gender { %w[MALE FEMALE].sample }
  end
end
