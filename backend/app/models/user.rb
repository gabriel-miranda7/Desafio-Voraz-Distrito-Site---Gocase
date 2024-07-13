require "matrix"
class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true

    before_create :initialize_scores

    def create_user_profile
        # Create vector that represents user profile
        @user_profile = Vector[self.masculine_cloth_score || 2, self.feminine_cloth_score || 2, self.electronic_score || 2, self.jewelry_score ||2]
    end

    private
    def initialize_scores
        self.masculine_cloth_score ||= 2
        self.feminine_cloth_score ||= 2
        self.electronic_score ||= 2
        self.jewelry_score ||= 2
      end
end
