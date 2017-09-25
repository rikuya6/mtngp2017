module ApplicationHelper

  def page_title
    title = '松永プロジェクト'
    title = title + ' | ' + @page_title if @page_title
    title
  end

  def show?
    action_name == 'show'
  end

  def edit_or_update?
    (action_name == 'edit' || action_name == 'update')
  end

  def new_or_create?
    (action_name == 'new') || (action_name == 'create')
  end

  def new_confirmation?
    action_name == 'new_confirmation'
  end

  def edit_confirmation?
    action_name == 'edit_confirmation'
  end

  def h_datetime(object)
    year = "#{object.created_at.year}年"
    month = "#{object.created_at.month}月"
    day = "#{object.created_at.day}日"
    time = "#{object.created_at.hour}:#{object.created_at.min}"
    year + month + day + time
  end
end
