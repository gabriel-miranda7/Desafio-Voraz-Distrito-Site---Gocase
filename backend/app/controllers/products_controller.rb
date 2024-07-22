
require "matrix"
class ProductsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
      products = Product.all
      render json: products
    end

    def recommended
      products = Product.all

      user_profile = params[:user_profile]

      if user_profile.present?

        # Cria um vetor com os dados do perfil do usuário (soma acumulada)
        user_vector = Vector[
          user_profile[:masculine_cloth_score] || 0,
          user_profile[:feminine_cloth_score] || 0,
          user_profile[:electronic_score] || 0,
          user_profile[:jewelry_score] || 0
        ]


        # Calcula a similaridade entre os produtos e o perfil do usuário
        products_with_similarity = products.map do |product|
          {
            product: product,
            similarity_score: product.similarity_score_profile(user_vector)
          }
        end

        # Ordena os produtos com base na similaridade (do maior para o menor)
        sorted_products = products_with_similarity.sort_by { |item| -item[:similarity_score] }.map { |item| item[:product] }

        render json: sorted_products, status: :ok
      else
        # Caso não haja dados no cookie, exibe produtos de forma padrão
        # render json: products
      end
    end

    def show
      product = Product.find_by(id: params[:id])

      if product
        render json: product, status: :ok
      else
        render json: { error: "Produto não encontrado." }, status: :not_found
      end
    end

    def by_category
      category = params[:category]
      products = Product.where(category: category)

      if products.present?
        render json: products, status: :ok
      else
        render json: { error: "Nenhum produto encontrado para a categoria #{category}." }, status: :not_found
      end
    end

    def categories
        service = FakeStoreService.new
        response = service.get_categories

        if response.success? && !response.parsed_response.nil? && !response.parsed_response.empty?
          render json: response.parsed_response, status: :ok
        else
          render json: { error: "Não foi possível obter as categorias da API." }, status: :bad_request
        end
    end
end
