<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window oa" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:199px;top:415px;"
    onLoad="modelLoad" onunLoad="modelUnLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="fileData"
      idColumn="fileName" autoNew="false"> 
      <column label="col0" name="filePath" type="String" xid="default5"/>  
      <column label="col1" name="fileName" type="String" xid="default6"/>  
      <column label="col2" name="createTime" type="String" xid="default7"/>  
      <column label="col3" name="title" type="String" xid="default8"/>  
      <column label="col4" name="timeLen" type="String" xid="default9"/> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver" onReceive="windowReceiverReceive"></span><div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
    active="0" xid="contents1"> 
    <div class="x-contents-content" xid="main"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel1"> 
        <div class="x-panel-top" xid="top1"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar1" title="音频录制/播放"> 
            <div class="x-titlebar-left" xid="div1"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="" xid="backBtn" icon="icon-chevron-left" onClick="backBtnClick"> 
                <i xid="i2" class="icon-chevron-left"/>  
                <span xid="span1"/> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div2">音频录制/播放</div>  
            <div class="x-titlebar-right reverse" xid="div3"/> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="content3"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="title" xid="controlGroup1" style="height:459px;"> 
            <div xid="div7"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="开始录音" xid="audioBtn" onClick="audioBtnClick" disabled="true"> 
                <i xid="i4"/>  
                <span xid="span3">开始录音</span> 
              </a> 
            </div>  
            <div xid="div8"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="播放音乐" xid="playBtn" onClick="playBtnClick" disabled="true"> 
                <i xid="i5"/>  
                <span xid="span4">播放音乐</span> 
              </a> 
            </div>  
            <div xid="div9" style="height:33px;" class="list-row"/>  
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
                  <!--                   <div xid="col33" style="width:100%;"> 
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row11" style="width:100%;padding-left:10px;"> 
                      <div component="$UI/system/components/justep/output/output"
                        class="x-flex1 x-output title-data" xid="output9" bind-ref="ref('fileName')"/> 
                    </div>  
                    <div _component="$UI/system/components/justep/row/row"
                      class="x-flex" xid="row12"> 
                      <div component="$UI/system/components/justep/output/output"
                        class="x-flex1 x-output content-data" xid="output10" bind-ref="ref('createTime')"
                        style="padding-left:10px;"/> 
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
                        <div class="x-col" xid="col7"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output title-data" xid="output2" bind-ref="ref('fileName')"/> 
                        </div> 
                      </div>  
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row" xid="row4"> 
                        <div class="x-col" xid="col10"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-flex1 x-output content-data" xid="output1" bind-ref="ref('createTime')"/> 
                        </div> 
                      </div> 
                    </div>  
                    <div class="x-col x-col-fixed x-col-center" xid="col6"
                      style="width:40px;"> 
                      <i xid="i6" class="icon-social-youtube-outline" style="font-size:25px;color:#C0C0C0;font-weight:100;"/> 
                    </div> 
                  </div> 
                </li> 
              </ul> 
            </div>  
            <div xid="div11" style="height:23px;"/>  
            <div xid="div12"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-gray device-button-black"
                label="清空历史记录" xid="deleteBtn" onClick="deleteBtnClick"> 
                <i xid="i7"/>  
                <span xid="span5">清空历史记录</span> 
              </a> 
            </div> 
          </div> 
        </div>  
        <div class="x-panel-bottom device-bottom" xid="bottom1" height="100px"> 
          <div xid="content" style="padding:10px 10px 10px 10px;"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="titleOutput"/>  
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="fileOutput"/>
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="recordCover" opacity="0.8" position="center" direction="center" dismissible="false"> 
    <div class="x-popOver-overlay" xid="div5" style="background-color:black;"/>  
    <div class="x-popOver-content" xid="div6" style="width:200px;"> 
      <div id="loaddiv" xid="loaddiv" style="text-align:center;height:60px;"> 
        <img alt="" xid="image1" height="60px" src="record.gif"/> 
      </div>  
      <div style="text-align:center; height:70px;"> 
            <div component="$UI/system/components/justep/output/output" class="x-output" style="padding-top:20px;padding-bottom:20px;font-size:24px;color:#FF0000;"
              xid="recordTime"/>
      </div>  
      <div xid="div10" style="text-align:center;padding-bottom:180px;"> 
        <img src="stop.png" alt="" id="pauseImage" xid="pauseImage" width="75px"
          bind-click="pauseImageClick"/> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="playCover" opacity="0.8" position="center" direction="center" dismissible="false"> 
    <div class="x-popOver-overlay" xid="div51" style="background-color:black;"/>  
    <div class="x-popOver-content" xid="div61" style="width:200px;"> 
      <!--       <div id="loaddiv" xid="loaddiv1" style="text-align:center;height:60px;"> 
        <img alt="" xid="image11" height="60px" src="record.gif"/> 
      </div>   -->  
      <div style="text-align:center; height:70px;"> 
            <div component="$UI/system/components/justep/output/output" class="x-output" style="padding-top:20px;padding-bottom:20px;font-size:24px;color:#FF0000;"
              xid="playTime"/>
      </div>  
      <div xid="div101" style="text-align:center;padding-bottom:180px;"> 
        <img src="stop.png" alt="" xid="pauseImage1" width="75px" bind-click="pauseImageClick"/> 
      </div> 
    </div> 
  </div> 
</div>
