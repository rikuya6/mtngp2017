class StagesController < MemberController
  after_action :save_tutorial_data, only: [:tutorial1, :tutorial2, :tutorial3]
  layout 'stage'

  # タイトル画面
  def title
  end

  # チュートリアル
  def tutorial1
    cookies['tutorial_status'] = if current_user.data.blank?
                          JSON.generate({ tutorial1: false })
                        else
                          current_user.data
                        end

  end

  def tutorial2
    tutorial_status = JSON.parse(cookies['tutorial_status'])
    redirect_to tutorial1_path unless tutorial_status['tutorial1']
  rescue
    redirect_to tutorial1_path
  end

  def tutorial3
    tutorial_status = JSON.parse(cookies['tutorial_status'])
    redirect_to tutoria2_path unless tutorial_status['tutorial1'] && tutorial_status['tutorial2']
  rescue
    redirect_to tutorial1_path
  end

  def tutorial1_novel
  end

  def tutorial2_novel
  end

  def tutorial3_novel
  end

  def tutorial3A_novel
  end


  # 本編
  def intro_novel
  end

  def stage1
  end

  def novel2
    status = JSON.parse(cookies['status'])
    if status['demo'] == 'top'
      cookies['n_flg'] = JSON.generate({ flower: true, gamecenter: false });
    elsif status['demo'] == 'bottom'
      cookies['n_flg'] = JSON.generate({ flower: false, gamecenter: true });
    end
  rescue
    redirect_to demo_path
  end


  private

    def save_tutorial_data
      current_user.tutorial_data = cookies['tutorial_status']
      current_user.save
    end
end
