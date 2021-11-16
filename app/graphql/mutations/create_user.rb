module Mutations
  class CreateUser < BaseMutation
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::Input::AuthProviderCredentialsInput, required: false
    end
    fields :user, Types::UserType, null: false

    argument :nickname, String, required: false
    argument :auth_provider, AuthProviderSignupData, required: false

    def resolve(nickname: nil, auth_provider: nil)
      user = User.create!(
              nickname: nickname,
              email: auth_provider&.[](:credentials)&.[](:email),
              password: auth_provider&.[](:credentials)&.[](:password_digest)
             )
      { user: user }
    end
  end
end
