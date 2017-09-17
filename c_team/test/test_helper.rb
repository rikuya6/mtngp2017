ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/reporters'
Minitest::Reporters.use!

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # アップロードしたファイル
  def uploaded_file(fname, type)
    Rack::Test::UploadedFile.new(
      Rails.root.join('test/factories', fname), type, true)
  end
end
