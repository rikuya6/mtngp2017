class StagesController < GuestController

  def index
  end

  def demo
    cookies['status'] = JSON.generate({ demo: false })
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
end
