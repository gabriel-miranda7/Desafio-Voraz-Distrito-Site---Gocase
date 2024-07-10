
class ProductsController < ApplicationController
    def index
      service = FakeStoreService.new
      response = service.get_products
  
      if response.success? && !response.parsed_response.nil? && !response.parsed_response.empty?
        render json: response.parsed_response, status: :ok
      else
        render json: { error: "Não foi possível obter os produtos da API." }, status: :bad_request
      end
    end
  
    def show
      service = FakeStoreService.new
      response = service.get_product(params[:id])
  
      if response.success? && !response.parsed_response.nil? && !response.parsed_response.empty?
        render json: response.parsed_response, status: :ok
      else
        render json: { error: "Não foi possível obter o produto da API." }, status: :bad_request
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
  