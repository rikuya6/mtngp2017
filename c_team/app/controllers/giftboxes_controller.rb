class GiftboxesController < MemberController

  def new
    liked = cookies.signed[:check_products]
    unless liked.blank?
      @giftbox = Giftbox.new
      liked.each do |id|
        if no_stock_or_deleted_product?(id)
          unlike_products([id])
          product_name = Product.find_by(id: id).name + 'は' || ''
          redirect_to products_path, alert: "申し訳ありません。#{product_name}在庫がございません。"
        else
          @giftbox.box_details.build(product_id: id)
        end
      end
    else
      redirect_to products_path, alert: '詰め合わせ商品をお選びください'
    end
  end

  def create
    @giftbox = Giftbox.new(giftbox_params)
    if params[:back].present?
      render 'new'
    elsif @giftbox.save
      unlike_products(@giftbox.products.pluck(:id))
      @gift_product = create_gift_product
      @gift_product.save
      redirect_to new_orders_path(product_id: @product.id)
    else
      render 'new'
    end
  end

  def new_confirmation
    box_details_params = params[:giftbox][:box_details_attributes]
    box_details_keys = box_details_params.keys
    product_ids = []
    valid_box = false
    box_details_params.each do |key|
      if key[1]['_destroy'] == 'false'
        product_ids << key[1]['product_id']
        valid_box = true
      end
    end
    # すべての商品を消して「ギフト注文」を押した場合
    return redirect_to new_giftboxes_path, alert: '商品を選んでください。' unless valid_box
    @giftbox = Giftbox.new(giftbox_params)
    @giftbox.ids_product = product_ids
    @boxes = Box.all.pluck(:box_type, :id)
    @giftbox.box_id = select_box_id(@giftbox)
    render 'new' if @giftbox.invalid?
    flash.now[:notice] = 'ボックスは商品の重さから最適なサイズが自動選択されました。'
  end

  def check_product
    if cookies.signed[:check_products].nil?
      cookies.signed[:check_products] = [params[:product_id]]
    else
      check_products = cookies.signed[:check_products]
      check_products << params[:product_id]
      cookies.signed[:check_products] = check_products.uniq
    end
    redirect_to products_path(page: params[:page]), notice: '詰め合わせに追加しました'
  end

  def uncheck_product
    unlike_products([params[:product_id]])
    redirect_to products_path(page: params[:page]), notice: '詰め合わせから削除しました'
  end


  private

  def giftbox_params
    attrs = [:box_id]
    attrs << { box_details_attributes: [:id, :giftbox_id, :product_id, :_destroy,
      product_attributes: [:id ,:name]] }
    params.require(:giftbox).permit(attrs)
  end

  def create_gift_product
    @product = Product.new(stock: 1, note: 'ギフトボックス')
    producst_name = []
    @giftbox.products.each do |product|
      producst_name << product.name
    end
    @product.name = 'ギフト注文：' + producst_name.join(', ')
    box_price = Box.find(@giftbox.box_id).price
    product_sum_price = @giftbox.products.sum(:price)
    @product.price = box_price + product_sum_price
    @product.weight = @giftbox.products.sum(:weight)
    @product.categories << Category.where(name: 'ギフトボックス')
    @product
  end

  def unlike_products(product_id)
    check_products = cookies.signed[:check_products]
    product_id.each do |id|
      check_products.delete(id.to_s)
    end
    cookies.signed[:check_products] = check_products
  end

  def select_box_id(giftbox)
    product_id = []
    giftbox.box_details.each do |box_details|
      product_id << box_details.product_id
    end
    giftbox_sum_weight = Product.where(id: product_id).sum(:weight)
    box_capacity = Box.pluck(:id, :capacity).sort
    box_id = box_capacity[-1][0]
    box_capacity.each do |capacity|
      if giftbox_sum_weight <= capacity[1]
        box_id = capacity[0]
        break
      end
    end
    box_id
  end

  def no_stock_or_deleted_product?(id)
    product = Product.find_by(id: id)
    return true if product.nil?
    (product.stock <= 0)
  end
end
