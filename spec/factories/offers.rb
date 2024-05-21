FactoryBot.define do
  factory :offer do
    title { Faker::Commerce.product_name }
    description { Faker::Marketing.buzzwords }
    age { Faker::Number.between(from: 20, to: 30) }
    gender { %w[MALE FEMALE].sample }
  end
end
