# == Schema Information
#
# Table name: giftboxes
#
#  id         :integer          not null, primary key
#  box_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Giftbox < ActiveRecord::Base

  # アクセサ
  attr_accessor :ids_product


  # 関連
  belongs_to :boxes


  # ギフトボックス 商品
  has_many :box_details, dependent: :destroy
  has_many :products, through: :box_details

  accepts_nested_attributes_for :box_details, allow_destroy: true


  # バリデーション
  validates :box_id,      presence: true

  validate :check_for_bad_combinations


  private

  def check_for_bad_combinations
    category_ids = ProductCategory.where(product_id: self.ids_product).pluck(:category_id)
    if Rule.where(category1_id: category_ids, category2_id: category_ids).present?
      errors.add(:bad_combinations, 'これらの商品は組み合わせることができません。')
    end
  end
end
