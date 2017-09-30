class CreateBaseTables < ActiveRecord::Migration
  def self.up
    # ユーザ
    create_table :users do |t|
      t.string  :name,            null: false
      t.text    :tutorial_data
      t.text    :data
      t.boolean :administrator,    null: false, default: false
      t.string  :password_digest,  null: false

      t.timestamps null: false
    end
  end

  def self.down
    drop_table :users
  end
end
