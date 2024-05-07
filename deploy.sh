#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "自动部署"

# 部署到gitee
# git push -f https://gitee.com/zhuquanyu/richard-blog.git main:main

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f https://github.com/richardhehe/richard_blog.git main:main

cd -
rm -rf docs/.vuepress/dist

git init
git add -A
git commit -m "源码推送"
# git push -f https://gitee.com/zhuquanyu/richard-blog-source.git main:main
git push -f https://github.com/richardhehe/richard_blog_source.git main:main