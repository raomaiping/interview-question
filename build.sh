# 出错就停止部署
set -e

# 本地打包构建
yarn docs:build

# 进入 build 目录
cd ./docs/.vuepress/dist

# 创建本地 Git 仓库
git init 
# 创建并切换分支
git checkout -b main
# 添加和提交
git add -A
git commit -m '部署'
# 指定 origin 和分支，直接强推
git push -f git@github.com:raomaiping/interview-question.git main
