@echo off
title ��Դ�ϲ�
cd /d %~dp0
set NODE_PATH=%~dp0\node_modules
set NODE_DIR=%~dp0\..\..\node
set MODEL_DIR=%~dp0\..\..\model
set PATH=%NODE_DIR%
cd %MODEL_DIR%

@echo ��ʼ��Դ�ϲ�
node "%NODE_PATH%\x5dist\r.js" -lib "%NODE_PATH%\x5dist\dist.js" %*
if %ERRORLEVEL%==0 goto end
:error
@echo ******** ��Դ�ϲ�ʧ�ܡ� ********
pause
exit 1

:end
@echo ��Դ�ϲ���ɣ�
pause
