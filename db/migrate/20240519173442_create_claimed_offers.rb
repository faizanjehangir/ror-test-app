class CreateClaimedOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :claimed_offers do |t|
      t.references :user, null: false, foreign_key: true
      t.references :offer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
