module Types
  module Input
    class PostInputType < Types::BaseInputObject
      argument :id, Int, required: true
      argument :title, String, required: false
      argument :content, String, required: false
    end
  end
end