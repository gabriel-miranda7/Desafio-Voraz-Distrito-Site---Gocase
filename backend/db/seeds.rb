# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require_relative '../app/services/fake_store_service'
require_relative "products_array_demo.rb"

products_array = get_products

  # Iterando pelos produtos e criando instâncias no banco de dados
  products_array.each do |product|
    Product.create(
      title: product[:title],
      price: product[:price],
      description: product[:description],
      category: product[:category],
      image: product[:image],
      rating: product[:rating],
      masculine_cloth_score: product[:masculine_cloth_score] || 0,
      feminine_cloth_score: product[:feminine_cloth_score] || 0,
      electronic_score: product[:electronic_score] || 0,
      jewelry_score: product[:jewelry_score] || 0,
    )
  end
