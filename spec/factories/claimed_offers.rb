FactoryBot.define do
  factory :claimed_offer do
    association :user
    association :offer
    active { true }
  end
end
