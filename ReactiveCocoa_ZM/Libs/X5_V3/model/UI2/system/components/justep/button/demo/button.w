<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="button"> 
        <div class="x-titlebar-left" xid="div1" id="te"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button20" icon="icon-chevron-left" onClick="returnMainPage"> 
            <i xid="i11" class="icon-chevron-left"/>  
            <span xid="span11"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">button</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">button icon 
        </h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button6" onClick="showiconSource" bind-visible="isVisible"> 
          <i xid="i6"/>  
          <span xid="span8">源码</span> 
        </a> 
      <div xid="buttonicon"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="button11" icon="icon-loading-a"> 
          <i xid="i12" class="icon-loading-a"/>  
          <span xid="span12"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="button16" icon="icon-android-camera"> 
          <i xid="i17" class="icon-android-camera"/>  
          <span xid="span17"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn "
          label="hidden" xid="button17"> 
          <i xid="i18"/>  
          <span xid="span18">hidden</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
          label="arrow-left" xid="button12" icon="icon-ios7-arrow-left"> 
          <i xid="i13" class="icon-ios7-arrow-left"/>  
          <span xid="span13">arrow-left</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-right"
          label="arrow-right" xid="button13" icon="icon-ios7-arrow-right"> 
          <i xid="i14" class="icon-ios7-arrow-right"/>  
          <span xid="span14">arrow-right</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="arrow-up" xid="button14" icon="icon-ios7-arrow-up"> 
          <i xid="i15" class="icon-ios7-arrow-up"/>  
          <span xid="span15">arrow-up</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-bottom"
          label="arrow-down" xid="button15" icon="icon-ios7-arrow-down"> 
          <i xid="i16" class="icon-ios7-arrow-down"/>  
          <span xid="span16">arrow-down</span> 
        </a> 
      </div>  
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">button color</h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button8" onClick="showStyleSource" bind-visible="isVisible"> 
          <i xid="i8"/>  
          <span xid="span29">源码</span> 
        </a> 
      <div xid="buttonColor"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="default" xid="button22" onClick="basicEvent"> 
          <i xid="i23"/>  
          <span xid="span23">default</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" xid="button24"
          class="btn btn-primary" label="primary"> 
          <i xid="i25"/>  
          <span xid="span25">primary</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" xid="button35"
          class="btn btn-success" label="success"> 
          <i xid="i36"/>  
          <span xid="span36">success</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-black"
          label="disabled" xid="button4" disabled="true"> 
          <i xid="i4"/>  
          <span xid="span4">disabled</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" label="info"
          xid="button19" class="btn btn-info"> 
          <i xid="i20"/>  
          <span xid="span20">info</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-warning"
          label="warning" xid="button7"> 
          <i xid="i7"/>  
          <span xid="span7">warning</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-danger"
          label="danger" xid="button9"> 
          <i xid="i9"/>  
          <span xid="span9">danger</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="link" xid="button10"> 
          <i xid="i10"/>  
          <span xid="span10">link</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-yellow "
          xid="button18" label="yellow"> 
          <i xid="i19"/>  
          <span xid="span19">yellow</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-black"
          label="black" xid="button21"> 
          <i xid="i21"/>  
          <span xid="span21">black</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-orange"
          label="orange" xid="button34"> 
          <i xid="i34"/>  
          <span xid="span34">orange</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-green"
          label="green" xid="button39"> 
          <i xid="i35"/>  
          <span xid="span35">green</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn x-purple"
          label="purple" xid="button44"> 
          <i xid="i40"/>  
          <span xid="span40">purple</span> 
        </a> 
      </div>  
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">button size </h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button27" onClick="showSizeSource" bind-visible="isVisible"> 
          <i xid="i47"/>  
          <span xid="span46">源码</span> 
        </a> 
      <div xid="buttonSize"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-xs"
          label="btn-xs" xid="button37"> 
          <i xid="i38"/>  
          <span xid="span38">btn-xs</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" label="btn-sm"
          xid="button38" class="btn btn-default btn-sm"> 
          <i xid="i39"/>  
          <span xid="span39">btn-sm</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="default" xid="button36"> 
          <i xid="i37"/>  
          <span xid="span37">default</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-lg"
          label="btn-lg" xid="button40"> 
          <i xid="i41"/>  
          <span xid="span41">btn-lg</span> 
        </a> 
      </div>  
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">button event </h3>
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button49" onClick="showJsSource"> 
          <i xid="i49"/>  
          <span xid="span48">js</span> 
        </a> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button48" onClick="showEventSource" bind-visible="isVisible"> 
          <i xid="i48" />  
          <span xid="span47">源码</span> 
        </a><div xid="buttonEvent"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="看我变化" xid="defaultButton" onClick="buttonChange"> 
          <i xid="i27"/>  
          <span xid="span27">看我变化</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-right"
          label="添加按钮" xid="button29" icon="icon-android-send" onClick="dynamicAddButton"> 
          <i xid="i30" class="icon-android-send"/>  
          <span xid="span30">添加按钮</span> 
        </a>  
        <div xid="parent"/> 
      </div>  
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">buttonGroup </h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button46" onClick="showButtonGroupSource" bind-visible="isVisible"> 
          <i xid="i46"/>  
          <span xid="span45">源码</span> 
        </a> 
      <div xid="showButtonGroup"> 
        <p>buttonGroup的css：</p>  
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group"
          tabbed="true" xid="buttonGroupVerShow"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="setVertical" xid="button30" onClick="setVertical"> 
            <i xid="i31"/>  
            <span xid="span31">setVertical</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="setJustified" xid="button31" onClick="setJustified"> 
            <i xid="i32"/>  
            <span xid="span32">setJustified</span> 
          </a> 
        </div>  
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group"
          xid="buttonGroupSizeShow"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="setlg" title="buttonGroup btn-group-lg" xid="button23" onClick="setlg"> 
            <i xid="i22"/>  
            <span xid="span22">setlg</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="setsm" xid="button25" title="buttonGroup btn-group-sm" onClick="setsm"> 
            <i xid="i24"/>  
            <span xid="span24">setsm</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="setxs" xid="button28" onClick="setxs"> 
            <i xid="i26"/>  
            <span xid="span26">setxs</span> 
          </a> 
        </div>  
        <p>buttonGroup的单选：</p>  
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group"
          tabbed="true" xid="buttonGroup1" onSelect="showBtgVal"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="1" xid="button1"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="2" xid="button2"> 
            <i xid="i2"/>  
            <span xid="span2"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="3" xid="button3"> 
            <i xid="i3"/>  
            <span xid="span3"/> 
          </a> 
        </div> 
</div> 
    </div> 
  </div>  
  <div id="aler"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
