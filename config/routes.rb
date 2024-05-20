Rails.application.routes.draw do
  namespace :api do

    # offers
    get 'offers', to: 'offers#index'
    post 'offers/create'

    # claim offers
    get 'claimed_offers', to: 'claimed_offers#index'
    post 'claimed_offers', to: 'claimed_offers#create'
    delete 'claimed_offers/:id', to: 'claimed_offers#destroy'

    # Registration
    post 'register', to: 'registration#create'

    # Session
    post 'login', to: 'session#create'
    delete 'logout', to: 'session#destroy'
  end

  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
