@echo off
@echo ���ڰ�װMySQL����......
cd /d %~dp0
cd..
set myIni=%cd%\my.ini
cd bin
mysqld --install MySQL "--defaults-file=%myIni%"
pause
