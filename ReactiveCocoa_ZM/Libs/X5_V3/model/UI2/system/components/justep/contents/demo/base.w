<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root" class="root">  
  <resource xid="default1"> 
    <style type="text/css"/> 
  </resource>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="container1"> 
    <div class="x-panel-top"> 
      <div class="row"> 
        <div class="col-20"> 
          <h1>Slide Container 演示</h1> 
        </div>  
        <div class="col-80"> 
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
            name="checkbox" value="1" label="是否使用滑动动画" onChange="checkbox1Changed"
            xid="slideControl"/>  
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
            name="checkbox" value="1" label="是否循环" xid="wrapControl" onChange="wrapControlChanged"/>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-sm"
            xid="prevBtn" label="prev" onClick="prevBtnClick">
            <i/>
            <span>prev</span>
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-sm"
            xid="nextBtn" label="next" onClick="nextBtnClick">
            <i/>
            <span>next</span>
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" xid="pages"
        class="x-contents x-full" active="0" slidable="true" onActiveChange="pagesSlide" wrap="true" swipe="true"> 
        <div class="x-contents-content" xid="content-1" onActive="panel1Active"> 
          <h1 xid="h31"><![CDATA[page 1]]></h1>  
          <div class="tool"> 
            <a component="$UI/system/components/justep/button/button" xid="button2"
              onClick="button2Click" class="btn btn-default btn-lg" label="go"> 
              <i/>
              <span>go</span> 
            </a> 
          </div>  
          <div component="$UI/system/components/justep/model/model" xid="model1"
            onLoad="model1Load"/>  
          <input class="form-control" value="http://192.168.1.42:8080/x5/$v197bd5f2bc374e7ea45464ef30654345/UI2/system/components/justep/titleBar/demo/base.w?language=zh_CN&amp;$skin=&amp;process=/SA/OPM/system/systemProcess&amp;activity=mainActivity&amp;bsessionid=D5A31C1994858258B661CCB70828264B"/>  
        </div>  
        <div class="x-contents-content" xid="content-2" onInactive="panel2UnActive"> 
          <h1 xid="h31"><![CDATA[page 2]]></h1>  
          <div class="tool"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="back" xid="button3" onClick="button3Click">
              <i/>
              <span>back</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="next" xid="button4" onClick="button4Click">
              <i/>
              <span>next</span>
            </a> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="content-3"> 
          <h1 xid="h31"><![CDATA[page 3]]></h1>  
          <div class="tool"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="back" xid="button1" onClick="button1Click">
              <i/>
              <span>back</span>
            </a> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <span id="console"/> 
    </div> 
  </div> 
</div>
