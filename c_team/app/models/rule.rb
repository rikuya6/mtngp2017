# == Schema Information
#
# Table name: rules
#
#  id           :integer          not null, primary key
#  category1_id :integer          not null
#  category2_id :integer          not null
#

class Rule < ActiveRecord::Base

  # 関連
  belongs_to :category1, class_name: :Category
  belongs_to :category2, class_name: :Category


  # バリデーション
  validates :category1_id,  presence: true

  validates :category2_id,  presence: true

  validate :check_uniq


  private

  def check_uniq
    return true if !category1_id.present? && !category2_id.present?
    return errors.add(:check_uniq, '同じカテゴリは登録できません。') if category1_id == category2_id
    if Rule.where(category1_id: category1_id, category2_id: category2_id).present?
      errors.add(:check_uniq, 'この組み合わせはすでに登録されています。')
    end
    if Rule.where(category1_id: category2_id, category2_id: category1_id).present?
      errors.add(:check_uniq, 'この組み合わせはすでに登録されています。')
    end
  end
end
