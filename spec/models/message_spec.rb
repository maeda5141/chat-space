require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can saved' do
    it 'メッセージがあれば保存できる' do
      message = FactoryBot.build(:message, image: nil)
      message.valid?
      expect(message).to be_valid
    end
    it '画像があれば保存できる' do
      message = FactoryBot.build(:message, body: nil)
      message.valid?
      expect(message).to be_valid
    end
    it '画像とメッセージがあれば保存できる' do
      message = FactoryBot.build(:message)
      message.valid?
      expect(message).to be_valid
    end
  end

  context "can't saved" do
    it '画像とメッセージがなければ保存できない' do
      message = FactoryBot.build(:message, body: nil, image: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end
    it 'user_idがなければ保存できない' do
      message = FactoryBot.build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user_id]).to include("を入力してください")
      # expect(message).to be_valid
    end
    it 'group_idがなければ保存できない' do
      message = FactoryBot.build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group_id]).to include("を入力してください")
    end
  end
end
end