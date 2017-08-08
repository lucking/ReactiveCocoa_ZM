function addListenerToClass(className, listener, argsArray, action, doNotWrap) {
    if (!action) {
      action='click';
    }
    var elements = document.getElementsByClassName(className);
    // choose Event target as a scope (like inline scripts)
    if (!doNotWrap) {
      if (argsArray && !Array.isArray(argsArray)) {
        argsArray = [argsArray];
      }
      function callListener(e) {
        listener.apply(null, argsArray);
      }
    } else {
      callListener = listener;
    }
    for (var i = 0; i < elements.length; ++i) {
      var item = elements[i];  
      item.addEventListener(action, callListener, false);
    }
};

function backHome() {
	window.history.go(-1);
}
