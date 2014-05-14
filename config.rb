# Require any additional compass plugins here.
# require 'animation' compass 1.0 has it

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "build/static/css"
sass_dir = "static/css/main"
images_dir = "build/static/img"
environment = :development
cache_path = "/tmp/.sass-cache"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

if environment != :production
sourcemap = true
sass_options = {:sourcemap => true}
end

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
