class ChangeColumnOfProfile < ActiveRecord::Migration[5.2]
  def change
    drop_table :profiles

    create_table :profiles, id: false do |t|
      t.references  :user, foreign_key: true, primary_key: true
      t.string      :name,  null: false
      t.string      :biography
      t.string      :location
      t.string      :website
      t.date        :birthday
      t.string      :theme_color,   null: false, default: "1da1f2"
      t.string      :profile_photo, null: false, default: "empty_avatar.png"
      t.string      :header_photo
      t.timestamps
    end

    add_index :profiles, :name
  end
end
