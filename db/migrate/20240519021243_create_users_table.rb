class CreateUsersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :age, null: true
      t.string :gender, null: true
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
