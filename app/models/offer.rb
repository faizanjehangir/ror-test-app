class Offer < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :claimed_offers
  has_many :users, through: :claimed_offers

  scope :active, -> { where(active: true) }

  before_create :set_default_active

  def self.available_for_user(user)
    claimed_offer_ids = user.claimed_offers.active.pluck(:offer_id)

    where.not(id: claimed_offer_ids)
      .where('age = ? OR age IS NULL', user.age)
      .where('gender = ? OR gender IS NULL', user.gender)
      .order(created_at: :desc)
  end

  private

  def set_default_active
    self.active = true if self.active.nil?
  end
end
