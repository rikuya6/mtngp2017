class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

  # process resize_to_limit: [500, 500]
  # process resize_to_fit: [350, 350]

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end
end
