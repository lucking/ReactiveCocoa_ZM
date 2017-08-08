package com.justep.tools.ant.listener;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.tools.ant.BuildEvent;
import org.apache.tools.ant.BuildListener;
import org.apache.tools.ant.Task;

public class BuildLogListener implements BuildListener {

	public Boolean debug;
	private OutputStream stream;

	private void output(String msg) {
		byte[] b;
		try {
			b = msg.getBytes();
			stream.write(b);
			stream.write('\r');
			stream.write('\n');
			stream.flush();
		} catch (IOException e) {
			// 记录失败, 忽略
		}
	}

	private void debug(String msg) {
		if (debug) {
			output("debug: " + msg);
		}
	}

	private void info(String msg) {
		output(msg);
	}

	private void warn(String msg) {
		output("****WARN****: " + msg);
	}

	private void error(String msg, Throwable e) {
		output("****ERROR****: " + msg);

		if (e != null) {
			StringBuilder sb = new StringBuilder();
			StackTraceElement[] trace = e.getStackTrace();
			for (int i = 0; i < trace.length; i++)
				sb.append("\n\tat " + trace[i]);
			output("****ERROR**** 错误信息: " + e.getMessage());
			output("****ERROR**** 调用栈: " + sb.toString());
		}
	}

	public BuildLogListener(String logFileName) throws FileNotFoundException {
		debug = false;

		File logFile = new File(logFileName);
		logFile.getParentFile().mkdirs();
		stream = new FileOutputStream(logFile);
	}

	public void flush() throws IOException {
		stream.close();
	}

	public void buildStarted(BuildEvent event) {
		info("Build started.");
	}

	public void buildFinished(BuildEvent event) {
		if (event.getException() == null) {
			info("Build finished.");
		} else {
			error("Build finished with error.", event.getException());
		}
	}

	public void targetStarted(BuildEvent event) {
		info("Target \"" + event.getTarget().getName() + "\" started.");
	}

	public void targetFinished(BuildEvent event) {
		String targetName = event.getTarget().getName();
		if (event.getException() == null) {
			info("Target \"" + targetName + "\" finished.");
		} else {
			error("Target \"" + targetName + "\" finished with error.", null);
		}
	}

	public void taskStarted(BuildEvent event) {
		Task task = event.getTask();
		info("Task \"" + task.getTaskName() + "\" started.");
	}

	public void taskFinished(BuildEvent event) {
		Task task = event.getTask();
		if (event.getException() == null) {
			info("Task \"" + task.getTaskName() + "\" finished.");
		} else {
			error("Task \"" + task.getTaskName() + "\" finished with error.", null);
		}
	}

	public void messageLogged(BuildEvent event) {
		Object categoryObject = event.getTask();
		if (categoryObject == null) {
			categoryObject = event.getTarget();
			if (categoryObject == null) {
				categoryObject = event.getProject();
			}
		}
		switch (event.getPriority()) {
		case 0:
			error(event.getMessage(), null);
			break;
		case 1:
			warn(event.getMessage());
			break;
		case 2:
			info(event.getMessage());
			break;
		case 3:
			debug(event.getMessage());
			break;
		case 4:
			debug(event.getMessage());
			break;
		default:
			error(event.getMessage(), null);
		}
	}
}
