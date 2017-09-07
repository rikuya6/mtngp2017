class StagesController < MemberController

  def index
  end

  def demo
    render file: 'stages/demo/demo.html.erb'
  end
end
