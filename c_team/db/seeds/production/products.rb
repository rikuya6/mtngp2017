Faker::Config.locale = :ja

#path = Rails.root.join('db/seeds/development', "product1.png")

1.upto(20) do |idx|
  product = Product.new(
    name: Faker::Book.title + "#{idx}",
    price: idx * 100,
    weight: idx * 5,
    stock: idx,
    note: Faker::Lorem.paragraph
    #image:
  )
  color = Faker::Color.hex_color
  product.remote_image_url = Faker::Placeholdit.image("250x250", 'png', color.delete("#"))
  product.save!
end
