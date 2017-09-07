module ProductsHelper
  def set_like_link(product)
    unless checked?(product.id)
      link_to '詰め合わせに追加', check_giftboxes_path(product_id: product, page: params[:page]), method: :post,
      class: 'btn btn-default'
    else
      link_to '詰め合わせから削除', uncheck_giftboxes_path(product_id: product, page: params[:page]), method: :delete,
      class: 'btn btn-link'
    end
  end
end
