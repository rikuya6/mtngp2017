# == Schema Information
#
# Table name: box_details
#
#  id         :integer          not null, primary key
#  giftbox_id :integer          not null
#  product_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoxDetail < ActiveRecord::Base

  # 関連
  belongs_to :giftbox
  belongs_to :product

  accepts_nested_attributes_for :product
end
