# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do
  user = User.create!(
    nickname: Faker::Name::name,
    email: Faker::Internet.email,
    password: "password",
    password_confirmation: "password"
  )
  2.times do
    user.posts.create!(title: Faker::Lorem::sentence(word_count: 5), content: Faker::Lorem::paragraph(sentence_count: 4))
  end
end