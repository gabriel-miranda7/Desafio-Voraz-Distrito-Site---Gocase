class ChangeScoresToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :masculine_cloth_score, :float
    change_column :users, :feminine_cloth_score, :float
    change_column :users, :electronic_score, :float
    change_column :users, :jewelry_score, :float
  end
end
