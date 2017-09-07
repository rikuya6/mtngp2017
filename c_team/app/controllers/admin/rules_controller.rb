class Admin::RulesController < Admin::Base

  def index
    @rules = Rule.all.page(params[:page])
  end

  def new
    @rule = Rule.new
  end

  def create
    @rule = Rule.new(rule_params)
    if @rule.save
      redirect_to :admin_rules, notice: '詰め合わせルールを新規登録しました。'
    else
      render 'new'
    end
  end

  def destroy
    @rule = Rule.find(params[:id])
    @rule.destroy
    redirect_to admin_rules_path, notice: '詰め合わせルールを削除しました。'
  end


  private

  def rule_params
    attrs = [:category1_id, :category2_id]
    params.require(:rule).permit(attrs)
  end
end
