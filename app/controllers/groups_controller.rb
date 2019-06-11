class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    
  end
  def new
    @group = Group.new
    @group.users << current_user
  end
  def create
    
    @group = Group.new(group_params)
    @save = @group.save
    if @save
    flash.now[:success] = "グループを作成しました"
    redirect_to root_path
    else
      @group.valid?
      render :new
    end
  end
  def edit
    
  end
  def update
    if @group.update(group_params)
      flash[:success] = "編集が完了しました"
      redirect_to root_path
      else
        @group.valid?
        render :edit
      end 
  end
  private
  def group_params
    params.require(:group).permit(:name, {user_ids: []})
  end
  def set_group
    @group = Group.find(params[:id])
  end
  
end
