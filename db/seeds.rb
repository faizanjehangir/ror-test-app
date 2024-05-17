require 'faker'

gender = [nil, "MALE", "FEMALE"]

5.times do |i|
  Offer.create(
    title: Faker::Commerce.product_name,
    description: Faker::Marketing.buzzwords,
    age: Faker::Number.between(from: 20, to: 80),
    gender: gender.sample
  )
end