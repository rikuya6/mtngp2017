User.create!(
  name: 'admin',
  password: 'password',
  password_confirmation: 'password',
  administrator: true
)

User.create!(
  name: 'user1',
  password: 'password',
  password_confirmation: 'password'
)

1.upto(10) do |idx|
  User.create(
    name: Faker::Internet.user_name(Faker::StarWars.character, %w(. _ -)),
    password: 'password',
    password_confirmation: 'password'
  )
end
