  json.(@message, :body, :image)
  json.id    @message.id
  json.name  @message.user.name
  json.created_at  @message.created_at

