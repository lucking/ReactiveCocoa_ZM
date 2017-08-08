@echo off
cd /d %~dp0

set JAVA_HOME=..\..\java\jre1.5
set TOMCAT=..\..\apache-tomcat
set UI_LIB=..\..\runtime\UIServer\WEB-INF\lib

set COMPILE_JAVA_DEPEND_LIB=/studio/dropins/studio-app2/plugins/plugin/lib;/runtime/UIServer/WEB-INF/lib;/runtime/ReportServer/WEB-INF/lib/jfreechart-1.0.9_v20090731_update20100302.jar;/runtime/ReportServer/WEB-INF/lib/chart-justep.jar;/apache-tomcat/lib/servlet-api.jar;
set COMPILE_TARGET_PATH=/UI2
set COMPILE_TARGET_FILE_TYPE=java

set PATH=%JAVA_HOME%\bin;%Path%
set CLASSPATH=%JAVA_HOME%\lib\tools.jar;%UI_LIB%\biz-client.jar;%UI_LIB%\ui-classloader.jar;%UI_LIB%\message.jar;%UI_LIB%\ui-common.jar;%UI_LIB%\commons-beanutils-1_5.jar;%UI_LIB%\commons-codec-1.6.jar;%UI_LIB%\commons-collections-3_1.jar;%UI_LIB%\commons-fileupload-1.2.1.jar;%UI_LIB%\commons-httpclient-3_1.jar;%UI_LIB%\commons-io.jar;%UI_LIB%\commons-lang-2_3.jar;%UI_LIB%\commons-logging-1.0.4.jar;%UI_LIB%\dom4j-1_6_1.jar;%UI_LIB%\ui-excel.jar;%UI_LIB%\ui-excel-convert.jar;%UI_LIB%\ui-ext-space.jar;%UI_LIB%\FCKeditor-2.3.jar;%UI_LIB%\freemarker.jar;%UI_LIB%\jakarta-slide-webdavlib-2.0rc1.jar;%UI_LIB%\jaxen-1_1_beta_9.jar;%UI_LIB%\json.jar;%UI_LIB%\jxl.jar;%UI_LIB%\log4j-1.2.14.jar;%UI_LIB%\ui-master.jar;%UI_LIB%\ui-model-parser.jar;%UI_LIB%\portal-core.jar;%UI_LIB%\report.jar;%UI_LIB%\report-proxy.jar;%UI_LIB%\resources.jar;%UI_LIB%\saxon-8_8_orbeon_20080516.jar;%UI_LIB%\ss_css2_ext.jar;%UI_LIB%\stax-1.2.0.jar;%UI_LIB%\stax-api-1.0.jar;%UI_LIB%\transform.jar;%UI_LIB%\min-depends.jar;%UI_LIB%\ui-core.jar;%UI_LIB%\update.jar;%UI_LIB%\xalan-2_5_1_orbeon.jar;%UI_LIB%\xerces-xercesImpl-2_9_orbeon_20070711.jar;%UI_LIB%\fastjson-1.1.25.jar;%UI_LIB%\xerces-xml-apis-2_9_orbeon_20070711.jar;%TOMCAT%\lib\servlet-api.jar;compileUI.jar
java -Xms64m -Xmx512m -classpath %CLASSPATH% com.justep.tools.CompileUI  
pause
