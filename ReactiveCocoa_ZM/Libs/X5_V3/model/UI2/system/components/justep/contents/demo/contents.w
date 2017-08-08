<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar3" title="contents"> 
        <div class="x-titlebar-left" xid="div7"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button8" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i5" class="icon-chevron-left"/>  
            <span xid="span6"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div8">contents</div>  
        <div class="x-titlebar-right reverse" xid="div9"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="nextBtn" label="next" onClick="nextBtnClick"> 
            <i/>  
            <span>next</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="prevBtn" label="prev" onClick="prevBtnClick"> 
            <i/>  
            <span>prev</span> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" xid="pages"
        class="x-contents x-full" active="0" slidable="true" onActiveChange="pagesSlide"
        wrap="true" swipe="true"> 
        <div class="x-contents-content" xid="content-1" onActive="contentsActive"> 
          <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">contents</h3>  
            
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" xid="jsSource" onClick="showJsSource"> 
            <i xid="jsSou"/>  
            <span>js</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="source" onClick="showContentsSource" bind-visible="isVisible"> 
            <i xid="sou" />  
            <span>源码</span> 
          </a><br/>  
          <p>1、容器组件，多个contents之间可任意切换</p>  
          <p>2、可以将同一类数据放到一个contents中</p>  
          <p>3、左右滑动可切换页面</p>  
          <p> 
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              name="checkbox" value="1" label="是否使用滑动动画" onChange="checkboxChanged"
              xid="slideControl" checked="true"/>  
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              name="checkbox" value="1" label="是否循环" xid="wrapControl" onChange="wrapControlChanged"
              checked="true"/> 
          </p>  
          <div style="text-align:center;"> 
            <h1><![CDATA[page 1]]> </h1>  
            <a component="$UI/system/components/justep/button/button" xid="button2"
              onClick="goNextPage" class="btn btn-default btn-lg" label="go"> 
              <i/>  
              <span>go</span> 
            </a> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="content-2" onInactive="contentsUnActive"> 
          <div style="text-align:center"> 
            <h1><![CDATA[page 2]]></h1>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="back" xid="button3" onClick="backPrePage"> 
              <i/>  
              <span>back</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="next" xid="button4" onClick="nextPage"> 
              <i/>  
              <span>next</span> 
            </a> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="content-3"> 
          <div style="text-align:center"> 
            <h1 xid="h31"><![CDATA[page 3]]></h1>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg "
              label="back" xid="button1" onClick="backPage"> 
              <i/>  
              <span>back</span> 
            </a> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified"
        tabbed="true" xid="buttonGroup2"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="page1" xid="button9" target="content-1"> 
          <i xid="i6"/>  
          <span xid="span7">page1</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="page2" xid="button10" target="content-2"> 
          <i xid="i7"/>  
          <span xid="span8">page2</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="page3" xid="button11" target="content-3"> 
          <i xid="i8"/>  
          <span xid="span9">page3</span> 
        </a> 
      </div> 
    </div>  
    <div id="aler"/> 
  </div> 
</div>
