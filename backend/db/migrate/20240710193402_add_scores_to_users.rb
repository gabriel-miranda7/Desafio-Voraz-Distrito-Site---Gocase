class AddScoresToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :masculine_cloth_score, :integer
    add_column :users, :feminine_cloth_score, :integer
    add_column :users, :electronic_score, :integer
    add_column :users, :jewelry_score, :integer
  end
end
