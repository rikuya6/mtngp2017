Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'
  resource :sessions, only: [:create, :destroy], as: 'login', path: 'login'
  delete 'logout' => 'sessions#destroy', as: 'logout'

  resources :users

  get 'stages', to: 'stages#index'
  get 'stages/tutorial', to: 'stages#tutorial1', as: :tutorial1
  get 'stages/tutorial2', to: 'stages#tutorial2', as: :tutorial2
  get 'stages/tutorial3', to: 'stages#tutorial3', as: :tutorial3
  get 'stages/tutorial1_novel', to: 'stages#tutorial1_novel', as: :tutorial1_novel
  get 'stages/tutorial2_novel', to: 'stages#tutorial2_novel', as: :tutorial2_novel
  get 'stages/novel2', to: 'stages#novel2', as: :novel2

  namespace :admin do
    root to: 'users#index'
    resources :users
  end

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
