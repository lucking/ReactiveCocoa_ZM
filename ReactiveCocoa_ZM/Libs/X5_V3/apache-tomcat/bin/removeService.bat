@echo off
@echo 正在卸载Justep X5服务......
cd /d %~dp0
call service.bat remove X5
pause
