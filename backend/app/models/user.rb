require "matrix"
class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true

    def create_user_profile
        # Create vector that represents user profile
        @user_profile = Vector[self.masculine_cloth_score, self.feminine_cloth_score, self.electronic_score, self.jewelry_score]
    end
end
