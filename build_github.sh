#!/bin/bash

uname -a
g++ --version
ruby -v 
gem -v
#gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
sudo gem install jekyll
sudo gem install jekyll-paginate
sudo gem install bundler:1.16.1
sudo gem install i18n:0.9.5
#sudo gem install sass-listen:4.0.0
sudo bundle install

bundle exec jekyll b || exit 1

ls _site/

jekyll -v

export TZ='Asia/Shanghai' # 更改时区

#mkdir websrc
git clone https://github.com/latelee/lidch.github.io_html.git websrc || exit 1
cd websrc
rm * -rf
cp -a ../_site/* .
#mv myRobots.txt robots.txt
git config user.name  "Late Lee"
git config user.email "li@latelee.org"
git add .
git commit -m "CI auto update"
git push --force --quiet "https://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@github.com/latelee/lidch.github.io_html.git" master:master || exit 1
cd -

exit
