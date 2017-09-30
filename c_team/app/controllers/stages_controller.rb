class StagesController < MemberController
  after_action :save_data

  def index
  end

  def tutorial1
    cookies['status'] = if current_user.data.blank?
                          JSON.generate({ tutorial1: false })
                        else
                          current_user.data
                        end

  end

  def tutorial2
    status = JSON.parse(cookies['status'])
    redirect_to tutorial_path unless status['tutorial1']
  rescue
    redirect_to tutorial_path
  end

  def novel

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
