class CreateOffersTable < ActiveRecord::Migration[7.0]
 def change
    create_table :offers do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :age, null: true
      t.string :gender, null: true
      t.boolean :active, default: true
      t.timestamps
    end
  end
end
