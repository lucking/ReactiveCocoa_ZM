<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window oa" class="window oa" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:201px;top:457px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="fileData"
      idColumn="filePath" autoNew="false" autoLoad="true"> 
      <column label="col0" name="filePath" type="String" xid="default1"/>  
      <column label="col1" name="fileName" type="String" xid="default2"/>  
      <column label="col2" name="createTime" type="String" xid="default3"/>  
      <data xid="default5">[]</data>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
    active="0" xid="contents1"> 
    <div class="x-contents-content" xid="main"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel1"> 
        <div class="x-panel-top" xid="top1"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar1" title="摄像头拍照/录像"> 
            <div class="x-titlebar-left" xid="div1"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="" xid="backBtn" icon="icon-chevron-left" onClick="backBtnClick"> 
                <i xid="i2" class="icon-chevron-left"/>  
                <span xid="span1"/> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div2">摄像头拍照/录像</div>  
            <div class="x-titlebar-right reverse" xid="div3"/> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="content3"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="title" xid="controlGroup1" style="height:459px;"> 
            <div xid="div5"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="拍照" xid="cameraBtn" onClick="cameraBtnClick" disabled="true"> 
                <i xid="i1"/>  
                <span xid="span2">拍照</span> 
              </a> 
            </div>  
            <div xid="div7"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="录像" xid="captureBtn" onClick="captureBtnClick" disabled="true"> 
                <i xid="i5"/>  
                <span xid="span4">录像</span> 
              </a> 
            </div>  
            <div xid="div9" style="height:33px;" class="list-row"/>  
            <div component="$UI/system/components/justep/row/row" class="x-row list-row"
              xid="emptyRow" style="height:48px;" bind-visible="$model.fileData.getCount() == 0"> 
              <div class="x-col x-col-center" xid="col1"> 
                <label xid="label3" style="color:#C0C0C0;"><![CDATA[无历史记录]]></label> 
              </div> 
            </div>  
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="fileList" data="fileData" bind-click="fileListClick"> 
              <ul class="x-list-template" xid="listTemplateUl1" style="padding:0px 0px 0px 0px;"> 
                <li xid="li1" class="x-flex list-row"> 
                  <!--                  <div xid="col33" style="width:100%;"> 
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row11" style="width:100%;padding-left:10px;"></div>  
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row12"></div> 
                  </div>  
                  <div xid="div4" style="width:20%;text-align:center;padding-top:20px;"></div>   -->  
                  <div component="$UI/system/components/justep/row/row" class="x-row"
                    xid="row2"> 
                    <div class="x-col" xid="col4"> 
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row" xid="row3"> 
                        <div class="x-col" xid="col7"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output title-data" xid="output9" bind-ref="ref('fileName')"/> 
                        </div> 
                      </div>  
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row" xid="row4"> 
                        <div class="x-col" xid="col10"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output content-data" xid="output10" bind-ref="ref('createTime')"/> 
                        </div> 
                      </div> 
                    </div>  
                    <div class="x-col x-col-fixed x-col-center" xid="col6"
                      style="width:40px;"> 
                      <i xid="i3" class="icon-social-youtube-outline" style="font-size:25px;color:#C0C0C0;font-weight:100;"/> 
                    </div> 
                  </div> 
                </li> 
              </ul> 
            </div>  
            <div xid="div10" style="height:23px;"/>  
            <div xid="div6"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-gray device-button-black"
                label="清空历史记录" xid="deleteBtn" onClick="deleteBtnClick"> 
                <i xid="i4"/>  
                <span xid="span3">清空历史记录</span> 
              </a> 
            </div> 
          </div> 
        </div>  
        <div class="x-panel-bottom device-bottom" xid="bottom1" height="100px"> 
          <div xid="content" style="padding:10px 10px 10px 10px;"> 
            <div id="titleDiv" xid="titleDiv">
              <label xid="operateLabel" id="operateLabel"><![CDATA[]]></label>
            </div>  
            <div id="fileDiv" xid="fileDiv">
              <label xid="resultLabel" id="resultLabel"><![CDATA[]]></label>
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
