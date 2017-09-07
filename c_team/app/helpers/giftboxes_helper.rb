module GiftboxesHelper
  def checked?(id)
    unless cookies.signed[:check_products].nil?
      liked_list = cookies.signed[:check_products]
      return liked_list.include?(id.to_s)
    end
  end
end
