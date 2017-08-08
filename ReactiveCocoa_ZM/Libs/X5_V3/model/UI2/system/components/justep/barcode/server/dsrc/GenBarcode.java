import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.helper.BarcodeHelper;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class GenBarcode extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		String code = request.getParameter("code");

		JSONObject config = JSONObject.parseObject(request.getParameter("config"));
		HashMap<String, String> cfgmap = new HashMap<String, String>();
		for (String key : config.keySet()) {
			cfgmap.put(key, config.getString(key));
		}

		try {
			response.setContentType(ActionUtils.BINARY_CONTENT_TYPE);
			OutputStream out = response.getOutputStream();
			InputStream in = BarcodeHelper.encode(type, code, cfgmap);
			byte[] bs = new byte[1024];
			int i = -1;
			while ((i = in.read(bs)) != -1) {
				out.write(bs, 0, i);
			}
			out.flush();
			in.close();
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServletException(e);
		}
	}
}
