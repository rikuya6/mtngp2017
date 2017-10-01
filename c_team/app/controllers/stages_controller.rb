class StagesController < MemberController
  after_action :save_data

  def index
  end

  def demo
    cookies['status'] = if current_user.data.blank?
                          JSON.generate({ demo: false })
                        else
                          current_user.data
                        end

  end

  def demo2
    status = JSON.parse(cookies['status'])
    if status['demo'] == 'top'
      cookies['coordinate'] = JSON.generate({ x: 128, y: 16 });
    elsif status['demo'] == 'bottom'
      cookies['coordinate'] = JSON.generate({ x: 128, y: 256 });
    end
  rescue
    redirect_to demo_path
  end

  def novel
    
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

    def save_data
      current_user.data = cookies['status']
      current_user.save
    end
end
