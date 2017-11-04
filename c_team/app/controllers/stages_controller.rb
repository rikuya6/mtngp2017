class StagesController < GuestController
  layout 'stage'

  # タイトル画面
  def title
  end


  # チュートリアル
  def tutorial1
  end

  def tutorial1_novel
  end

  def tutorial2
  end

  def tutorial2_novel
  end

  def tutorial3
  end

  def tutorial3_novel
  end

  def tutorial3A_novel
  end


  # 本編
  def intro_novel
    cookies['status'] = JSON.generate({ stage1: false }) unless cookies['status']
    status = JSON.parse cookies['status']
    redirect_to stage1_novel_path if status['stage1'] && !status['stage2']
    # redirect_to stage2_novel_path if status['stage2']
  end

  def stage1
  end

  def stage1_novel
    status = JSON.parse cookies['status']
    redirect_to title_path unless status['stage1']
  rescue
    redirect_to title_path
  end

  def stage2
  end
end
