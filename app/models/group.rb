class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages

  validates :name, presence: true, uniqueness: true 
  # validates :user_ids, presence: true

  def show_last_message(group)
    if group.messages != []
     group.messages.last.body? ? messages.last.body : '画像が投稿されています。'
    else
     'まだメッセージはありません。'
    end
 end
end
