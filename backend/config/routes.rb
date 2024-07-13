Rails.application.routes.draw do
  resources :products, only: [ :index, :show ] do
    collection do
      get "category/:category", to: "products#by_category", as: "by_category"
      get "recommended"
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resource :users, only: [ :create ] do
    post "update_cookie", to: "users#update_vector" # Rota para atualizar os scores
    get "update_cookie", to: "users#update_vector" # Rota para atualizar os scores
  end
  post "/login", to: "users#login"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
