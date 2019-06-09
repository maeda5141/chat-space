class UsersController < ApplicationController
  def index
    
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
