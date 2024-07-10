
class ProductsController < ApplicationController
    def index
      products = Product.all
      render json: products
    end

    def show
      product = Product.find_by(id: params[:id])

      if product
        render json: product, status: :ok
      else
        render json: { error: "Produto não encontrado." }, status: :not_found
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
