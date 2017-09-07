Faker::Config.locale = :ja

users = User.all.order(:created_at)
users.each do |user|
  1.upto(3) do |order_idx|
    dest = Faker::Address.city
    dest += Faker::Address.street_name
    dest += Faker::Address.street_name
    user.orders.create!(
      product_id: order_idx,
      wrapping_id: order_idx,
      dest: dest,
      zipcode: Faker::Address.zip_code,
      payment: :cash
    )
  end
end
