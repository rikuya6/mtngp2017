Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'
  resource :sessions, only: [:create, :destroy], as: 'login', path: 'login'
  delete 'logout' => 'sessions#destroy', as: 'logout'

  resources :users

  get 'stages', to: 'stages#index'
  get 'stages/tutorial', to: 'stages#tutorial1', as: :tutorial
  get 'stages/tutorial2', to: 'stages#tutorial2', as: :tutorial2
  post 'stages/tutorial2', to: 'stages#tutorial2'
  get 'stages/tutorial3', to: 'stages#tutorial3', as: :tutorial3
  post 'stages/tutorial3', to: 'stages#tutorial3'
  get 'stages/novel', to: 'stages#novel', as: :novel
  get 'stages/novel2', to: 'stages#novel2', as: :novel2

  namespace :admin do
    root to: 'users#index'
    resources :users
  end

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
