class CreateBaseTables < ActiveRecord::Migration
  def self.up
    # ユーザ
    create_table :users do |t|
      t.string  :email,            null: false
      t.boolean :administrator,    null: false, default: false
      t.string  :password_digest,  null: false

      t.timestamps null: false
    end

    # 注文
    create_table :orders do |t|
      t.integer :product_id,  null: false
      t.integer :user_id,     null: false
      t.integer :wrapping_id, null: false
      t.text    :dest,        null: false
      t.string  :zipcode,     null: false
      t.string  :payment,     null: false

      t.timestamps null: false
    end

    # ラッピング
    create_table :wrappings do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    # 商品
    create_table :products do |t|
      t.string    :name,    null: false
      t.integer   :price,   null: false
      t.integer   :weight,  null: false
      t.integer   :stock,   null: false
      t.text      :note,    null: false
      t.string    :image

      t.timestamps null: false
    end

    # カテゴリ
    create_table :categories do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    # 商品カテゴリ
    create_table :product_categories do |t|
      t.integer :product_id,  null: false, index: true
      t.integer :category_id, null: false, index: true

      t.timestamps null: false
    end

    # 箱
    create_table :boxes do |t|
      t.integer :capacity,  null: false
      t.string  :box_type,  null: false
      t.integer :price,     null: false

      t.timestamps null: false
    end

    # ギフトボックス
    create_table :giftboxes do |t|
      t.integer :box_id, null: false

      t.timestamps null: false
    end

    # 箱明細
    create_table :box_details do |t|
      t.integer :giftbox_id,  null: false, index: true
      t.integer :product_id,  null: false, index: true

      t.timestamps null: false
    end

    create_table :rules do |t|
      t.integer :category1_id, null: false, index: true
      t.integer :category2_id, null: false, index: true
    end
  end

  def self.down
    drop_table :users
    drop_table :orders
    drop_table :wrappings
    drop_table :products
    drop_table :categories
    drop_table :product_categories
    drop_table :boxes
    drop_table :giftboxes
    drop_table :box_details
    drop_table :rules
  end
end
