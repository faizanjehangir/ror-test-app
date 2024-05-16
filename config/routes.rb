Rails.application.routes.draw do
  namespace :api do
    get 'offers/index'
    post 'offers/create'
    delete '/destroy/:id', to: 'offers#destroy'
  end
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
