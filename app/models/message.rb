class Message < ApplicationRecord
  belongs_to :user,  optional: true 
  belongs_to :group,  optional: true 

  mount_uploader :image, ImageUploader
  validates :body, presence: true, if: -> {image.blank?}
  validates :image, presence: true, if: -> {body.blank?}

end
