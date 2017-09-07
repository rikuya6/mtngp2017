# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base

  # 関連
  has_many :product_categories, dependent: :destroy
  has_many :products, through: :product_category
  has_many :category1_id, class_name: :Rule, foreign_key: :category1_id, dependent: :destroy
  has_many :category2_id, class_name: :Rule, foreign_key: :category2_id, dependent: :destroy


  # バリデーション
  validates :name,  presence: true,
                    uniqueness: true
end
