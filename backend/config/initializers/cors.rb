# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://desafio-voraz-distrito-site-gocase.vercel.app" # Substitua pelo domínio do seu frontend

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      expose: [ "Authorization" ],
      credentials: true, # Permite o envio de credenciais (cookies, cabeçalhos de autorização)
      max_age: 600
  end
end
