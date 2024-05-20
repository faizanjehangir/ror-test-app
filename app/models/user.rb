class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :password, presence: true

  has_many :claimed_offers
  has_many :offers, through: :claimed_offers

  scope :active, -> { where(active: true) }

  before_create :set_default_active

  def self.validate_gender(gender)
    return nil if gender.nil? || gender.strip.empty?
    gender
  end

  def self.calculate_age(birth_year)
    return nil if birth_year.nil? || birth_year <= 0

    current_year = Date.today.year
    current_year - birth_year
  end

  private

  def set_default_active
    self.active = true if self.active.nil?
  end
end
