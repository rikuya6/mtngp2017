1.upto(5) do |idx|
  Box.create!(
    capacity: idx * 10,
    box_type: "タイプ#{idx}",
    price: idx * 100
  )
end

Box.create!(
  capacity: 500,
  box_type: 'スーパキャパシティボックス',
  price: 2000
)
