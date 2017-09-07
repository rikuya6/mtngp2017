class ProductsController < GuestController

  def index
    one = Product.includes(:categories)
    one = one.where.not('categories.name' => 'ギフトボックス', stock: 0)
    if params[:keyword].present?
      keyword = params[:keyword]
      like_keyword = '%' + keyword.downcase + '%'
      one = one.where('lower(products.name) like ? OR lower(categories.name) like ?', like_keyword, like_keyword)
    end
    @products = one.page(params[:page]).per(16)
  end

  def show
    @product = Product.find(params[:id])
    redirect_to products_path, alert: '申し訳ありません。在庫がございません。' if @product.stock <= 0
  end
end
