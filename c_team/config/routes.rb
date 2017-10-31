Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'
  resource :sessions, only: [:create, :destroy], as: 'login', path: 'login'
  get 'login' => 'sessions#login_form', as: 'login_form'
  delete 'logout' => 'sessions#destroy', as: 'logout'

  resources :users

  get 'stages/title', to: 'stages#title', as: :title

  # チュートリアル
  get 'stages/tutorial', to: 'stages#tutorial1', as: :tutorial1
  get 'stages/tutorial2', to: 'stages#tutorial2', as: :tutorial2
  get 'stages/tutorial3', to: 'stages#tutorial3', as: :tutorial3
  get 'stages/tutorial1_novel', to: 'stages#tutorial1_novel', as: :tutorial1_novel
  get 'stages/tutorial2_novel', to: 'stages#tutorial2_novel', as: :tutorial2_novel
  get 'stages/tutorial3_novel', to: 'stages#tutorial3_novel', as: :tutorial3_novel
  get 'stages/tutorial3A_novel', to: 'stages#tutorial3A_novel', as: :tutorial3A_novel

  # 本編
  get 'stages/intro_novel', to: 'stages#intro_novel', as: :intro_novel
  get 'stages/stage1', to: 'stages#stage1', as: :stage1
  get 'stages/stage1_novel', to: 'stages#stage1_novel', as: :stage1_novel
  get 'stages/stage2', to: 'stages#stage2', as: :stage2

  namespace :admin do
    root to: 'users#index'
    resources :users
  end

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
