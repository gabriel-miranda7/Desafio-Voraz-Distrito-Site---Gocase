require "jwt"

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
    def create
      @user = User.create(user_params)
      @user.masculine_cloth_score = 2
      @user.feminine_cloth_score = 2
      @user.electronic_score = 2
      @user.jewelry_score = 2
      if @user.valid?
        token = encode_token({ user_id: @user.id, username: @user.username })
        render json: { user: @user, token: token }, status: :ok
      else
        render json: { error: "Algo deu errado ao criar o usuário" }, status: :unprocessable_entity
      end
    end

    def login
    @user = User.find_by(email: user_params[:email])
    if @user && @user.authenticate(user_params[:password])
      token = encode_token({ user_id: @user.id, username: @user.username })
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { error: "Algo deu errado ao logar o usuário" }, status: :unprocessable_entity
    end
    end

    def update_vector
      begin
        @user = User.find(params[:id]) # Tenta encontrar o usuário pelo ID

        if request.get?
          # Se a requisição for GET, retorna os scores do usuário
          render json: {
            masculine_cloth_score: @user.masculine_cloth_score,
            feminine_cloth_score: @user.feminine_cloth_score,
            electronic_score: @user.electronic_score,
            jewelry_score: @user.jewelry_score
          }, status: :ok
        elsif request.post?
          # Se a requisição for POST, atualiza os scores
          scores = params.require(:scores).permit(:masculine_cloth_score, :feminine_cloth_score, :electronic_score, :jewelry_score)

          if @user.update(scores)
            render json: { message: "Scores atualizados com sucesso" }, status: :ok
          else
            render json: { error: "Erro ao atualizar os scores" }, status: :unprocessable_entity
          end
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Usuário não encontrado" }, status: :not_found
      end
    end


    private

    def user_params
      params.permit(:username, :password, :email)
    end
end
