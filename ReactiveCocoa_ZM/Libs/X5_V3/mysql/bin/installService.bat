@echo off
@echo 正在安装MySQL服务......
cd /d %~dp0
cd..
set myIni=%cd%\my.ini
cd bin
mysqld --install MySQL "--defaults-file=%myIni%"
pause
