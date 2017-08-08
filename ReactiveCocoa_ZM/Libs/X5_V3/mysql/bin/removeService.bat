@echo off
@echo 正在卸载MySQL服务......
cd /d %~dp0
mysqld --remove MySQL
pause