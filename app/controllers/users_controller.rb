class UsersController < ApplicationController
  def index
    @users = User.where('name LIKE(?)', "#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.json
    end
end

  def edit
    
  end
  
  def update
    if current_user.update(params_user)
      redirect_to root_path
    else
      render :edit
    end
  end
  private
  def params_user
    params.require(current_user).permit(:name, :email)
  end
end
