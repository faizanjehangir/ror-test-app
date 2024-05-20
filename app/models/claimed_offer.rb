class ClaimedOffer < ApplicationRecord
  belongs_to :user
  belongs_to :offer

  scope :active, -> { where(active: true) }

  before_create :set_default_active

  private

  def set_default_active
    self.active = true if self.active.nil?
  end
end
