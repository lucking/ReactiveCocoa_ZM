@echo off
title less����
cd /d %~dp0
set NODE_PATH=%~dp0\node_modules
set NODE_DIR=%~dp0\..\..\node
set MODEL_DIR=%~dp0\..\..\model
set PATH=%NODE_DIR%
cd %MODEL_DIR%

@echo ��ʼless����
node "%NODE_PATH%\x5less\lessProcess.js" UI2 system/components/bootstrap
if %ERRORLEVEL%==0 goto end
:error
@echo ******** less����ʧ�ܡ� ********
pause
exit 1

:end
@echo less������ɣ�
pause
