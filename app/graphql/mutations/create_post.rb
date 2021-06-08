module Mutations
  class CreatePost < BaseMutation
    field :post, Types::PostType, null: false

    argument :title, String, required: false
    argument :content, String, required: false
    argument :user_id, Integer, required: false

    def resolve(**params)
      post = Post.create!(params)
      { post: post }
    end
  end
end
