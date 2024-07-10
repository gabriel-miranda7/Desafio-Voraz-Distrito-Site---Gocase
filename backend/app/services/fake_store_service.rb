
require 'httparty'

class FakeStoreService
  include HTTParty
  base_uri 'https://fakestoreapi.com'

  def initialize
    @options = { headers: { 'Content-Type' => 'application/json' } }
  end

  def get_products
    self.class.get('/products', @options)
  end

  def get_product(id)
    self.class.get("/products/#{id}", @options)
  end

  def get_categories
    self.class.get('/products/categories', @options)
  end

  # Adicione outros métodos conforme necessário
end
