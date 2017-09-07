# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  capacity   :integer          not null
#  box_type   :string           not null
#  price      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Box < ActiveRecord::Base

  # 関連
  has_many :giftboxes, dependent: :destroy


  # バリデーション
  validates :capacity,  presence: true,
                        numericality: {
                          allow_blank: true,
                          greater_than: 0,
                          only_integer: true
                        }

  validates :box_type,  presence: true

  validates :price,     presence: true,
                        numericality: {
                          allow_blank: true,
                          greater_than: 0,
                          only_integer: true
                        }

end
