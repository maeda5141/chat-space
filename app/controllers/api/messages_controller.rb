class Api::MessagesController < ApplicationController
def index
  @messages = Message.where(Message.arel_table[:id].gt(params[:id]))
  respond_to do |format|
    format.json
  end
end
end
