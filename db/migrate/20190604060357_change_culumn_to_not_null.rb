class ChangeCulumnToNotNull < ActiveRecord::Migration[5.0]
  def up
    change_column :group_users, :group_id, :integer, null: true
  end

  def down
    change_column :group_users, :group_id, :integer, null: false
  end
end
