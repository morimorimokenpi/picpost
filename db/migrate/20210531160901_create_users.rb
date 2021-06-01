class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :nickname, limit: 128
      t.string :email
      t.string :password_digest, default: ""

      t.timestamps
    end
  end
end
