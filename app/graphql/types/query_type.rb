module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # 全てのデータ取得
    # 配列なので型を配列型にしてる
    field :users, [Types::UserType], null: false
    def users
      User.all
    end

    # 引数の番号のデータを取得
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end
    def user(id:)
      User.find(id)
    end
  end
end
