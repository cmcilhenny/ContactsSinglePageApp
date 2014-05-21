class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :number
      t.string :imgUrl

      t.timestamps
    end
  end
end
