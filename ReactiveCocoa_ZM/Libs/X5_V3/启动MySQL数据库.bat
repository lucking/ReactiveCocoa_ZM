@echo off
title MySQL-X5 Ctrl+C键结束服务
@echo 正在启动MySQL...
@echo .
@echo ...小提示..................................................................
@echo .                                                                         .
@echo . MySQL默认参数                                                           .
@echo . 主机名/IP：127.0.0.1                                                    .
@echo . 用户名：root                                                            .
@echo . 密码：x5                                                                .
@echo . 端口：3306                                                              .
@echo .                                                                         .
@echo ...........................................................................
cd /d %~dp0
set startDir=%cd%
cd "%startDir%\mysql\bin"
call startup.bat
