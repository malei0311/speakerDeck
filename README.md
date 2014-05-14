## Pure CSS Slides

* use pseudo class :checked
* SCSS, Compass && Grunt to build it
* just use a code prettify library

## Install

### Compass

    gem install compass -v 1.0.0.alpha.19

why use 1.0.0.alpha.19? [more](https://github.com/gruntjs/grunt-contrib-compass/issues/23)

### Grunt

    npm install -g grunt-cli
    npm install
    grunt
    grunt watch
    grunt production

## Other

### Errno:: ETXTBSY on line 886 (Compass)

add
    
    cache_path = "/tmp/.sass-cache"

in `config.rb` [more](http://stackoverflow.com/questions/19300293/impossible-to-watch-with-compass-text-file-busy-on-shared-folder)

ps: 当在 window 与 vbox(ubuntu) 的共享文件夹时有此问题

