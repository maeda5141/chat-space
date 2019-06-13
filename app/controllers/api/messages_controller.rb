class Api::MessagesController < ApplicationController
def index
  @group = Group.find(params[:group_id]）
  @messages = @group.messages.where(@group.messages.arel_table[:id].gt(params[:id])).where(group_id: params[:group_id])
  respond_to do |format|
    format.json
  end
end
end
