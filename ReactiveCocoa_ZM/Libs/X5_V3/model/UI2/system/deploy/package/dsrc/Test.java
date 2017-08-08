import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.deploy.AppHelper;

public class Test extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String appBuilderServer = request.getParameter("appBuilderServer");
		try {
			AppHelper.getHttp(appBuilderServer + "/app/test", false);
		} catch (Exception e) {
			throw new ServletException(e);
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain");
		OutputStream output = response.getOutputStream();
		output.write("hello x5".getBytes());
		output.flush();
		output.close();
	}
}
