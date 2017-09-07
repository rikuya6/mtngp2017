2.upto(3) do |idx|
  Rule.create!(
    category1: Category.find(idx),
    category2: Category.find(idx + 1)
  )
end
