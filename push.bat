echo off
cls
git config user.name 'danielclas'
git config user.email 'danielclas@outlook.es'
git add .
set /P message=Enter message: 
git commit -m %message%
git push
cls