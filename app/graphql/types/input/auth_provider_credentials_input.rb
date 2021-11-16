module Types
  module Input
    class AuthProviderCredentialsInput < Types::BaseInputObject
      argument :email, String, required: true
      argument :password_digest, String, required: true
    end
  end
end