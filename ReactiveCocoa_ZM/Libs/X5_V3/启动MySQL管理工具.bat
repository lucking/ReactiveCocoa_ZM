@echo off
title MySQL������
@echo ��������MySQL������...
@echo .
@echo ...С��ʾ..................................................................
@echo .                                                                         .
@echo . �㡰�򿪡���ť���ɵ�¼��ʹ��                                            .
@echo . Ĭ�ϲ���                                                                .
@echo . ������/IP��127.0.0.1                                                    .
@echo . �û�����root                                                            .
@echo . ���룺x5                                                                .
@echo . �˿ڣ�3306                                                              .
@echo .                                                                         .
@echo ...........................................................................
@echo   8 ����Զ��رոô���
cd /d %~dp0
set startDir=%cd%
cd "%startDir%\mysql\bin"
start heidisql.exe

rem �ӳٹر�
ping 127.0.0.1 -n 8 > nul
