@echo off
cd..
set myIni=%cd%\my.ini
cd bin
set path=%cd%
mysqld "--defaults-file=%myIni%" --console
