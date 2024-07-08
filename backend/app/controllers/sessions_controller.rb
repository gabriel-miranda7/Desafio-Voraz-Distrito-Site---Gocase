class SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
  
      if user&.valid_password?(params[:password])
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        render json: { token: token }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def destroy
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key).first
      current_user = User.find(jwt_payload['sub'])
      current_user.jti = jwt_payload['jti']
      current_user.save
      head :ok
    end
  end
  