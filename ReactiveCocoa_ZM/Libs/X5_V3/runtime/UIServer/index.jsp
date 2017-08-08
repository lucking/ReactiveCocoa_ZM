<%
	java.lang.String url = request.getContextPath() + "/UI2/portal/login.w";
	java.util.Map parameterMap = request.getParameterMap();
	java.util.Set keySet = parameterMap.keySet();
	java.util.Iterator itr = keySet.iterator();
	java.lang.Boolean isFirst = true;
	while(itr.hasNext()){
		if (isFirst){
			url += "?";
		}else{
			url += "&";
		}
		java.lang.String key = (String) itr.next();
		url += key + "=" + request.getParameter(key);
	}
	response.sendRedirect(url);
%>