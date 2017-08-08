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
import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.util.BizClientUtils;
import com.justep.deploy.AppHelper;
import com.justep.deploy.AppInfo;
import com.justep.tools.ant.listener.BuildLogListener;
import com.justep.ui.JavaServer;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

public class Compile extends com.justep.ui.impl.JProcessorImpl {

	private void execTask(File buildFile, AppInfo appInfo, String logFileName) throws IOException {
		Project p = new Project();
		Log4jListener consoleLogger = new Log4jListener();
		BuildLogListener buidLogger = new BuildLogListener(logFileName);
		p.addBuildListener(consoleLogger);
		p.addBuildListener(buidLogger);
		try {
			p.fireBuildStarted();
			p.init();
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(p, buildFile);
			p.executeTarget("compileUI");
			p.fireBuildFinished(null);
		} catch (BuildException e) {
			p.fireBuildFinished(e);
			throw e;
		} finally {
			buidLogger.flush();
		}
	}

	private void compile(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, IllegalAccessException {
		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String justepHome = JustepConfig.getHome();
		String antLibDir = modelPath + UI + "/system/deploy/common/antlib";
		String nativeDir = modelPath + "Native";
		String tmplDir = modelPath + UI + "/system/deploy/app/tmpl";
		JSONObject config = JSONObject.parseObject(JavaServer.getPostData(request));

		AppInfo appInfo = new AppInfo(config);
		String logFileName = nativeDir + "/" + appInfo.appName + "/log/build.log";

		// 创建ant脚本
		File buildFile = AppHelper.createBuildXML(justepHome, antLibDir, nativeDir, tmplDir, appInfo, "");

		// 执行ant脚本
		execTask(buildFile, appInfo, logFileName);
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result;
		try {
			compile(request, response);

			result = BizClientUtils.generateResult(true, "", "编译UI资源成功!", "", "", "", "", ActionUtils.JSON_CONTENT_TYPE);
		} catch (BuildException be) {
			// 对于执行ant失败返回成功标记，但code值为ERROR，和正常执行成功一样通过build.log查看具体错误日志
			result = BizClientUtils.generateResult(true, "ERROR", "编译UI资源失败!", be.getMessage(), AppHelper.getStackTrace(be), "", "", ActionUtils.JSON_CONTENT_TYPE);
		} catch (Exception e) {
			result = BizClientUtils.generateResult(false, null, "编译UI资源失败!", e.getMessage(), AppHelper.getStackTrace(e), "", "", ActionUtils.JSON_CONTENT_TYPE);
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
