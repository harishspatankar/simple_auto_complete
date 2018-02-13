Rails.application.routes.draw do
  resources :search_suggestions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  root 'users#index'
end
