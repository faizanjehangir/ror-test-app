Rails.application.routes.draw do
  namespace :api do

    # offers
    get 'offers/index'
    post 'offers/create'
    delete '/destroy/:id', to: 'offers#destroy'

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
