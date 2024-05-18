Rails.application.routes.draw do

  

  namespace :api do
    get 'offers/index'
    post 'offers/create'
    delete '/destroy/:id', to: 'offers#destroy'

    # Registration
    get '/signup', to: 'registrations#new'
    post '/signup', to: 'registrations#create'

    # Session
    get '/login', to: 'sessions#new'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end

  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
