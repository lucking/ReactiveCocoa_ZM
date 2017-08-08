<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window oa" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:201px;top:457px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="fileData"
      idColumn="filePath" autoNew="false"> 
      <column label="col0" name="filePath" type="String" xid="default1"/>  
      <column label="col1" name="fileName" type="String" xid="default2"/>  
      <column label="col2" name="createTime" type="String" xid="default3"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
    active="0" xid="contents1"> 
    <div class="x-contents-content" xid="main"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel1"> 
        <div class="x-panel-top" xid="top1"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar1" title="二维码扫描"> 
            <div class="x-titlebar-left" xid="div1"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="" xid="backBtn" icon="icon-chevron-left" onClick="backBtnClick"> 
                <i xid="i2" class="icon-chevron-left"/>  
                <span xid="span1"/> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div2">二维码扫描</div>  
            <div class="x-titlebar-right reverse" xid="div3"/> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="content3"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="title" xid="controlGroup1"> 
            <div xid="iamgeDiv" style="text-align:center;"> 
              <img src="justep.png" alt="" id="image2" xid="image2" height="175px" style="width:175px;"/> 
            </div>  
            <div xid="div5"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="扫一扫" xid="scanBtn" onClick="scanBtnClick" disabled="true"> 
                <i xid="i1"/>  
                <span xid="span3">扫一扫</span> 
              </a> 
            </div>  
            <div xid="div7" style="height:35px;" class="list-row"/>  
            <div component="$UI/system/components/justep/row/row" class="x-row list-row"
              xid="emptyRow" style="height:48px;" bind-visible="$model.fileData.getCount() == 0"> 
              <div class="x-col x-col-center" xid="col1"> 
                <label xid="label3" style="color:#C0C0C0;">无历史记录</label> 
              </div> 
            </div>  
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="fileList" data="fileData" bind-click="fileListClick"> 
              <ul class="x-list-template" xid="listTemplateUl1"> 
                <li xid="li1" class="x-flex list-row"> 
<!--                   <div xid="col33" style="width:100%;padding-left:10px;"> 
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row11"> 
                      <div component="$UI/system/components/justep/output/output"
                        class=" x-output title-data" xid="output9" bind-ref="ref('createTime')"/>  
                      <div component="$UI/system/components/justep/output/output"
                        class="x-output x-flex1 title-data" xid="output1" bind-ref="ref('fileName')"/> 
                    </div>  
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row12"> 
                      <div component="$UI/system/components/justep/output/output"
                        class="x-flex1 x-output content-data" xid="output10" bind-ref="ref('filePath')"
                        style="padding-top:0px;"/> 
                    </div> 
                  </div>  
                  <div xid="div4" style="width:20%;text-align:center;padding-top:20px;"> 
                    <i xid="i3" class="icon-social-youtube-outline" style="font-size:25px;color:#C0C0C0;font-weight:100;"/> 
                  </div>   -->
                  <div component="$UI/system/components/justep/row/row" class="x-row"
                    xid="row2"> 
                    <div class="x-col" xid="col4"> 
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row" xid="row3"> 
                        <div class="x-col x-col-fixed" xid="col7" style="width:auto;"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output title-data" xid="output3" bind-ref="ref('filePath')"/>
                        </div> 
                      </div>  
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row" xid="row4"> 
                        <div xid="col10" class="x-col x-col-fixed" style="width:auto;"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output content-data" xid="output2" bind-ref="ref('createTime')"/>
                        </div> 
                      <div class="x-col" xid="col3"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output4" bind-ref="ref('fileName')"></div></div></div> 
                    </div>  
                    <div class="x-col x-col-fixed x-col-center" xid="col6"
                      style="width:40px;"> 
                      <i xid="i5" class="icon-social-youtube-outline" style="font-size:25px;color:#C0C0C0;font-weight:100;"/>
                    </div> 
                  </div>
                </li> 
              </ul> 
            </div>  
            <div xid="div8" style="height:25px;"/>  
            <div xid="div6"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-gray device-button-black"
                label="清空历史记录" xid="deleteBtn" onClick="deleteBtnClick"> 
                <i xid="i4"/>  
                <span xid="span4">清空历史记录</span> 
              </a> 
            </div> 
          </div> 
        </div>  
        <div class="x-panel-bottom device-bottom" xid="bottom1" height="100px"> 
          <div xid="content" style="padding:10px 10px 10px 10px;"> 
            <div component="$UI/system/components/justep/output/output" class="x-output" xid="titleOutput"></div>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="codeOutput"></div>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="fileOutput"></div></div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
