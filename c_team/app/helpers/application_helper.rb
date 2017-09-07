module ApplicationHelper

  def page_title
    title = 'ギフト家'
    title = 'ギフト家' + ' | ' + @page_title if @page_title
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

  def admin_product_image_tag(product, opts = {})
    if product.image.present?
      path = admin_product_path(product, format: product.extension)
      link_to(image_tag(path, { alt: product.name }.merge(opts)), path)
    else
      ''
    end
  end

  def tag_label(product)
    product.categories.map{|tag| "<span class=#{'"label label-primary"'}>#{tag.name}</span>" }.join(' ').html_safe
  end

  def rule_tag_label(rule)
    category1_name = Category.find(rule.category1_id).name
    category2_name = Category.find(rule.category2_id).name
    html = "<span class=#{'"label label-primary"'}>#{category1_name}</span> "
    html +=  "<span class=#{'"label label-primary"'}>#{category2_name}</span>"
    html.html_safe
  end

end
