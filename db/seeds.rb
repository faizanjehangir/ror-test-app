require 'faker'

gender = [nil, "MALE", "FEMALE"]

100.times do |i|
  target_age = [nil, Faker::Number.between(from: 20, to: 80)].sample

  Offer.create(
    title: Faker::Commerce.product_name,
    description: Faker::Marketing.buzzwords,
    age: target_age,
    gender: gender.sample
  )
end