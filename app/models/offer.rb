class Offer < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :claimed_offers
  has_many :users, through: :claimed_offers
end
