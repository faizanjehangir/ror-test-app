require 'rails_helper'

RSpec.describe Offer, type: :model do
  describe '.available_for_user' do
    let(:user) { create(:user, age: 25, gender: 'MALE') }
    let(:claimed_offer) { create(:offer) }
    let(:unclaimed_offer) { create(:offer, age: 25, gender: 'MALE') }
    let(:another_offer) { create(:offer, age: 20, gender: 'FEMALE') }

    before do
      create(:claimed_offer, user: user, offer: claimed_offer)
    end

    it 'returns offers that match the user age and gender' do
      offers = Offer.available_for_user(user)
      expect(offers).to include(unclaimed_offer)
      expect(offers).not_to include(another_offer)
    end

    it 'excludes offers that the user has already claimed' do
      offers = Offer.available_for_user(user)
      expect(offers).not_to include(claimed_offer)
    end
  end
end