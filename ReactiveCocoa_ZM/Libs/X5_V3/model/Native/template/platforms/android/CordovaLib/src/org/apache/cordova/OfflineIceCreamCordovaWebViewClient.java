package org.apache.cordova;

import android.annotation.SuppressLint;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

@SuppressLint("NewApi")
public class OfflineIceCreamCordovaWebViewClient extends
		IceCreamCordovaWebViewClient {

	static final String TAG = "OfflineIceCreamCordovaWebViewClient";

	public OfflineIceCreamCordovaWebViewClient(CordovaInterface cordova) {
		super(cordova);
	}

	public OfflineIceCreamCordovaWebViewClient(CordovaInterface cordova,
			CordovaWebView view) {
		super(cordova, view);
	}

	@Override
	public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
		WebResourceResponse result = ResourceLoader.load(this.cordova, url);
		if (result == null) {
			return super.shouldInterceptRequest(view, url);
		} else {
			return result;
		}
	}

}
