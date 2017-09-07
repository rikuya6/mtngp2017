Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'
  resource :sessions, only: [:create, :destroy], as: 'login', path: 'login'
  delete 'logout' => 'sessions#destroy', as: 'logout'

  resources :users do
    resources :orders, only: [:index, :show, :destroy]
  end

  get 'stages', to: 'stages#index'
  get 'stages/demo', to: 'stages#demo', as: :demo


  namespace :admin do
    root to: 'users#index'
  end

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
