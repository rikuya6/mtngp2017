class StagesController < MemberController
  after_action :save_tutorial_data, only: [:tutorial1, :tutorial2, :tutorial3, :tutorial1_novel, :tutorial2_novel, :tutorial3_novel, :tutorial3A_novel]
  layout 'stage'

  # タイトル画面
  def title
  end

  # チュートリアル
  def tutorial1
  end

  def tutorial2
  end

  def tutorial3
  end

  def tutorial1_novel
    cookies['tutorial_status'] = if current_user.tutorial_data.blank?
                                   JSON.generate({ tutorial1: false })
                                 else
                                   current_user.tutorial_data
                                 end
    status = JSON.parse cookies['tutorial_status']
    if status['tutorial3']
      status['tutorial1'] = false
      cookies['tutorial_status'] = JSON.generate({ tutorial1: false, tutorial2: false, tutorial3: false })
      save_tutorial_data
    end
    redirect_to tutorial2_novel_path if status['tutorial1']
  end

  def tutorial2_novel
    status = JSON.parse cookies['tutorial_status']
    redirect_to tutorial1_novel_path unless status['tutorial1']
    redirect_to tutorial3_novel_path if status['tutorial2']
  end

  def tutorial3_novel
    status = JSON.parse cookies['tutorial_status']
    redirect_to tutorial2_novel_path unless status['tutorial1'] && status['tutorial2']
  rescue
    redirect_to title_path
  end

  def tutorial3A_novel
  end


  # 本編
  def intro_novel
  end

  def stage1
  end

  def stage1_novel
  end

  def stage2
  end

  private

    def save_tutorial_data
      current_user.tutorial_data = cookies['tutorial_status']
      current_user.save
    end
end
