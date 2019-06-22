class ChangeUsersColumnIntoNotNull < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :email, :string, null: false
    change_column :users, :phone_number, :string, null: false
  end
end
