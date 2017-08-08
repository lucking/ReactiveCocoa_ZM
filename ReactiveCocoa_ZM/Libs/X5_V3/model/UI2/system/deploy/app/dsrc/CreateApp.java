import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.listener.Log4jListener;

import com.alibaba.fastjson.JSONObject;
import com.justep.ui.JavaServer;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.util.BizClientUtils;
import com.justep.deploy.AppHelper;
import com.justep.deploy.AppInfo;

public class CreateApp extends com.justep.ui.impl.JProcessorImpl {

	private void execTask(File buildFile, Boolean edit) throws IOException {
		Project p = new Project();
		Log4jListener consoleLogger = new Log4jListener();
		p.addBuildListener(consoleLogger);
		try {
			p.fireBuildStarted();
			p.init();
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(p, buildFile);
			if (edit) {
				p.executeTarget("editApp");
			} else {
				p.executeTarget("createApp");
			}
			p.fireBuildFinished(null);
		} catch (BuildException e) {
			p.fireBuildFinished(e);
			throw e;
		}
	}

	private void createNativeProject(HttpServletRequest request, HttpServletResponse response) throws IllegalAccessException, IOException {
		Boolean edit = "true".equals(request.getParameter("edit"));
		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String justepHome = JustepConfig.getHome();
		String antLibDir = modelPath + UI + "/system/deploy/common/antlib";
		String nativeDir = modelPath + "Native";
		String tmplDir = modelPath + UI + "/system/deploy/app/tmpl";
		JSONObject config = JSONObject.parseObject(JavaServer.getPostData(request));

		AppInfo appInfo = new AppInfo(config);

		// 创建ant脚本
		File buildFile = AppHelper.createBuildXML(justepHome, antLibDir, nativeDir, tmplDir, appInfo, "");

		// 执行ant脚本
		execTask(buildFile, edit);
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result;
		try {
			createNativeProject(request, response);

			result = BizClientUtils.generateResult(true, "", "创建app成功!", "", "", "", "", ActionUtils.JSON_CONTENT_TYPE);
		} catch (Exception ex) {
			result = BizClientUtils.generateResult(false, null, "创建app失败!", ex.getMessage(), AppHelper.getStackTrace(ex), "", "", ActionUtils.JSON_CONTENT_TYPE);
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
