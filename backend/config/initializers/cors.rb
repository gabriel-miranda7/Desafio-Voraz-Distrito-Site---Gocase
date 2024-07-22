# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://desafio-voraz-distrito-site-gocase-fbj7sjryo.vercel.app" # Substitua pelo domínio do seu frontend

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      expose: [ "Authorization" ],
      max_age: 600
  end
end
