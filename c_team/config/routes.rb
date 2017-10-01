Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'
  resource :sessions, only: [:create, :destroy], as: 'login', path: 'login'
  delete 'logout' => 'sessions#destroy', as: 'logout'

  resources :users

  get 'stages', to: 'stages#index'
  get 'stages/demo', to: 'stages#demo', as: :demo
  get 'stages/demo2', to: 'stages#demo2', as: :demo2
  post 'stages/demo2', to: 'stages#demo2'#, as: :demo2
  get 'stages/novel', to: 'stages#novel', as: :novel
  get 'stages/novel2', to: 'stages#novel2', as: :novel2

  namespace :admin do
    root to: 'users#index'
    resources :users
  end

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
