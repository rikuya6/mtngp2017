# == Schema Information
#
# Table name: orders
#
#  id          :integer          not null, primary key
#  product_id  :integer          not null
#  user_id     :integer          not null
#  wrapping_id :integer          not null
#  dest        :text             not null
#  zipcode     :string           not null
#  payment     :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Order < ActiveRecord::Base
  extend Enumerize

  # 関連
  belongs_to :user
  belongs_to :product
  belongs_to :wrapping

  accepts_nested_attributes_for :user
  accepts_nested_attributes_for :product
  accepts_nested_attributes_for :wrapping


  # 定義
  enumerize :payment, in: [:cash, :credit, :delivery]


  # 委譲メソッド
  def product_name; product.name end
  def product_price; product.price end
  def product_weight; product.weight end
  def product_stock; product.stock end
  def product_note; product.note end
  def wrapping_name; wrapping.try(:name) end
  def user_email; user.email end


  # バリデーション
  validates :product_id,  presence: true

  validates :user_id,     presence: true

  validates :wrapping_id, presence: true

  validates :dest,        presence: {
                            allow_blank: true,
                          }

  validates :zipcode,     presence: true,
                          format: {
                            allow_blank: true,
                            with: /\A\d{3}[-]\d{4}/,
                          }
  validates :payment,     presence: true
end
