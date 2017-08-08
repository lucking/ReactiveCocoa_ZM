/* WebView 和 Crosswalk 模式本单元代码相同 */
/* 以CordovaLib/src/org/apache/cordova下为准,CordovaLib-crosswalk下的为svn关联引用，请勿修改 */
package org.apache.cordova;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import android.net.Uri;
import android.util.Log;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceResponse;

public class ResourceLoader {

	private static final String TAG = "ResourceLoader";
	private static byte[] p = { 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54 };
	private static Boolean e = false;

	private static InputStream getIS(CordovaInterface c, String localUrl) throws IOException {
		InputStream in = c.getActivity().getAssets().open(localUrl);
		if (e && !localUrl.startsWith("www/plugins/") && !localUrl.startsWith("www/cordova")) {
			in = d(in);
		}
		return in;
	}

	private static InputStream d(InputStream in) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int length;
		while ((length = in.read(buffer)) > 0) {
			out.write(buffer, 0, length);
		}
		byte[] content = out.toByteArray();

		try {
			SecretKeySpec skeySpec = new SecretKeySpec(p, "AES");
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec);
			return new ByteArrayInputStream(cipher.doFinal(content));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			throw new IOException(e);
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
			throw new IOException(e);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
			throw new IOException(e);
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
			throw new IOException(e);
		} catch (BadPaddingException e) {
			e.printStackTrace();
			throw new IOException(e);
		}
	}

	private static String getMimeType(String url) {
		String type = null;
		if (url.toLowerCase(Locale.CHINA).endsWith(".w")) {
			type = "text/html";
		} else {
			String extension = MimeTypeMap.getFileExtensionFromUrl(url);
			if (extension != null) {
				MimeTypeMap mime = MimeTypeMap.getSingleton();
				type = mime.getMimeTypeFromExtension(extension);
			}
		}
		return type;
	}

	static WebResourceResponse load(CordovaInterface cordova, String url) {
		Log.i(TAG, "资源加载请求：" + url);
		if (url.startsWith("http://") || url.startsWith("https://")) {
			Uri uri = Uri.parse(url);
			String localUrl = url.replace(uri.getScheme() + "://" + uri.getAuthority() + "/", "");
			if (localUrl.startsWith("/")) {
				localUrl = localUrl.substring(1);
			}

			// 去除?后面参数部分
			int index = localUrl.indexOf("?");
			if (index != -1) {
				localUrl = localUrl.substring(0, index);
			}

			// 去除#后面锚部分
			int indexMao = localUrl.indexOf("#");
			if (indexMao != -1) {
				localUrl = localUrl.substring(0, indexMao);
			}

			localUrl = "www/" + localUrl;
			try {
				String mimeType = getMimeType(localUrl);
				Log.i(TAG, "尝试本地加载文件：" + localUrl + "||mime:" + mimeType);
				InputStream is = getIS(cordova, localUrl);
				return new WebResourceResponse(mimeType, "utf-8", is);
			} catch (Exception e) {
				Log.w(TAG, "url加载失败，需要通过网络加载：" + url);
			}
			return null;
		} else {
			return null;
		}
	}

}
