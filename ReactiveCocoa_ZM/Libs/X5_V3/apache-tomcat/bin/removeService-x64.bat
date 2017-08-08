@echo off
@echo 正在卸载Justep X5服务......
cd /d %~dp0
call service.bat remove x64 X5
pause
