class MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
  end
  def create
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)
    
  if @message.save
    flash.now[:success] = "メッセージが送信されました"
    respond_to do |format|
      format.html {redirect_to group_messages_path(@group)}
      format.json
    end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください"
      render "index"
    end
  end

private
def message_params
  params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
end
end
