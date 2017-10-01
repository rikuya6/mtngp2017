# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile << %w( stage/tutorial1/tutorial1.js stage/tutorial2/tutorial2.js
                                                  stage/tutorial3/tutorial3.js stage/tutorial1_novel/tutorial1_novel.js
                                                  stage/novel2/novel2.js
                                                )
