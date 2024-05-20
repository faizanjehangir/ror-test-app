class Offer < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :claimed_offers
  has_many :users, through: :claimed_offers

  scope :active, -> { where(active: true) }

  before_create :set_default_active

  private

  def set_default_active
    self.active = true if self.active.nil?
  end
end
