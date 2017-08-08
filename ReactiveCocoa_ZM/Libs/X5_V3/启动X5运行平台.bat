@echo off
title Tomcat-X5运行平台 Ctrl+C键结束服务
@echo 正在启动X5运行平台...
cd /d %~dp0
set startDir=%cd%
echo %startDir%|findstr /ibe "[0-9a-z:\\\~\!\@\#\$\(\)\_\+\`\-\=\;\'\.\,]*">nul&&goto run||goto error

:error
echo 错误：不要把版本解压放在包含有中文、空格和特殊字符的目录！
pause
goto end

:run
@echo .
@echo ...小提示..................................................................
@echo .                                                                         .
@echo . 连接方式                                                                .
@echo . 浏览器地址：http://127.0.0.1:8080                                       .
@echo . 登录用户名：system                                                      .
@echo . 密码：123456                                                            .
@echo .                                                                         .
@echo ...........................................................................
cd "%startDir%\apache-tomcat\bin"
call startup.bat

:end
