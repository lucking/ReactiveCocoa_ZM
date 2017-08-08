@echo off
title MySQL管理工具
@echo 正在启动MySQL管理工具...
@echo .
@echo ...小提示..................................................................
@echo .                                                                         .
@echo . 点“打开”按钮即可登录并使用                                            .
@echo . 默认参数                                                                .
@echo . 主机名/IP：127.0.0.1                                                    .
@echo . 用户名：root                                                            .
@echo . 密码：x5                                                                .
@echo . 端口：3306                                                              .
@echo .                                                                         .
@echo ...........................................................................
@echo   8 秒后自动关闭该窗口
cd /d %~dp0
set startDir=%cd%
cd "%startDir%\mysql\bin"
start heidisql.exe

rem 延迟关闭
ping 127.0.0.1 -n 8 > nul
