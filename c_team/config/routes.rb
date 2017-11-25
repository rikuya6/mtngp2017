Rails.application.routes.draw do
  root 'top#index'
  get 'about'  => 'top#about', as: 'about'

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
  get 'stages/stage2_novel', to: 'stages#stage2_novel', as: :stage2_novel
  get 'stages/stage3_novel', to: 'stages#stage3_novel', as: :stage3_novel
  get 'stages/stage3', to: 'stages#stage3', as: :stage3

  get 'stages/ending_novel', to: 'stages#ending_novel', as: :ending_novel

  match '*anything' => 'top#not_found', via: [:get, :post, :patch, :delete]
end
