require "matrix"

class Product < ApplicationRecord
  # Assumindo que você tem os seguintes atributos no seu modelo:
  # masculine_cloth_score, feminine_cloth_score, electronic_score, jewelry_score

  def similarity_score(other_product)
    # Criando um vetor para o produto no qual o método está sendo chamado
    vector_a = Vector[
      self.masculine_cloth_score,
      self.feminine_cloth_score,
      self.electronic_score,
      self.jewelry_score
    ]

    # Criando um vetor para o produto passado como argumento
    vector_b = Vector[
      other_product.masculine_cloth_score,
      other_product.feminine_cloth_score,
      other_product.electronic_score,
      other_product.jewelry_score
    ]

    # Calculando a similaridade usando o cosseno da similaridade
    numerator = vector_a.inner_product(vector_b)
    denominator = vector_a.r * vector_b.r
    score = (numerator / denominator) * 100

    # Retornando a pontuação como um inteiro
    score.to_i
  end
end
