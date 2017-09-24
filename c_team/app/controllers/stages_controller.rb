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
      cookies['coordinate'] = JSON.generate({ x: 128, y: 0 });
    elsif status['demo'] == 'bottom'
      cookies['coordinate'] = JSON.generate({ x: 128, y: 288 });
    end
  rescue
    redirect_to demo_path
  end

  def demo2_novel
  end

  private

    def save_data
      current_user.data = cookies['status']
      current_user.save
    end
end
