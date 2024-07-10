class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :title
      t.decimal :price
      t.text :description
      t.string :category
      t.string :image
      t.json :rating
      t.integer :masculine_cloth_score
      t.integer :feminine_cloth_score
      t.integer :electronic_score
      t.integer :jewelry_score

      t.timestamps
    end
  end
end
