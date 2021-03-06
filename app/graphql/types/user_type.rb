module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :nickname, String, null: true
    field :email, String, null: true
    field :password_digest, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :posts, [Types::PostType], null: false
  end
end
