1.upto(2) do |idx|
  ProductCategory.create!(
    product_id: idx,
    category_id: 2
  )
end

product_cnt = Product.count
3.upto(product_cnt) do |idx|
  ProductCategory.create!(
    product_id: idx,
    category_id: 3
  )
end
