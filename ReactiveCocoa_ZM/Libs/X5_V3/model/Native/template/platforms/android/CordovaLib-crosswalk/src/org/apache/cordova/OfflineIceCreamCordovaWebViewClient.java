package org.apache.cordova;

import org.xwalk.core.XWalkView;

import android.annotation.SuppressLint;
import android.webkit.WebResourceResponse;

@SuppressLint("NewApi")
public class OfflineIceCreamCordovaWebViewClient extends IceCreamCordovaWebViewClient {

	static final String TAG = "OfflineIceCreamCordovaWebViewClient";

	public OfflineIceCreamCordovaWebViewClient(CordovaInterface cordova) {
		super(cordova);
	}

	public OfflineIceCreamCordovaWebViewClient(CordovaInterface cordova, CordovaWebView view) {
		super(cordova, view);
	}

	@Override
	public WebResourceResponse shouldInterceptLoadRequest(XWalkView view, String url) {
		WebResourceResponse result = ResourceLoader.load(this.cordova, url);
		if (result == null) {
			return super.shouldInterceptLoadRequest(view, url);
		} else {
			return result;
		}
	}

}
