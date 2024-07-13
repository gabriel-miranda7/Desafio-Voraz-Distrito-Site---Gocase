class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def encode_token(payload)
    JWT.encode(payload, 'secret') #Substituir a palavra secreta depois e armazenar em um arquivo de ambiente
  end


end
