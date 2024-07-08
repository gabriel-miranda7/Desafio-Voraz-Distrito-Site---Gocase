require 'jwt'

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
    def create
      @user = User.create(user_params)
      if @user.valid?
        token = encode_token({ user_id: @user.id })
        render json: { user: @user, token: token }, status: :ok
      else
        render json: { error: 'Algo deu errado ao criar o usuário' }, status: :unprocessable_entity
      end
    end
  
    def login
    @user = User.find_by(username: user_params[:username])
    if @user && @user.authenticate(user_params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { error: 'Algo deu errado ao logar o usuário' }, status: :unprocessable_entity
    end
    end


    private
  
    def user_params
      params.permit(:username, :password, :email) # Corrigido para :mail
    end
  end
  