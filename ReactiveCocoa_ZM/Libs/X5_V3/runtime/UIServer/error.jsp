<!DOCTYPE html
  PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  
<%@ page language="java" isErrorPage="true" contentType="text/html;charset=utf-8"%>
<html version="2.0">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Error</title>
</head>
<BODY id="error">
<H1>UIServer错误</H1>
<%
  String uri = (String)request.getAttribute("javax.servlet.error.request_uri");
%>
<H4>URI：<%=uri%></H4>
<H4>错误码：<%=request.getAttribute("javax.servlet.error.status_code")%></H4>
<H4>错误信息：</H4>
<div><%=request.getAttribute("javax.servlet.error.message")%></div>
<H4><a href="javascript:void(0);" onClick="javascript:document.getElementById('main').style.display=window.isShow?'none':'';var ele = event.target || event.srcElement;if(ele) ele.innerHTML = window.isShow?'显示错误详细':'隐藏错误详细';window.isShow = !window.isShow;">显示错误详细</a></H4>
<div id="main" style="display:none;">
<%
if (exception != null) {
%>
<pre>
<%
java.io.StringWriter sw = new java.io.StringWriter();   
java.io.PrintWriter pw = new java.io.PrintWriter(sw);   
exception.printStackTrace(pw);
new java.io.PrintWriter(out).print(sw.toString().replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
%>
</pre>
<%
} else if ((Exception) request.getAttribute("javax.servlet.error.exception") != null) {
%>
<pre>
<%
Exception e = (Exception) request.getAttribute("javax.servlet.error.exception");
java.io.StringWriter sw = new java.io.StringWriter();   
java.io.PrintWriter pw = new java.io.PrintWriter(sw);   
e.printStackTrace(pw);
new java.io.PrintWriter(out).print(sw.toString().replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
%>
</pre>
<%
}
%>
</div>

<%
  int i = uri.indexOf("/mobileUI/");
  if(i>0){
  String basejs = request.getContextPath() + "/base/mbase.js";
  String winreceiverjs = request.getContextPath() + "/mobileUI/system/components/mobile/windowReceiver/windowReceiver.js";
%>		
<script type="text/javascript" src="<%=basejs%>"></script>
<script type="text/javascript" src="<%=winreceiverjs%>"></script>
<H4><a href="javascript:void(0);" onClick="javascript:justep.mobile.windowReceiver.windowCancel();">关闭页面</a></H4>
<%
  }
%>

</body>
</html>