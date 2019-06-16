json.array! @messages do |message|
  json.body message.body
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
  json.group_id message.group_id
end
