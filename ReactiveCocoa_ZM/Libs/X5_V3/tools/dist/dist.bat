@echo off
title 资源合并
cd /d %~dp0
set NODE_PATH=%~dp0\node_modules
set NODE_DIR=%~dp0\..\..\node
set MODEL_DIR=%~dp0\..\..\model
set PATH=%NODE_DIR%
cd %MODEL_DIR%

@echo 开始资源合并
node "%NODE_PATH%\x5dist\r.js" -lib "%NODE_PATH%\x5dist\dist.js" %*
if %ERRORLEVEL%==0 goto end
:error
@echo ******** 资源合并失败。 ********
pause
exit 1

:end
@echo 资源合并完成！
pause
