@echo off
title Tomcat-X5����ƽ̨ Ctrl+C����������
@echo ��������X5����ƽ̨...
cd /d %~dp0
set startDir=%cd%
echo %startDir%|findstr /ibe "[0-9a-z:\\\~\!\@\#\$\(\)\_\+\`\-\=\;\'\.\,]*">nul&&goto run||goto error

:error
echo ���󣺲�Ҫ�Ѱ汾��ѹ���ڰ��������ġ��ո�������ַ���Ŀ¼��
pause
goto end

:run
@echo .
@echo ...С��ʾ..................................................................
@echo .                                                                         .
@echo . ���ӷ�ʽ                                                                .
@echo . �������ַ��http://127.0.0.1:8080                                       .
@echo . ��¼�û�����system                                                      .
@echo . ���룺123456                                                            .
@echo .                                                                         .
@echo ...........................................................................
cd "%startDir%\apache-tomcat\bin"
call startup.bat

:end
