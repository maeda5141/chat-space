class UsersController < ApplicationController
  def index
    @users = User.all
    @group = current_user.group
    respond_to do |format|
      format.html {redirecd_to group_messages_path(@goup)}
      format.json
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
