# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  tutorial_data   :text
#  data            :text
#  administrator   :boolean          default(FALSE), not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  serialize :tutorial_data
  serialize :data
  # include EmailAddressChecker

  # before_save { email.downcase! }


  # 関連

  # バリデーション
  # validate  :check_email

  validates :name,        presence: true,
                          uniqueness: { case_sensitive: false }

  validates :password,    presence: { on: :create, },
                          length: {
                            allow_blank: true,
                            minimum: 4,
                          }


  # メソッド
  has_secure_password


  # プライベートメソッド
  private

  # def check_email
  #   if email.present?
  #     errors.add(:email, :invalid) unless well_formed_as_email_address(email)
  #   end
  # end
end
